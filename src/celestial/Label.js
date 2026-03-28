/**
 * Label - 행성/위성 이름 라벨
 * Sprite + CanvasTexture로 구현 (CSS2DRenderer 없이 동작)
 */
import * as THREE from 'three';

export default class Label {
  /**
   * @param {string} text - 표시할 텍스트
   * @param {object} opts
   * @param {number} opts.fontSize - 폰트 크기 (기본 48)
   * @param {string} opts.fontFamily - 폰트 패밀리 (기본 'sans-serif')
   * @param {string} opts.color - 텍스트 색상 (기본 '#FFFFFF')
   * @param {number} opts.yOffset - Y축 오프셋 (기본 1.5)
   * @param {number} opts.maxVisibleDistance - 최대 표시 거리 (기본 100)
   */
  constructor(text, opts = {}) {
    this.text = text;
    const fontSize = opts.fontSize || 48;
    const fontFamily = opts.fontFamily || 'sans-serif';
    const color = opts.color || '#FFFFFF';
    this.yOffset = opts.yOffset ?? 1.5;
    this.maxVisibleDistance = opts.maxVisibleDistance || 100;

    // Canvas 텍스처 생성
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;

    canvas.width = Math.ceil(textWidth) + 20;
    canvas.height = fontSize + 20;

    // 다시 그리기 (캔버스 크기 변경 후 폰트 재설정)
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      sizeAttenuation: false,
    });

    this.sprite = new THREE.Sprite(material);
    this.sprite.name = `label_${text}`;
    this.sprite.scale.set(
      (canvas.width / canvas.height) * 0.05,
      0.05,
      1
    );
    this.sprite.position.y = this.yOffset;
    this.sprite.renderOrder = 999;

    this._canvas = canvas;
  }

  /**
   * 카메라 거리에 따른 가시성 업데이트
   * @param {THREE.Camera} camera
   * @param {THREE.Vector3} worldPos - 부모 오브젝트 월드 좌표
   */
  updateVisibility(camera, worldPos) {
    const dist = camera.position.distanceTo(worldPos);
    this.sprite.visible = dist < this.maxVisibleDistance;
  }

  dispose() {
    this.sprite.material.map.dispose();
    this.sprite.material.dispose();
  }
}
