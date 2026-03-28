import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

/**
 * CameraController — OrbitControls 래퍼 + flyTo 행성 전환
 * createCamera()가 반환한 camera/controls를 감싼다.
 */
export class CameraController {
  /**
   * @param {THREE.PerspectiveCamera} camera
   * @param {import('three/addons/controls/OrbitControls.js').OrbitControls} controls
   */
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this._tweenPos = null;
    this._tweenTarget = null;
    this.isAnimating = false;
    this._followTarget = null;    // 추적 대상 (CelestialBody)
    this._followOffset = null;    // 카메라-행성 오프셋
  }

  /**
   * 행성으로 카메라 이동
   * @param {THREE.Vector3} position - 행성 월드 좌표
   * @param {number} viewRadius - 행성의 시각적 반지름 (뷰 오프셋 결정)
   * @param {number} [duration=2000] - 전환 시간(ms)
   */
  /**
   * 행성으로 카메라 이동 + 추적 시작
   * @param {THREE.Vector3} position - 행성 월드 좌표
   * @param {number} viewRadius - 행성의 시각적 반지름
   * @param {number} [duration=2000] - 전환 시간(ms)
   * @param {object} [body] - 추적할 CelestialBody (getWorldPosition 필요)
   */
  flyTo(position, viewRadius, duration = 2000, body = null) {
    this.cancelAnimation();
    this.isAnimating = true;
    this._followTarget = body;

    const offset = Math.max(viewRadius * 4, 0.5);
    const camOffset = new THREE.Vector3(offset * 0.7, offset * 0.5, offset);
    this._followOffset = camOffset.clone();

    const targetCamPos = position.clone().add(camOffset);
    const targetLookAt = position.clone();

    this._tweenPos = new TWEEN.Tween(this.camera.position)
      .to({ x: targetCamPos.x, y: targetCamPos.y, z: targetCamPos.z }, duration)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    this._tweenTarget = new TWEEN.Tween(this.controls.target)
      .to({ x: targetLookAt.x, y: targetLookAt.y, z: targetLookAt.z }, duration)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onComplete(() => {
        this.isAnimating = false;
      })
      .start();
  }

  cancelAnimation() {
    if (this._tweenPos) this._tweenPos.stop();
    if (this._tweenTarget) this._tweenTarget.stop();
    this.isAnimating = false;
  }

  /**
   * 애니메이션 루프에서 매 프레임 호출
   * 추적 대상이 있으면 카메라와 controls.target을 행성에 맞춰 이동
   */
  update() {
    TWEEN.update();

    // 추적 모드: 행성이 공전하면서 움직여도 카메라가 따라감
    if (this._followTarget && !this.isAnimating) {
      const pos = this._followTarget.getWorldPosition();
      // controls.target = 행성 위치
      this.controls.target.copy(pos);
      // 카메라 위치 = 행성 위치 + 사용자가 OrbitControls로 조정한 상대 오프셋 유지
      // (OrbitControls가 target 기준 상대 위치를 관리하므로 target만 이동하면 됨)
    }

    this.controls.update();
  }

  /** 추적 해제 */
  stopFollow() {
    this._followTarget = null;
  }

  /**
   * 초기 뷰로 리셋 (태양계 전체 조감도)
   */
  resetView() {
    this._followTarget = null;
    this.flyTo(new THREE.Vector3(0, 0, 0), 10, 1500);
  }
}
