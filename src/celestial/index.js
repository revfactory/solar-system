/**
 * Celestial 모듈 - 태양계 천체 초기화 및 관리
 * OrbitalEngine(astronomy-engine)으로 행성 위치 계산
 * Atmosphere/Ring 셰이더 통합
 */
import * as THREE from 'three';
import Sun from './Sun.js';
import Planet from './Planet.js';
import Moon from './Moon.js';
import OrbitLine from './OrbitLine.js';
import AsteroidBelt from './AsteroidBelt.js';
import Label from './Label.js';
import { Atmosphere, ATMOSPHERE_PARAMS } from './Atmosphere.js';
import { Ring, SATURN_RING } from './Ring.js';
import { getAllPlanetPositions, AU_SCALE } from '../orbital/OrbitalEngine.js';

/** 케플러 궤도 요소 (J2000.0) — 궤도 라인 시각화용 */
const ORBITAL_ELEMENTS = {
  mercury:  { a: 0.38709927, e: 0.20563593, I: 7.00497902, L: 252.25032350, omega_bar: 77.45779628, Omega: 48.33076593 },
  venus:    { a: 0.72333566, e: 0.00677672, I: 3.39467605, L: 181.97909950, omega_bar: 131.60246718, Omega: 76.67984255 },
  earth:    { a: 1.00000261, e: 0.01671123, I: -0.00001531, L: 100.46457166, omega_bar: 102.93768193, Omega: 0.0 },
  mars:     { a: 1.52371034, e: 0.09339410, I: 1.84969142, L: -4.55343205, omega_bar: -23.94362959, Omega: 49.55953891 },
  jupiter:  { a: 5.20288700, e: 0.04838624, I: 1.30439695, L: 34.39644051, omega_bar: 14.72847983, Omega: 100.47390909 },
  saturn:   { a: 9.53667594, e: 0.05386179, I: 2.48599187, L: 49.95424423, omega_bar: 92.59887831, Omega: 113.66242448 },
  uranus:   { a: 19.18916464, e: 0.04725744, I: 0.77263783, L: 313.23810451, omega_bar: 170.95427630, Omega: 74.01692503 },
  neptune:  { a: 30.06992276, e: 0.00859048, I: 1.77004347, L: -55.12002969, omega_bar: 44.96476227, Omega: 131.78422574 },
};

/** 행성 궤도 라인 색상 */
const ORBIT_COLORS = {
  mercury: 0x8C7E6E,
  venus:   0xE8CDA0,
  earth:   0x2B65D9,
  mars:    0xC1440E,
  jupiter: 0xC88B3A,
  saturn:  0xE8D088,
  uranus:  0x73C2C6,
  neptune: 0x3B5FC0,
};

