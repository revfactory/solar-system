---
name: project-scaffold
description: "Three.js + Vite 프로젝트 스캐폴딩과 코어 모듈(Scene, Camera, Renderer, SimulationClock, OrbitalEngine) 구현 스킬. 태양계 시뮬레이션 프로젝트 초기화, Three.js 프로젝트 생성, 코어 모듈 작성 시 반드시 이 스킬을 사용할 것."
---

# Project Scaffold — Three.js + Vite 코어 구현

태양계 시뮬레이션 프로젝트의 기반을 구축한다.

## 1단계: 프로젝트 초기화

```bash
npm init -y
npm install three astronomy-engine @tweenjs/tween.js postprocessing
npm install -D vite vite-plugin-glsl
```

## 2단계: Vite 설정

```javascript
// vite.config.js
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [glsl()],
  build: { target: 'esnext' }
});
```

## 3단계: 코어 모듈 구현

### Renderer.js
- WebGLRenderer 생성 (antialias, alpha, logarithmicDepthBuffer)
- toneMapping: ACESFilmicToneMapping
- outputColorSpace: SRGBColorSpace
- 리사이즈 핸들러 (window resize → renderer.setSize + camera.aspect)

### Scene.js
- Scene 생성
- 배경 설정 (CubeTextureLoader → 스카이박스)
- AmbientLight (매우 약하게, 0x111111) — 야간면 최소 가시성
- PointLight (태양 위치)

### Camera.js
- PerspectiveCamera (FOV 60, near 0.001, far 10000)
  - far를 크게 잡되 logarithmicDepthBuffer로 z-fighting 방지
- OrbitControls 초기화 (enableDamping, dampingFactor: 0.05)
- minDistance / maxDistance 설정

### SimulationClock.js
- `_workspace/02_webgl_tech_research.md` 섹션 3.6의 패턴 구현
- simulationTime (Date), timeScale, paused
- update() → simulationTime을 timeScale만큼 진행
- setSpeed(scale), pause(), resume(), setDate(date), reverse()
- getT() → J2000.0 기준 줄리안 세기 반환 (궤도 계산용)

### OrbitalEngine.js
- `_workspace/02_orbital_mechanics_data.md`의 구현 가이드(섹션 8) 활용
- 방법 1 (추천): astronomy-engine 래퍼
  ```javascript
  import { Body, HelioVector } from 'astronomy-engine';
  function getPlanetPosition(bodyName, date) {
    const vec = HelioVector(Body[bodyName], date);
    return { x: vec.x, y: vec.y, z: vec.z }; // AU 단위
  }
  ```
- 방법 2 (폴백): 케플러 방정식 직접 구현 (섹션 8.2~8.4)
- AU_SCALE 상수 정의 — AU를 Three.js 단위로 변환하는 비율

## 4단계: 데이터 JSON 생성

`_workspace/02_orbital_mechanics_data.md`와 `_workspace/02_planet_visual_data.md`에서 추출:

### public/data/planets.json
```json
{
  "mercury": {
    "name": "수성", "nameEn": "Mercury",
    "orbital": { "a": 0.387, "e": 0.206, ... },
    "physical": { "radius_km": 2440.5, "mass_1e24_kg": 0.330, ... },
    "rotation": { "period_hours": 1407.6, "axial_tilt_deg": 0.034 },
    "visual": { "color": "#8C7E6E", "textures": { "diffuse": "textures/mercury/..." } },
    "atmosphere": null
  },
  ...
}
```

### public/data/constants.json
천문 상수, 단위 변환 계수 등

## 5단계: main.js (엔트리 포인트)

```javascript
import { createRenderer } from './core/Renderer.js';
import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { SimulationClock } from './core/SimulationClock.js';

const renderer = createRenderer(document.getElementById('canvas'));
const scene = createScene();
const { camera, controls } = createCamera(renderer);
const clock = new SimulationClock();

function animate() {
  requestAnimationFrame(animate);
  const simTime = clock.update();
  controls.update();
  // 행성 위치 업데이트 (celestial-engineer 모듈)
  // 셰이더 uniform 업데이트 (shader-engineer 모듈)
  TWEEN.update();
  renderer.render(scene, camera);
}
animate();
```

## 품질 기준
- `npm run dev`로 빈 씬이 정상 렌더링되어야 한다
- SimulationClock의 시간 조작(가속, 일시정지, 날짜 이동)이 정상 동작
- OrbitalEngine이 현재 날짜의 행성 위치를 올바르게 반환
- 브라우저 콘솔에 에러/경고 없음
