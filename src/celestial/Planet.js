/**
 * Planet - 행성 렌더링
 * MeshStandardMaterial + 텍스처, 자전, 축 기울기, 크기 과장
 */
import * as THREE from 'three';
import CelestialBody from './CelestialBody.js';

/** 행성별 데이터: 로컬 텍스처 경로, fallback 색상, 물리 파라미터 */
const PLANET_DATA = {
  mercury: {
    nameKo: '수성',
    texture: '/textures/2k_mercury.jpg',
    color: 0x8C7E6E,
    equatorialRadiusKm: 2440.53,
    rotationPeriodHours: 1407.6,
    axialTilt: 0.034,
    retrograde: false,
  },
  venus: {
    nameKo: '금성',
    texture: '/textures/2k_venus_surface.jpg',
    atmosphereTexture: '/textures/2k_venus_atmosphere.jpg',
    color: 0xE8CDA0,
    equatorialRadiusKm: 6051.8,
    rotationPeriodHours: 5832.6,
    axialTilt: 177.36,
    retrograde: true,
  },
  earth: {
    nameKo: '지구',
    texture: '/textures/2k_earth_daymap.jpg',
    nightTexture: '/textures/2k_earth_nightmap.jpg',
    color: 0x2B65D9,
    equatorialRadiusKm: 6378.14,
    rotationPeriodHours: 23.9345,
    axialTilt: 23.4393,
    retrograde: false,
  },
  mars: {
    nameKo: '화성',
    texture: '/textures/2k_mars.jpg',
    color: 0xC1440E,
    equatorialRadiusKm: 3396.19,
    rotationPeriodHours: 24.6229,
    axialTilt: 25.19,
    retrograde: false,
  },
  jupiter: {
    nameKo: '목성',
    texture: '/textures/2k_jupiter.jpg',
    color: 0xC88B3A,
    equatorialRadiusKm: 71492,
    rotationPeriodHours: 9.925,
    axialTilt: 3.13,
    retrograde: false,
  },
  saturn: {
    nameKo: '토성',
    texture: '/textures/2k_saturn.jpg',
    color: 0xE8D088,
    equatorialRadiusKm: 60268,
    rotationPeriodHours: 10.656,
    axialTilt: 26.73,
    retrograde: false,
  },
  uranus: {
    nameKo: '천왕성',
    texture: '/textures/2k_uranus.jpg',
    color: 0x73C2C6,
    equatorialRadiusKm: 25559,
    rotationPeriodHours: 17.24,
    axialTilt: 97.77,
    retrograde: true,
  },
  neptune: {
    nameKo: '해왕성',
    texture: '/textures/2k_neptune.jpg',
    color: 0x3B5FC0,
    equatorialRadiusKm: 24764,
    rotationPeriodHours: 16.11,
    axialTilt: 28.32,
    retrograde: false,
  },
};

/** 지구 반지름 기준 스케일링 상수 */
const EARTH_RADIUS_KM = 6378.14;

export default class Planet extends CelestialBody {
  /**
   * @param {string} planetId - 행성 식별자 (mercury, venus, earth, ...)
   * @param {object} opts
   * @param {number} opts.baseRadius - 지구 기준 Three.js 단위 반지름 (기본 0.5)
   * @param {number} opts.exaggeration - 크기 과장 계수 (기본 1.0)
   * @param {number} opts.segments - 구체 세그먼트 수 (기본 64)
   */
  constructor(planetId, opts = {}) {
    const data = PLANET_DATA[planetId];
    if (!data) throw new Error(`Unknown planet: ${planetId}`);

    super({
      name: planetId,
      nameKo: data.nameKo,
      axialTilt: data.axialTilt,
      rotationPeriodHours: data.rotationPeriodHours,
      retrograde: data.retrograde,
    });

    this.planetId = planetId;
    this.data = data;

    const baseRadius = opts.baseRadius || 0.5;
    const exaggeration = opts.exaggeration || 1.0;
    const segments = opts.segments || 64;

    // 지구 대비 상대 반지름
    const relativeRadius = data.equatorialRadiusKm / EARTH_RADIUS_KM;
    this.radius = baseRadius * relativeRadius * exaggeration;

    // 단색 fallback material
    const fallbackMat = new THREE.MeshStandardMaterial({
      color: data.color,
      roughness: 0.8,
      metalness: 0.1,
    });

    const geometry = new THREE.SphereGeometry(this.radius, segments, segments);
    this.mesh = new THREE.Mesh(geometry, fallbackMat);
    this.mesh.name = `${planetId}_mesh`;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.tiltGroup.add(this.mesh);

    // userData에 행성 정보 저장 (raycasting 시 식별)
    this.mesh.userData = {
      type: 'planet',
      planetId,
      nameKo: data.nameKo,
      equatorialRadiusKm: data.equatorialRadiusKm,
    };

    // 텍스처 비동기 로딩
    this._loadTexture();
  }

  _loadTexture() {
    const loader = new THREE.TextureLoader();
    loader.load(
      this.data.texture,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
          metalness: 0.1,
        });
        this.mesh.material.dispose();
        this.mesh.material = mat;
      },
      undefined,
      (err) => {
        console.warn(`${this.name} texture load failed, keeping fallback:`, err);
      }
    );
  }

  /**
   * 크기 과장 계수 동적 변경
   */
  setExaggeration(factor) {
    const relativeRadius = this.data.equatorialRadiusKm / EARTH_RADIUS_KM;
    const baseRadius = this.radius / (relativeRadius * (this._prevExaggeration || 1));
    this.radius = baseRadius * relativeRadius * factor;
    this._prevExaggeration = factor;
    this.mesh.geometry.dispose();
    this.mesh.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
  }

  /**
   * material 교체 (셰이더 엔지니어용 인터페이스)
   */
  setMaterial(material) {
    if (this.mesh.material) this.mesh.material.dispose();
    this.mesh.material = material;
  }

  /**
   * 대기/고리 등 부가 오브젝트 부착 포인트
   * tiltGroup에 추가하면 축 기울기와 함께 회전
   */
  attachToTiltGroup(object3d) {
    this.tiltGroup.add(object3d);
  }

  /**
   * 행성 메타데이터 반환 (UI용)
   */
  getMetadata() {
    return {
      id: this.planetId,
      name: this.name,
      nameKo: this.nameKo,
      equatorialRadiusKm: this.data.equatorialRadiusKm,
      axialTilt: this.data.axialTilt,
      rotationPeriodHours: this.data.rotationPeriodHours,
      retrograde: this.data.retrograde,
    };
  }
}

/** 모든 행성 ID 목록 (궤도 순서) */
Planet.PLANET_IDS = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

/** 행성 데이터 접근 */
Planet.PLANET_DATA = PLANET_DATA;