/** 대기가 있는 행성 */
const PLANETS_WITH_ATMOSPHERE = ['venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

/**
 * 태양계 초기화
 * @param {THREE.Scene} scene
 * @param {object} opts
 * @param {Date} [opts.initialDate] - 초기 시뮬레이션 날짜
 * @returns {object} 천체 참조 객체
 */
export function initSolarSystem(scene, opts = {}) {
  const baseRadius = opts.baseRadius || 0.5;
  const exaggeration = opts.exaggeration || 1.0;
  const sunRadius = opts.sunRadius || 2.0;
  const initialDate = opts.initialDate || new Date();

  const result = {
    sun: null,
    planets: {},
    moons: {},
    orbitLines: {},
    atmospheres: {},
    rings: {},
    asteroidBelt: null,
    labels: {},
    allBodies: [],         // update() 대상
    raycastTargets: [],    // raycasting 대상 mesh 배열
  };

  // --- 태양 ---
  const sun = new Sun({ radius: sunRadius, lightIntensity: 2.0 });
  scene.add(sun.orbitGroup);
  result.sun = sun;
  result.allBodies.push(sun);
  result.raycastTargets.push(sun.mesh);

  const sunLabel = new Label('태양', { yOffset: sunRadius + 0.5, maxVisibleDistance: 200 });
  sun.tiltGroup.add(sunLabel.sprite);
  result.labels.sun = sunLabel;

  // --- 초기 행성 위치 ---
  const initialPositions = getAllPlanetPositions(initialDate);

  // --- 행성 ---
  Planet.PLANET_IDS.forEach((id) => {
    const planet = new Planet(id, { baseRadius, exaggeration });
    scene.add(planet.orbitGroup);

    // OrbitalEngine으로 초기 위치 설정
    const pos = initialPositions[id];
    if (pos) {
      planet.setPosition(pos.x, pos.y, pos.z);
    }

    result.planets[id] = planet;
    result.allBodies.push(planet);
    result.raycastTargets.push(planet.mesh);

    // 라벨
    const label = new Label(planet.nameKo, {
      yOffset: planet.radius + 0.3,
      maxVisibleDistance: id === 'jupiter' || id === 'saturn' ? 150 : 80,
    });
    planet.tiltGroup.add(label.sprite);
    result.labels[id] = label;

    // 궤도 라인
    const orbitLine = new OrbitLine(ORBITAL_ELEMENTS[id], {
      auScale: AU_SCALE,
      color: ORBIT_COLORS[id],
      opacity: 0.3,
      name: id,
    });
    scene.add(orbitLine.line);
    result.orbitLines[id] = orbitLine;

    // 대기 셰이더
    if (PLANETS_WITH_ATMOSPHERE.includes(id) && ATMOSPHERE_PARAMS[id]) {
      const atmo = new Atmosphere({
        planetRadius: planet.radius,
        params: ATMOSPHERE_PARAMS[id],
      });
      planet.attachToTiltGroup(atmo.mesh);
      result.atmospheres[id] = atmo;
    }

    // 토성 고리 (다운로드 텍스처 적용)
    if (id === 'saturn') {
      const ringAlphaTex = new THREE.TextureLoader().load('/textures/2k_saturn_ring_alpha.png');
      const ring = new Ring({
        innerRadius: planet.radius * SATURN_RING.innerRadiusRatio,
        outerRadius: planet.radius * SATURN_RING.outerRadiusRatio,
        planetRadius: planet.radius,
        alphaTexture: ringAlphaTex,
        tilt: SATURN_RING.tilt,
      });
      planet.attachToTiltGroup(ring.mesh);
      result.rings.saturn = ring;
    }

    // 위성
    const moonIds = Moon.getMoonsByParent(id);
    moonIds.forEach((moonId) => {
      const moon = new Moon(moonId, {
        moonScale: baseRadius * 0.00008,
        orbitScale: baseRadius * 0.000015,
      });
      planet.tiltGroup.add(moon.orbitGroup);
      result.moons[moonId] = moon;
      result.allBodies.push(moon);
    });
  });

  // --- 소행성대 ---
  const asteroidBelt = new AsteroidBelt({
    count: 5000,
    auScale: AU_SCALE,
    asteroidSize: 0.015,
  });
  scene.add(asteroidBelt.mesh);
  result.asteroidBelt = asteroidBelt;

  return result;
}

/**
 * 태양계 업데이트 (매 프레임 호출)
 * @param {object} solarSystem - initSolarSystem 반환값
 * @param {Date} simDate - 현재 시뮬레이션 날짜 (SimulationClock.update() 반환값)
 * @param {number} deltaTime - 시뮬레이션 경과 시간 (초, 자전/위성 궤도용)
 * @param {THREE.Camera} camera - 라벨 가시성용
 */
export function updateSolarSystem(solarSystem, simDate, deltaTime, camera) {
  // OrbitalEngine으로 행성 위치 업데이트
  const positions = getAllPlanetPositions(simDate);
  const sunWorldPos = new THREE.Vector3(0, 0, 0);

  for (const [id, planet] of Object.entries(solarSystem.planets)) {
    const pos = positions[id];
    if (pos) {
      planet.setPosition(pos.x, pos.y, pos.z);
    }

    // 자전 업데이트
    planet.updateRotation(deltaTime);

    // 대기 업데이트 (태양 방향)
    if (solarSystem.atmospheres[id]) {
      solarSystem.atmospheres[id].update(sunWorldPos);
    }

    // 고리 업데이트
    if (solarSystem.rings[id]) {
      solarSystem.rings[id].update(sunWorldPos, planet.getWorldPosition());
    }
  }

  // 태양 자전
  solarSystem.sun.updateRotation(deltaTime);

  // 위성 궤도 업데이트
  for (const moon of Object.values(solarSystem.moons)) {
    moon.update(deltaTime);
  }

  // 소행성대 업데이트
  if (solarSystem.asteroidBelt) {
    solarSystem.asteroidBelt.update(deltaTime);
  }

  // 라벨 가시성 업데이트
  if (camera) {
    for (const [id, label] of Object.entries(solarSystem.labels)) {
      const body = id === 'sun' ? solarSystem.sun : solarSystem.planets[id];
      if (body) {
        label.updateVisibility(camera, body.getWorldPosition());
      }
    }
  }
}

export { Sun, Planet, Moon, OrbitLine, AsteroidBelt, Label, ORBITAL_ELEMENTS, AU_SCALE };
