import * as THREE from 'three';
import atmosphereVert from '../shaders/atmosphere.vert';
import atmosphereFrag from '../shaders/atmosphere.frag';

/**
 * 행성 대기 산란 메시 (Rayleigh/Mie 레이마칭)
 *
 * 사용법:
 *   const atmo = new Atmosphere({ planetRadius: 1.0, params: ATMOSPHERE_PARAMS.earth });
 *   planetGroup.add(atmo.mesh);
 *   // 매 프레임: atmo.update(sunWorldPos);
 */

// 행성별 대기 파라미터 — _workspace/02_planet_visual_data.md 섹션 3 기반
export const ATMOSPHERE_PARAMS = {
  earth: {
    rayleighCoefficients: [5.5e-6, 13.0e-6, 22.4e-6],
    rayleighScaleHeight: 8000,
    mieCoefficient: 21e-6,
    mieScaleHeight: 1200,
    mieG: 0.758,
    atmosphereHeightRatio: 0.016,
    sunIntensity: 22.0,
  },
  venus: {
    rayleighCoefficients: [7.0e-6, 12.0e-6, 16.0e-6],
    rayleighScaleHeight: 15900,
    mieCoefficient: 50e-6,
    mieScaleHeight: 2500,
    mieG: 0.70,
    atmosphereHeightRatio: 0.041,
    sunIntensity: 40.0,
  },
  mars: {
    rayleighCoefficients: [19.918e-6, 13.57e-6, 5.75e-6],
    rayleighScaleHeight: 11100,
    mieCoefficient: 4e-6,
    mieScaleHeight: 11100,
    mieG: 0.76,
    atmosphereHeightRatio: 0.029,
    sunIntensity: 15.0,
  },
  jupiter: {
    rayleighCoefficients: [3.8e-6, 9.0e-6, 15.5e-6],
    rayleighScaleHeight: 27000,
    mieCoefficient: 15e-6,
    mieScaleHeight: 12000,
    mieG: 0.80,
    atmosphereHeightRatio: 0.014,
    sunIntensity: 8.0,
  },
  saturn: {
    rayleighCoefficients: [4.0e-6, 9.5e-6, 16.0e-6],
    rayleighScaleHeight: 59500,
    mieCoefficient: 10e-6,
    mieScaleHeight: 25000,
    mieG: 0.78,
    atmosphereHeightRatio: 0.017,
    sunIntensity: 6.0,
  },
  uranus: {
    rayleighCoefficients: [5.0e-6, 12.0e-6, 24.0e-6],
    rayleighScaleHeight: 27700,
    mieCoefficient: 5e-6,
    mieScaleHeight: 15000,
    mieG: 0.75,
    atmosphereHeightRatio: 0.020,
    sunIntensity: 4.0,
  },
  neptune: {
    rayleighCoefficients: [6.0e-6, 14.0e-6, 26.0e-6],
    rayleighScaleHeight: 19700,
    mieCoefficient: 8e-6,
    mieScaleHeight: 10000,
    mieG: 0.77,
    atmosphereHeightRatio: 0.020,
    sunIntensity: 3.0,
  },
};

const _isMobile = /Mobi|Android/i.test(navigator.userAgent);

export class Atmosphere {
  /**
   * @param {object} opts
   * @param {number} opts.planetRadius - 행성 메시의 반지름 (scene 단위)
   * @param {object} opts.params       - ATMOSPHERE_PARAMS 중 하나
   * @param {boolean} [opts.mobile]    - 모바일 여부 (자동 감지)
   */
  constructor({ planetRadius, params, mobile = _isMobile }) {
    const p = params;
    const atmoRadius = planetRadius * (1.0 + p.atmosphereHeightRatio);
    const samples = mobile ? 8 : 16;
    const samplesLight = mobile ? 4 : 8;

    this.uniforms = {
      sunPosition:          { value: new THREE.Vector3(1, 0, 0) },
      sunIntensity:         { value: p.sunIntensity },
      planetRadius:         { value: planetRadius },
      atmosphereRadius:     { value: atmoRadius },
      rayleighCoefficients: { value: new THREE.Vector3(...p.rayleighCoefficients) },
      mieCoefficient:       { value: p.mieCoefficient },
      rayleighScaleHeight:  { value: p.rayleighScaleHeight },
      mieScaleHeight:       { value: p.mieScaleHeight },
      mieG:                 { value: p.mieG },
      numSamples:           { value: samples },
      numSamplesLight:      { value: samplesLight },
    };

    const geometry = new THREE.SphereGeometry(atmoRadius, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      uniforms: this.uniforms,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = 'atmosphere';
    this.mesh.renderOrder = 1;
  }

  /**
   * 매 프레임 호출 — 태양 위치를 대기 로컬 좌표계로 변환
   * @param {THREE.Vector3} sunWorldPos - 태양의 월드 좌표
   */
  update(sunWorldPos) {
    // 대기 메시는 행성 Group에 추가되므로, 태양 위치를 로컬 좌표로 변환
    this.mesh.worldToLocal(sunWorldPos.clone());
    this.uniforms.sunPosition.value.copy(
      this.mesh.worldToLocal(sunWorldPos.clone())
    );
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
