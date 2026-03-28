/**
 * ProceduralTextures - Canvas 기반 절차적 행성 텍스처 생성
 * 외부 이미지 의존성 없이 각 행성의 특징적 외관을 표현
 */
import * as THREE from 'three';

const WIDTH = 512;
const HEIGHT = 256;

/** 시드 기반 유사 난수 */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** 심플렉스 노이즈 근사 (2D) */
function noise2D(x, y, seed) {
  const rand = seededRandom(Math.floor(x * 1000 + y * 7000 + seed));
  const n = rand();
  return n * 2 - 1;
}

/** 프랙탈 노이즈 */
function fbm(x, y, seed, octaves = 4) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    // 바이리니어 보간 노이즈
    const ix = Math.floor(x * frequency);
    const iy = Math.floor(y * frequency);
    const fx = x * frequency - ix;
    const fy = y * frequency - iy;
    const a = noise2D(ix, iy, seed + i * 100);
    const b = noise2D(ix + 1, iy, seed + i * 100);
    const c = noise2D(ix, iy + 1, seed + i * 100);
    const d = noise2D(ix + 1, iy + 1, seed + i * 100);
    const ab = a + (b - a) * fx;
    const cd = c + (d - c) * fx;
    value += (ab + (cd - ab) * fy) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value;
}

/** 색상 보간 */
function lerpColor(c1, c2, t) {
  return [
    c1[0] + (c2[0] - c1[0]) * t,
    c1[1] + (c2[1] - c1[1]) * t,
    c1[2] + (c2[2] - c1[2]) * t,
  ];
}

function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  return canvas;
}

function canvasToTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/** 수성 — 회색 크레이터 표면 */
function generateMercury() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 60, y / 60, 1, 6) * 0.5 + 0.5;
      const crater = fbm(x / 20, y / 20, 100, 3);
      const v = Math.floor((n * 0.7 + Math.max(0, -crater) * 0.3) * 180 + 40);
      data[i] = v + 10;
      data[i + 1] = v;
      data[i + 2] = v - 10;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 금성 — 황갈색 구름 */
function generateVenus() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 80, y / 40, 2, 5) * 0.5 + 0.5;
      const band = Math.sin(y / HEIGHT * Math.PI * 6) * 0.1;
      const v = n + band;
      const c = lerpColor([210, 180, 120], [240, 210, 160], v);
      data[i] = Math.min(255, c[0]);
      data[i + 1] = Math.min(255, c[1]);
      data[i + 2] = Math.min(255, c[2]);
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 지구 — 파란 바다 + 녹색 대륙 */
function generateEarth() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const continent = fbm(x / 50, y / 50, 3, 5);
      const detail = fbm(x / 15, y / 15, 33, 3) * 0.2;
      const lat = (y / HEIGHT - 0.5) * Math.PI;
      const polar = Math.abs(lat) > 1.2 ? 1 : 0;

      let c;
      if (polar && continent > -0.1) {
        c = [240, 240, 250]; // 극지방 빙하
      } else if (continent + detail > 0.05) {
        const green = fbm(x / 30, y / 30, 44, 3) * 0.3;
        c = lerpColor([60, 120, 50], [140, 160, 80], green + 0.5); // 대륙
      } else {
        const depth = Math.max(0, -continent) * 0.5;
        c = lerpColor([30, 80, 160], [20, 50, 120], depth); // 바다
      }
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 화성 — 붉은 사막 */
function generateMars() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 50, y / 50, 4, 5) * 0.5 + 0.5;
      const detail = fbm(x / 15, y / 15, 44, 3) * 0.15;
      const lat = Math.abs(y / HEIGHT - 0.5) * 2;
      const polar = lat > 0.85 ? (lat - 0.85) / 0.15 : 0;
      const v = n + detail;
      let c = lerpColor([160, 60, 20], [200, 130, 70], v);
      if (polar > 0) c = lerpColor(c, [220, 210, 200], polar);
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 목성 — 가로 줄무늬 + 대적점 */
function generateJupiter() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  const colors = [
    [200, 170, 120], [180, 140, 80], [220, 190, 140],
    [160, 110, 60], [210, 180, 130], [170, 130, 70],
  ];
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const bandY = y / HEIGHT * 12;
      const bandIndex = Math.floor(bandY) % colors.length;
      const bandFrac = bandY - Math.floor(bandY);
      const nextIndex = (bandIndex + 1) % colors.length;
      const turb = fbm(x / 100, y / 30, 5, 4) * 0.3;
      const t = Math.min(1, Math.max(0, bandFrac + turb));
      let c = lerpColor(colors[bandIndex], colors[nextIndex], t);
      // 대적점 (x:60%, y:55% 부근)
      const grsX = x / WIDTH - 0.6;
      const grsY = y / HEIGHT - 0.55;
      const grsDist = Math.sqrt(grsX * grsX * 4 + grsY * grsY * 16);
      if (grsDist < 0.15) {
        const grsBlend = 1 - grsDist / 0.15;
        c = lerpColor(c, [190, 70, 40], grsBlend * 0.8);
      }
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 토성 — 연한 황금 줄무늬 */
function generateSaturn() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const band = Math.sin(y / HEIGHT * Math.PI * 10) * 0.5 + 0.5;
      const turb = fbm(x / 120, y / 40, 6, 4) * 0.2;
      const v = band + turb;
      const c = lerpColor([200, 180, 100], [240, 220, 160], v);
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 천왕성 — 청록색 균일 */
function generateUranus() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 100, y / 80, 7, 3) * 0.1;
      const band = Math.sin(y / HEIGHT * Math.PI * 4) * 0.05;
      const v = 0.5 + n + band;
      const c = lerpColor([90, 170, 175], [130, 210, 215], v);
      data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2]; data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 해왕성 — 진한 파란색 */
