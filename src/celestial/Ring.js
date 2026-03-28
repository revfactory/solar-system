import * as THREE from 'three';
import ringVert from '../shaders/ring.vert';
import ringFrag from '../shaders/ring.frag';

/**
 * 행성 고리 메시 (토성 중심, 천왕성/해왕성 옵션)
 *
 * 사용법:
 *   const ring = new Ring({
 *     innerRadius: 1.3,
 *     outerRadius: 2.27,
 *     planetRadius: 1.0,
 *     colorTexture: tex,
 *     alphaTexture: alphaTex,
 *     tilt: 26.73,            // 고리 기울기 (도)
 *   });
 *   planetGroup.add(ring.mesh);
 *   // 매 프레임: ring.update(sunWorldPos, planetWorldPos);
 */

// 토성 고리 데이터 — _workspace/02_planet_visual_data.md 섹션 4 기반
export const SATURN_RING = {
  innerRadiusRatio: 1.24,   // C ring inner (planet radius 기준)
  outerRadiusRatio: 2.27,   // A ring outer
  tilt: 26.73,              // 적도 기울기 (도)
};

export class Ring {
  /**
   * @param {object} opts
   * @param {number} opts.innerRadius   - 내경 (scene 단위)
   * @param {number} opts.outerRadius   - 외경 (scene 단위)
   * @param {number} opts.planetRadius  - 행성 반지름 (그림자 계산용)
   * @param {THREE.Texture} [opts.colorTexture]  - 고리 색상 텍스처 (1D radial)
   * @param {THREE.Texture} [opts.alphaTexture]  - 고리 알파 텍스처
   * @param {number} [opts.tilt=0]      - X축 기울기 (도)
   */
  constructor({ innerRadius, outerRadius, planetRadius, colorTexture, alphaTexture, tilt = 0 }) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128, 1);

    // UV를 방사상(radial)으로 재계산
    const pos = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const t = (dist - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, t, 0.5);
    }

    // 기본 색상/알파 텍스처가 없는 경우 절차적 생성
    const defaultColor = colorTexture || this._generateDefaultTexture();
    const defaultAlpha = alphaTexture || this._generateDefaultAlpha();

    this.uniforms = {
      ringTexture:   { value: defaultColor },
      ringAlpha:     { value: defaultAlpha },
      sunPosition:   { value: new THREE.Vector3(1, 0, 0) },
      planetPosition:{ value: new THREE.Vector3(0, 0, 0) },
      planetRadius:  { value: planetRadius },
      innerRadius:   { value: innerRadius },
      outerRadius:   { value: outerRadius },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: ringVert,
      fragmentShader: ringFrag,
      uniforms: this.uniforms,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = 'ring';
    this.mesh.rotation.x = -Math.PI / 2; // XZ 평면에 놓기 (RingGeometry는 XY 기본)

    if (tilt) {
      // 고리 기울기 적용 — 행성 Group의 자전축 기울기에 이미 반영될 수 있으므로
      // 별도 필요 시만 사용
    }
  }

  /**
   * 매 프레임 호출
   * @param {THREE.Vector3} sunWorldPos    - 태양 월드 좌표
   * @param {THREE.Vector3} planetWorldPos - 행성 월드 좌표
   */
  update(sunWorldPos, planetWorldPos) {
    this.uniforms.sunPosition.value.copy(sunWorldPos);
    this.uniforms.planetPosition.value.copy(planetWorldPos);
  }

  /** 절차적 토성 고리 색상 텍스처 (1D, 256px) */
  _generateDefaultTexture() {
    const width = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    // 토성 고리 구간별 색상 (C → B → Cassini → A)
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0.0, '#9C8A6A');   // C ring start
    gradient.addColorStop(0.28, '#B0A070');   // C ring end
    gradient.addColorStop(0.29, '#D4BA82');   // B ring start
    gradient.addColorStop(0.64, '#E8D098');   // B ring brightest
    gradient.addColorStop(0.65, '#1A1A1A');   // Cassini division
    gradient.addColorStop(0.72, '#1A1A1A');   // Cassini division end
    gradient.addColorStop(0.73, '#C8B078');   // A ring start
    gradient.addColorStop(1.0, '#B0A060');    // A ring end

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, 1);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }

  /** 절차적 토성 고리 알파 텍스처 (1D, 256px) */
  _generateDefaultAlpha() {
    const width = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    // 구간별 투명도 (optical depth 기반)
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0.0, 'rgba(255,255,255,0.15)');  // C ring (반투명)
    gradient.addColorStop(0.28, 'rgba(255,255,255,0.20)');
    gradient.addColorStop(0.29, 'rgba(255,255,255,0.90)'); // B ring (밀도 높음)
    gradient.addColorStop(0.64, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.65, 'rgba(255,255,255,0.05)'); // Cassini division
    gradient.addColorStop(0.72, 'rgba(255,255,255,0.05)');
    gradient.addColorStop(0.73, 'rgba(255,255,255,0.70)'); // A ring
    gradient.addColorStop(1.0, 'rgba(255,255,255,0.50)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, 1);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    // Dispose procedural textures
    Object.values(this.uniforms).forEach(u => {
      if (u.value && u.value.dispose) u.value.dispose();
    });
  }
}
