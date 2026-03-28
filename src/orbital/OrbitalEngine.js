import { Body, HelioVector } from 'astronomy-engine';

/** AU → Three.js 단위 변환 비율 */
export const AU_SCALE = 10;

// astronomy-engine Body 매핑
const BODY_MAP = {
  mercury: Body.Mercury,
  venus:   Body.Venus,
  earth:   Body.Earth,
  mars:    Body.Mars,
  jupiter: Body.Jupiter,
  saturn:  Body.Saturn,
  uranus:  Body.Uranus,
  neptune: Body.Neptune,
};

/**
 * 행성의 태양 중심 위치를 AU 단위로 반환
 * @param {string} name - 행성 이름 (소문자 영문)
 * @param {Date} date - 시뮬레이션 날짜
 * @returns {{ x: number, y: number, z: number }} AU 단위 좌표
 */
export function getPlanetPosition(name, date) {
  const body = BODY_MAP[name];
  if (!body) {
    console.warn(`Unknown body: ${name}`);
    return { x: 0, y: 0, z: 0 };
  }
  const vec = HelioVector(body, date);
  return { x: vec.x, y: vec.y, z: vec.z };
}

/**
 * 행성 위치를 Three.js 스케일로 변환하여 반환
 * @param {string} name - 행성 이름
 * @param {Date} date - 시뮬레이션 날짜
 * @returns {{ x: number, y: number, z: number }} Three.js 단위 좌표
 */
export function getPlanetPositionScaled(name, date) {
  const pos = getPlanetPosition(name, date);
  return {
    x: pos.x * AU_SCALE,
    y: pos.z * AU_SCALE,   // 황도면 z → Three.js y (up)
    z: -pos.y * AU_SCALE,  // 황도면 y → Three.js -z (forward)
  };
}

/**
 * 모든 행성의 스케일된 위치를 한 번에 반환
 * @param {Date} date
 * @returns {Object.<string, {x:number, y:number, z:number}>}
 */
export function getAllPlanetPositions(date) {
  const positions = {};
  for (const name of Object.keys(BODY_MAP)) {
    positions[name] = getPlanetPositionScaled(name, date);
  }
  return positions;
}
