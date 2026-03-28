/**
 * Moon - 위성 렌더링
 * 부모 행성 tiltGroup 내에서 독자 궤도 운동
 */
import * as THREE from 'three';
import CelestialBody from './CelestialBody.js';

/** 주요 위성 데이터 */
const MOON_DATA = {
  // 지구
  moon: {
    nameKo: '달', parent: 'earth',
    texture: '/textures/2k_moon.jpg',
    color: 0xAAAAAA,
    radiusKm: 1737.4,
    semiMajorAxisKm: 384400,
    eccentricity: 0.0554,
    inclination: 5.16,
    orbitalPeriodDays: 27.322,
  },
  // 목성 갈릴레이 위성
  io: {
    nameKo: '이오', parent: 'jupiter',
    color: 0xC8B040,
    radiusKm: 1821.49,
    semiMajorAxisKm: 421800,
    eccentricity: 0.004,
    inclination: 0.0,
    orbitalPeriodDays: 1.762732,
  },
  europa: {
    nameKo: '유로파', parent: 'jupiter',
    color: 0xB0A080,
    radiusKm: 1560.80,
    semiMajorAxisKm: 671100,
    eccentricity: 0.009,
    inclination: 0.5,
    orbitalPeriodDays: 3.525463,
  },
  ganymede: {
    nameKo: '가니메데', parent: 'jupiter',
    color: 0x988870,
    radiusKm: 2631.20,
    semiMajorAxisKm: 1070400,
    eccentricity: 0.001,
    inclination: 0.2,
    orbitalPeriodDays: 7.155588,
  },
  callisto: {
    nameKo: '칼리스토', parent: 'jupiter',
    color: 0x605848,
    radiusKm: 2410.30,
    semiMajorAxisKm: 1882700,
    eccentricity: 0.007,
    inclination: 0.3,
    orbitalPeriodDays: 16.690440,
  },
  // 토성
  titan: {
    nameKo: '타이탄', parent: 'saturn',
    color: 0xD4A050,
    radiusKm: 2574.76,
    semiMajorAxisKm: 1221900,
    eccentricity: 0.029,
    inclination: 0.3,
    orbitalPeriodDays: 15.945448,
  },
  // 해왕성
  triton: {
    nameKo: '트리톤', parent: 'neptune',
    color: 0xA0B0C0,
    radiusKm: 1352.60,
    semiMajorAxisKm: 354800,
    eccentricity: 0.0,
    inclination: 157.3, // 역행 궤도
    orbitalPeriodDays: 5.876994,
  },
};

const DEG2RAD = Math.PI / 180;

export default class Moon extends CelestialBody {
  /**
   * @param {string} moonId - 위성 식별자
   * @param {object} opts
   * @param {number} opts.moonScale - 위성 크기 스케일 (기본 0.0001)
   * @param {number} opts.orbitScale - 궤도 거리 스케일 (기본 0.00002)
   */
  constructor(moonId, opts = {}) {
    const data = MOON_DATA[moonId];
    if (!data) throw new Error(`Unknown moon: ${moonId}`);

    super({
      name: moonId,
      nameKo: data.nameKo,
      axialTilt: 0,
      rotationPeriodHours: data.orbitalPeriodDays * 24, // 조석 고정 가정
      retrograde: data.inclination > 90,
    });

    this.moonId = moonId;
    this.data = data;
    this.parentId = data.parent;

    const moonScale = opts.moonScale || 0.0001;
    const orbitScale = opts.orbitScale || 0.00002;

    this.radius = data.radiusKm * moonScale;
    this.orbitRadius = data.semiMajorAxisKm * orbitScale;
    this.orbitalPeriodSec = data.orbitalPeriodDays * 86400;
    this.orbitalSpeed = (2 * Math.PI) / this.orbitalPeriodSec;
    this.orbitalAngle = Math.random() * 2 * Math.PI; // 랜덤 초기 위상

    // 위성 메시
    const geometry = new THREE.SphereGeometry(Math.max(this.radius, 0.05), 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: data.color,
      roughness: 0.9,
      metalness: 0.0,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = `${moonId}_mesh`;
    this.mesh.userData = { type: 'moon', moonId, nameKo: data.nameKo, parent: data.parent };

    this.tiltGroup.add(this.mesh);

    // 궤도 경사 적용
    this.orbitGroup.rotation.x = data.inclination * DEG2RAD;

    // 달 텍스처 로딩
    if (data.texture) {
      this._loadTexture(data.texture);
    }
  }

  _loadTexture(url) {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        this.mesh.material.dispose();
        this.mesh.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.9,
          metalness: 0.0,
        });
      },
      undefined,
      () => {} // fallback 색상 유지
    );
  }

  /**
   * 위성 궤도 업데이트
   * @param {number} deltaTime - 시뮬레이션 경과 시간 (초)
   */
  update(deltaTime) {
    this.orbitalAngle += this.orbitalSpeed * deltaTime;

    // 타원 궤도 (간략화: 원 근사)
    const r = this.orbitRadius;
    this.mesh.position.set(
      r * Math.cos(this.orbitalAngle),
      0,
      r * Math.sin(this.orbitalAngle)
    );

    super.updateRotation(deltaTime);
  }

  dispose() {
    super.dispose();
  }
}

/** 위성 ID 목록 */
Moon.MOON_IDS = Object.keys(MOON_DATA);

/** 부모 행성별 위성 ID 목록 */
Moon.getMoonsByParent = (parentId) =>
  Object.entries(MOON_DATA)
    .filter(([, d]) => d.parent === parentId)
    .map(([id]) => id);

Moon.MOON_DATA = MOON_DATA;
