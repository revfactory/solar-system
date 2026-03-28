/**
 * CelestialBody - 모든 천체의 기본 클래스
 * Group 계층: orbitGroup(공전) > tiltGroup(축기울기) > mesh(자전)
 */
import * as THREE from 'three';

const DEG2RAD = Math.PI / 180;

export default class CelestialBody {
  constructor(config) {
    this.config = config;
    this.name = config.name;
    this.nameKo = config.nameKo || config.name;

    // Group 계층 구조: 공전 위치 → 축 기울기 → 자전 메시
    this.orbitGroup = new THREE.Group();
    this.orbitGroup.name = `${this.name}_orbit`;

    this.tiltGroup = new THREE.Group();
    this.tiltGroup.name = `${this.name}_tilt`;
    this.orbitGroup.add(this.tiltGroup);

    // 축 기울기 적용
    const axialTilt = config.axialTilt || 0;
    this.tiltGroup.rotation.z = axialTilt * DEG2RAD;

    this.mesh = null;
    this.rotationSpeed = 0; // rad/s (시뮬레이션 시간 기준)
    this.isRetrograde = config.retrograde || false;

    // 자전 속도 계산 (시뮬레이션 초당 라디안)
    if (config.rotationPeriodHours) {
      const periodSec = Math.abs(config.rotationPeriodHours) * 3600;
      this.rotationSpeed = (2 * Math.PI) / periodSec;
      if (this.isRetrograde) this.rotationSpeed *= -1;
    }
  }

  /**
   * 궤도 엔진으로부터 위치 업데이트
   */
  setPosition(x, y, z) {
    this.orbitGroup.position.set(x, y, z);
  }

  /**
   * 자전 업데이트
   * @param {number} deltaTime - 시뮬레이션 경과 시간 (초)
   */
  updateRotation(deltaTime) {
    if (this.mesh) {
      this.mesh.rotation.y += this.rotationSpeed * deltaTime;
    }
  }

  /**
   * 매 프레임 업데이트
   */
  update(deltaTime) {
    this.updateRotation(deltaTime);
  }

  /**
   * 3D 씬에서 제거 시 정리
   */
  dispose() {
    if (this.mesh) {
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.mesh.material) {
        if (this.mesh.material.map) this.mesh.material.map.dispose();
        this.mesh.material.dispose();
      }
    }
  }

  /**
   * raycasting 대상 메시 반환
   */
  getRaycastTarget() {
    return this.mesh;
  }

  /**
   * 월드 좌표 위치 반환
   */
  getWorldPosition() {
    const pos = new THREE.Vector3();
    this.orbitGroup.getWorldPosition(pos);
    return pos;
  }
}
