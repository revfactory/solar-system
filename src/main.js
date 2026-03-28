import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { createRenderer } from './core/Renderer.js';
import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { SimulationClock } from './core/SimulationClock.js';
import { getAllPlanetPositions, AU_SCALE } from './orbital/OrbitalEngine.js';
import { initSolarSystem, updateSolarSystem } from './celestial/index.js';

// UI 모듈
import { CameraController } from './controls/CameraController.js';
import { TimeController } from './controls/TimeController.js';
import { LoadingScreen } from './ui/LoadingScreen.js';
import { Navigation } from './ui/Navigation.js';
import { InfoPanel } from './ui/InfoPanel.js';
import { Timeline } from './ui/Timeline.js';

// --- 초기화 ---
const canvas = document.getElementById('canvas');
const renderer = createRenderer(canvas);
const scene = createScene();
const { camera, controls } = createCamera(renderer);
const clock = new SimulationClock();

// 시간 배속 기본값: 1일/초
clock.setSpeed(86400);

// --- 천체 초기화 ---
const solarSystem = initSolarSystem(scene, {
  baseRadius: 0.5,
  exaggeration: 1.0,
  sunRadius: 2.0,
  initialDate: clock.simulationTime,
});

// --- UI 초기화 ---
const loadingScreen = new LoadingScreen();
const cameraController = new CameraController(camera, controls);
const timeController = new TimeController();
timeController.attachClock(clock);

// 행성 데이터 로드 + UI 초기화
let navigation = null;
let infoPanel = null;
let timeline = null;

async function initUI() {
  let planetsData = {};
  let planetsUI = {};

  try {
    const [dataRes, uiRes] = await Promise.all([
      fetch('/data/planets.json'),
      fetch('/data/planets-ui.json'),
    ]);
    planetsData = await dataRes.json();
    planetsUI = await uiRes.json();
  } catch (e) {
    console.warn('행성 데이터 로드 실패:', e);
  }

  // 정보 패널
  infoPanel = new InfoPanel(planetsData, planetsUI);

  // 네비게이션
  navigation = new Navigation(planetsData, (planetId) => {
    selectPlanet(planetId);
  });

  // 타임라인
  timeline = new Timeline({
    onSetSpeed: (scale) => {
      timeController.setSpeed(scale);
    },
    onTogglePause: () => {
      timeController.togglePause();
    },
  });

  // 초기 속도 표시
  timeline.updateSpeed(clock.timeScale);

  // 시간 변경 시 타임라인 동기화
  timeController.onChange(() => {
    timeline.updateSpeed(timeController.paused ? 0 : timeController.timeScale);
  });
}

// --- 행성 선택 ---
function selectPlanet(planetId) {
  const body = planetId === 'sun'
    ? solarSystem.sun
    : solarSystem.planets[planetId];
  if (!body) return;

  // 카메라 이동 + 행성 추적
  const worldPos = body.getWorldPosition();
  const viewRadius = body.mesh?.geometry?.parameters?.radius || 1;
  cameraController.flyTo(worldPos, viewRadius, 2000, body);

  // UI 업데이트
  if (navigation) navigation.setActive(planetId);
  if (infoPanel) infoPanel.show(planetId);
}

// --- Raycaster (행성 클릭) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(solarSystem.raycastTargets);
  if (intersects.length > 0) {
    const hit = intersects[0].object;
    const planetId = hit.userData?.planetId;
    if (planetId) {
      selectPlanet(planetId);
    }
  }
});

// 호버 커서 변경
canvas.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(solarSystem.raycastTargets);
  canvas.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
});

// --- 글로벌 접근용 내보내기 ---
export { renderer, scene, camera, controls, clock, solarSystem };

// --- 로딩 완료 ---
loadingScreen.hide();

// --- 애니메이션 루프 ---
let lastTime = performance.now();

function animate(time) {
  requestAnimationFrame(animate);

  const now = performance.now();
  const realDelta = (now - lastTime) / 1000;
  lastTime = now;

  // 시뮬레이션 시간 업데이트
  const simTime = clock.update();
  const deltaTime = clock.paused ? 0 : realDelta * clock.timeScale;

  // 천체 업데이트
  updateSolarSystem(solarSystem, simTime, deltaTime, camera);

  // 카메라 컨트롤러 (Tween + OrbitControls)
  cameraController.update();

  // 타임라인 날짜 표시 갱신
  if (timeline) {
    timeline.updateDate(clock.simulationTime);
  }

  // 렌더링
  renderer.render(scene, camera);
}

// --- 시작 ---
initUI();
animate(0);
