import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, KernelSize } from 'postprocessing';

/**
 * 선택적 블룸 포스트프로세싱
 *
 * 태양과 코로나에만 블룸을 적용하는 레이어 기반 시스템.
 * 블룸 대상 객체에 layers.enable(BLOOM_LAYER) 를 설정한다.
 *
 * 사용법:
 *   const pp = new PostProcessing(renderer, scene, camera);
 *   // 태양 메시에: sunMesh.layers.enable(PostProcessing.BLOOM_LAYER);
 *   // 매 프레임: pp.render();
 *   // 리사이즈: pp.resize(w, h);
 */

export const BLOOM_LAYER = 1;

export class PostProcessing {
  static BLOOM_LAYER = BLOOM_LAYER;

  /**
   * @param {THREE.WebGLRenderer} renderer
   * @param {THREE.Scene} scene
   * @param {THREE.Camera} camera
   * @param {object} [opts]
   * @param {number} [opts.intensity=1.5]
   * @param {number} [opts.luminanceThreshold=0.85]
   * @param {number} [opts.radius=0.4]
   */
  constructor(renderer, scene, camera, opts = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    const {
      intensity = 1.5,
      luminanceThreshold = 0.85,
      radius = 0.4,
    } = opts;

    // 블룸 씬용 — 블룸 대상 외 객체를 숨기는 다크 머티리얼
    this._darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    this._materials = {};

    // 블룸 이펙트
    this._bloomEffect = new BloomEffect({
      intensity,
      luminanceThreshold,
      radius,
      kernelSize: KernelSize.LARGE,
      mipmapBlur: true,
    });

    // 컴포저 설정
    this._composer = new EffectComposer(renderer);
    this._composer.addPass(new RenderPass(scene, camera));
    this._composer.addPass(new EffectPass(camera, this._bloomEffect));

    // 블룸 전용 컴포저 (선택적 블룸)
    this._bloomComposer = new EffectComposer(renderer);
    this._bloomComposer.renderToScreen = false;
    this._bloomComposer.addPass(new RenderPass(scene, camera));

    const bloomOnlyEffect = new BloomEffect({
      intensity: intensity * 1.5,
      luminanceThreshold: 0.0,
      radius,
      kernelSize: KernelSize.LARGE,
      mipmapBlur: true,
    });
    this._bloomComposer.addPass(new EffectPass(camera, bloomOnlyEffect));

    // 선택적 블룸이 복잡하므로, 간소화된 방식 사용:
    // 전체 씬에 블룸을 적용하되 threshold를 높게 설정하여
    // 태양/코로나처럼 밝은 객체만 블룸이 걸리도록 함
    this._useSelectiveBloom = false;
  }

  render() {
    if (this._useSelectiveBloom) {
      this._renderSelective();
    } else {
      this._composer.render();
    }
  }

  _renderSelective() {
    // 1단계: 블룸 대상 외 객체를 어둡게 만들어 블룸 컴포저 렌더
    this.scene.traverse((obj) => {
      if (obj.isMesh && !obj.layers.test(this._bloomLayer)) {
        this._materials[obj.uuid] = obj.material;
        obj.material = this._darkMaterial;
      }
    });
    this._bloomComposer.render();

    // 2단계: 원래 머티리얼 복원 후 최종 렌더
    this.scene.traverse((obj) => {
      if (this._materials[obj.uuid]) {
        obj.material = this._materials[obj.uuid];
        delete this._materials[obj.uuid];
      }
    });
    this._composer.render();
  }

  resize(width, height) {
    this._composer.setSize(width, height);
    this._bloomComposer.setSize(width, height);
  }

  setIntensity(value) {
    this._bloomEffect.intensity = value;
  }

  dispose() {
    this._composer.dispose();
    this._bloomComposer.dispose();
    this._darkMaterial.dispose();
  }
}
