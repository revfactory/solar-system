/**
 * Sun - 태양 렌더링
 * MeshBasicMaterial (자체 발광), PointLight 부착
 */
import * as THREE from 'three';
import CelestialBody from './CelestialBody.js';

const SUN_COLOR = 0xFFF5E0;
const LIGHT_COLOR = 0xFFFFFF;

export default class Sun extends CelestialBody {
  /**
   * @param {object} opts
   * @param {number} opts.radius - Three.js 단위 반지름
   * @param {number} opts.lightIntensity - PointLight 강도 (기본 2.0)
   */
  constructor(opts = {}) {
    super({
      name: 'sun',
      nameKo: '태양',
      axialTilt: 7.25,
      rotationPeriodHours: 609.12, // ~25.38일 항성 자전 주기
      retrograde: false,
    });

    const radius = opts.radius || 2.0;
    const lightIntensity = opts.lightIntensity ?? 2.0;

    // 단색 fallback material
    const fallbackMat = new THREE.MeshBasicMaterial({ color: SUN_COLOR });

    // 구체 생성
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    this.mesh = new THREE.Mesh(geometry, fallbackMat);
    this.mesh.name = 'sun_mesh';
    this.mesh.userData = { type: 'star', planetId: 'sun', nameKo: '태양' };
    this.tiltGroup.add(this.mesh);

    // PointLight
    this.light = new THREE.PointLight(LIGHT_COLOR, lightIntensity, 0, 0);
    this.light.name = 'sun_light';
    this.orbitGroup.add(this.light);

    // AmbientLight (아주 약하게 - 행성 뒷면 완전 암흑 방지)
    this.ambientLight = new THREE.AmbientLight(LIGHT_COLOR, 0.06);
    this.orbitGroup.add(this.ambientLight);

    // 텍스처 비동기 로딩
    this._loadTexture(radius);
  }

  _loadTexture() {
    new THREE.TextureLoader().load('/textures/2k_sun.jpg', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.mesh.material.dispose();
      this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
    });
  }

  update(deltaTime) {
    super.update(deltaTime);
  }

  dispose() {
    if (this.light) this.light.dispose();
    if (this.ambientLight) this.ambientLight.dispose();
    super.dispose();
  }
}