function generateNeptune() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 90, y / 60, 8, 4) * 0.15;
      const band = Math.sin(y / HEIGHT * Math.PI * 5) * 0.08;
      const v = 0.5 + n + band;
      const c = lerpColor([40, 70, 170], [80, 120, 210], v);
      // 대흑점
      const dsX = x / WIDTH - 0.3;
      const dsY = y / HEIGHT - 0.45;
      const dsDist = Math.sqrt(dsX * dsX * 4 + dsY * dsY * 16);
      if (dsDist < 0.1) {
        const dsBlend = 1 - dsDist / 0.1;
        const dc = lerpColor(c, [20, 40, 100], dsBlend * 0.6);
        data[i] = dc[0]; data[i + 1] = dc[1]; data[i + 2] = dc[2];
      } else {
        data[i] = c[0]; data[i + 1] = c[1]; data[i + 2] = c[2];
      }
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

/** 태양 — 밝은 황백색 + 활동 영역 */
export function generateSunTexture() {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const data = imageData.data;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const i = (y * WIDTH + x) * 4;
      const n = fbm(x / 30, y / 30, 9, 5) * 0.3 + 0.7;
      const spots = fbm(x / 15, y / 15, 99, 3);
      const v = Math.min(1, n + (spots > 0.3 ? (spots - 0.3) * 0.5 : 0));
      data[i] = Math.min(255, Math.floor(v * 255));
      data[i + 1] = Math.min(255, Math.floor(v * 230));
      data[i + 2] = Math.min(255, Math.floor(v * 180));
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return canvasToTexture(canvas);
}

const GENERATORS = {
  mercury: generateMercury,
  venus: generateVenus,
  earth: generateEarth,
  mars: generateMars,
  jupiter: generateJupiter,
  saturn: generateSaturn,
  uranus: generateUranus,
  neptune: generateNeptune,
};

/**
 * 행성의 절차적 텍스처 생성
 * @param {string} planetId
 * @returns {THREE.CanvasTexture}
 */
export function generatePlanetTexture(planetId) {
  const gen = GENERATORS[planetId];
  if (!gen) return null;
  return gen();
}
