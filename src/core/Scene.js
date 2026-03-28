import * as THREE from 'three';

/**
 * Scene 생성 — 별 배경 + AmbientLight
 * @returns {THREE.Scene}
 */
export function createScene() {
  const scene = new THREE.Scene();

  // 별 배경 텍스처 (equirectangular → 구체 배경)
  new THREE.TextureLoader().load('/textures/2k_stars_milky_way.jpg', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;
  });

  // 배경 로딩 전 fallback
  scene.background = new THREE.Color(0x000005);

  // 야간면 최소 가시성용 약한 앰비언트
  const ambient = new THREE.AmbientLight(0x111111);
  scene.add(ambient);

  return scene;
}
