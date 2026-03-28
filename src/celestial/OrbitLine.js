/**
 * OrbitLine - 케플러 궤도 타원 시각화
 * 궤도 요소로부터 타원 경로를 계산하여 LineLoop으로 렌더링
 */
import * as THREE from 'three';

const DEG2RAD = Math.PI / 180;

// J2000.0 황도 경사각 (ecliptic obliquity)
const OBLIQUITY = 23.4392911 * DEG2RAD;
const COS_OBL = Math.cos(OBLIQUITY);
const SIN_OBL = Math.sin(OBLIQUITY);

export default class OrbitLine {
  /**
   * @param {object} elements - 케플러 궤도 요소
   * @param {number} elements.a - 반장축 (AU)
   * @param {number} elements.e - 이심률
   * @param {number} elements.I - 궤도 경사 (deg)
   * @param {number} elements.Omega - 승교점 경도 (deg)
   * @param {number} elements.omega_bar - 근일점 경도 (deg)
   * @param {object} opts
   * @param {number} opts.auScale - 1 AU = Three.js 단위 (기본 10)
   * @param {number} opts.color - 라인 색상
   * @param {number} opts.opacity - 라인 투명도 (기본 0.3)
   * @param {number} opts.segments - 세그먼트 수 (기본 360)
   */
  constructor(elements, opts = {}) {
    this.elements = elements;
    const auScale = opts.auScale || 10;
    const color = opts.color || 0xFFFFFF;
    const opacity = opts.opacity ?? 0.3;
    const segments = opts.segments || 360;

    const { a, e, I, Omega, omega_bar } = elements;
    const omega = omega_bar - Omega; // 근일점 편각

    // 궤도 타원 점 계산
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * 2 * Math.PI;
      const r = a * (1 - e * e) / (1 + e * Math.cos(theta));

      // 궤도면 내 좌표
      const xPrime = r * Math.cos(theta);
      const yPrime = r * Math.sin(theta);

      // 궤도면 → 황도면 회전
      const omegaRad = omega * DEG2RAD;
      const OmegaRad = Omega * DEG2RAD;
      const IRad = I * DEG2RAD;

      const cosO = Math.cos(OmegaRad), sinO = Math.sin(OmegaRad);
      const cosI = Math.cos(IRad), sinI = Math.sin(IRad);
      const cosw = Math.cos(omegaRad), sinw = Math.sin(omegaRad);

      // 황도 좌표 (ecliptic)
      const xEcl = (cosO * cosw - sinO * sinw * cosI) * xPrime +
                   (-cosO * sinw - sinO * cosw * cosI) * yPrime;
      const yEcl = (sinO * cosw + cosO * sinw * cosI) * xPrime +
                   (-sinO * sinw + cosO * cosw * cosI) * yPrime;
      const zEcl = (sinw * sinI) * xPrime +
                   (cosw * sinI) * yPrime;

      // 황도 → 적도 변환 (obliquity 23.44° 회전)
      // astronomy-engine HelioVector가 적도 좌표를 반환하므로 맞춰야 함
      const xEq = xEcl;
      const yEq = yEcl * COS_OBL - zEcl * SIN_OBL;
      const zEq = yEcl * SIN_OBL + zEcl * COS_OBL;

      // 적도 좌표 → Three.js Y-up (OrbitalEngine.getPlanetPositionScaled과 동일)
      points.push(new THREE.Vector3(xEq * auScale, zEq * auScale, -yEq * auScale));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      opacity,
      transparent: true,
      depthWrite: false,
    });

    this.line = new THREE.LineLoop(geometry, material);
    this.line.name = `orbit_${opts.name || 'unknown'}`;
    this.line.renderOrder = -1;
  }

  setOpacity(opacity) {
    this.line.material.opacity = opacity;
  }

  setVisible(visible) {
    this.line.visible = visible;
  }

  dispose() {
    this.line.geometry.dispose();
    this.line.material.dispose();
  }
}
