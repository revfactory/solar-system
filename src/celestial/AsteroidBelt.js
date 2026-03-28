/**
 * AsteroidBelt - 소행성대 (화성-목성 궤도 사이)
 * InstancedMesh로 수천 개의 소행성을 효율적으로 렌더링
 */
import * as THREE from 'three';

export default class AsteroidBelt {
  /**
   * @param {object} opts
   * @param {number} opts.count - 소행성 개수 (기본 5000)
   * @param {number} opts.innerAU - 내부 경계 AU (기본 2.2)
   * @param {number} opts.outerAU - 외부 경계 AU (기본 3.2)
   * @param {number} opts.auScale - 1 AU = Three.js 단위 (기본 10)
   * @param {number} opts.heightSpread - Y축 분산 (AU, 기본 0.1)
   * @param {number} opts.asteroidSize - 개별 소행성 크기 (기본 0.02)
   */
  constructor(opts = {}) {
    const count = opts.count || 5000;
    const innerAU = opts.innerAU || 2.2;
    const outerAU = opts.outerAU || 3.2;
    const auScale = opts.auScale || 10;
    const heightSpread = opts.heightSpread || 0.1;
    const asteroidSize = opts.asteroidSize || 0.02;

    this.count = count;

    // IcosahedronGeometry - 불규칙 소행성 근사
    const geometry = new THREE.IcosahedronGeometry(asteroidSize, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.95,
      metalness: 0.1,
      flatShading: true,
    });

    this.mesh = new THREE.InstancedMesh(geometry, material, count);
    this.mesh.name = 'asteroid_belt';
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = false;

    // 각 소행성의 궤도 파라미터 저장 (애니메이션용)
    this._orbitalData = new Float32Array(count * 3); // [radius, angle, speed] per asteroid

    const dummy = new THREE.Object3D();
    const innerR = innerAU * auScale;
    const outerR = outerAU * auScale;
    const hSpread = heightSpread * auScale;

    for (let i = 0; i < count; i++) {
      // 반지름: 내부-외부 범위 내 랜덤 (가우시안 분포 근사)
      const t = Math.random();
      const r = innerR + (outerR - innerR) * t;

      // 궤도 각도
      const angle = Math.random() * Math.PI * 2;

      // Y축 분산
      const y = (Math.random() - 0.5) * 2 * hSpread;

      dummy.position.set(
        r * Math.cos(angle),
        y,
        r * Math.sin(angle)
      );

      // 랜덤 회전
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // 약간의 크기 변화
      const s = 0.5 + Math.random() * 1.5;
      dummy.scale.set(s, s * (0.5 + Math.random() * 0.5), s);

      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);

      // 궤도 데이터 저장
      // 케플러 3법칙: T^2 ∝ a^3 → speed ∝ 1/sqrt(a^3)
      const aAU = r / auScale;
      const speed = 0.0000005 / Math.sqrt(aAU * aAU * aAU);

      this._orbitalData[i * 3 + 0] = r;
      this._orbitalData[i * 3 + 1] = angle;
      this._orbitalData[i * 3 + 2] = speed;
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    this._dummy = dummy;
  }

  /**
   * 소행성 궤도 애니메이션
   * @param {number} deltaTime - 시뮬레이션 경과 시간 (초)
   */
  update(deltaTime) {
    const dummy = this._dummy;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 3;
      const r = this._orbitalData[idx];
      let angle = this._orbitalData[idx + 1];
      const speed = this._orbitalData[idx + 2];

      angle += speed * deltaTime;
      this._orbitalData[idx + 1] = angle;

      // 기존 행렬에서 y와 rotation 보존을 위해 재계산
      this.mesh.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

      dummy.position.x = r * Math.cos(angle);
      dummy.position.z = r * Math.sin(angle);
      // y는 유지

      dummy.updateMatrix();
      this.mesh.setMatrixAt(i, dummy.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  setVisible(visible) {
    this.mesh.visible = visible;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.mesh.dispose();
  }
}
