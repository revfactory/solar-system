---
name: celestial-rendering
description: "태양계 3D 시뮬레이션의 천체(태양, 행성, 위성, 소행성대, 궤도 라인) 렌더링을 구현하는 스킬. 행성 렌더링, 천체 3D, 궤도 시각화, 텍스처 적용, 행성 클래스 구현 시 반드시 이 스킬을 사용할 것."
---

# Celestial Rendering — 천체 렌더링 구현

태양, 행성, 위성, 소행성대를 Three.js로 렌더링한다.

## 데이터 소스
- 텍스처/색상: `_workspace/02_planet_visual_data.md`의 JSON 데이터 사용
- 물리 파라미터: `_workspace/02_orbital_mechanics_data.md`의 반지름/자전/축기울기
- 위성 궤도: `_workspace/02_orbital_mechanics_data.md` 섹션 6

## CelestialBody 클래스 구조

```javascript
class CelestialBody {
  constructor(config) {
    this.group = new THREE.Group(); // 공전 궤도면
    this.tiltGroup = new THREE.Group(); // 자전축 기울기
    this.mesh = null; // 구체 메시
    this.config = config;
    this.group.add(this.tiltGroup);
    this.tiltGroup.rotation.z = config.rotation.axial_tilt_deg * DEG2RAD;
  }
  updatePosition(orbitalEngine, simTime) { /* 위치 업데이트 */ }
  updateRotation(deltaTime) { /* 자전 업데이트 */ }
}
```

핵심: Group 계층으로 공전(group 위치), 축기울기(tiltGroup z회전), 자전(mesh y회전)을 분리한다. 이렇게 해야 각 변환이 독립적으로 동작한다.

## 태양 (Sun.js)
- MeshBasicMaterial (자체 발광 — 조명 영향 안 받음)
- 텍스처: `2k_sun.jpg`
- PointLight 부착 (color: 0xFFFFFF, intensity, distance)
- 크기: 실제 대비 축소 (너무 크면 내행성 가림)

## 행성 (Planet.js)
- SphereGeometry (segments: 64 기본, LOD로 조절)
- MeshStandardMaterial (map, bumpMap, normalMap, specularMap)
- 텍스처 로딩: TextureLoader로 비동기, 로딩 전 단색 fallback
- 자전: mesh.rotation.y += rotationSpeed * deltaTime
- 스케일링: `exaggerationFactor` 파라미터로 크기 과장 조절

## 위성 (Moon.js)
- CelestialBody 확장, 부모 행성 Group 내에 배치
- 부모 행성 중심 궤도 (부모 group에 add)
- 주요 위성만: 달, 이오/유로파/가니메데/칼리스토, 타이탄, 트리톤

## 궤도 라인 (OrbitLine.js)
- EllipseCurve 또는 직접 계산한 점으로 LineLoop 생성
- 케플러 궤도 요소에서 타원 경로 계산:
  ```javascript
  const points = [];
  for (let i = 0; i <= 360; i += 1) {
    const theta = i * DEG2RAD;
    const r = a * (1 - e*e) / (1 + e * Math.cos(theta));
    points.push(new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta)));
  }
  // 궤도면 회전 적용 (I, Omega, omega)
  ```
- LineBasicMaterial (color: 행성 primary color, opacity: 0.3, transparent)

## 소행성대 (AsteroidBelt.js)
- InstancedMesh (IcosahedronGeometry, count: 5000~50000)
- 화성-목성 궤도 사이 (2.2~3.2 AU)에 랜덤 분포
- y축 약간의 분산 (±0.1)으로 벨트 두께 표현

## 라벨 (Label.js)
- CSS2DRenderer 또는 Sprite + CanvasTexture
- 카메라 거리에 따라 표시/숨김
- 한국어 이름 표시

## 스케일링 전략
- AU_SCALE: 1 AU = Three.js 10 단위 (조절 가능)
- PLANET_SCALE: 행성 반지름 과장 비율 (기본 200배)
- 줌 레벨에 따라 과장 비율을 동적으로 조절하면 더 자연스러움

## 품질 기준
- 8개 행성 + 태양이 올바른 궤도 위치에 렌더링
- 텍스처가 정상 적용되고 자전이 동작
- 궤도 라인이 각 행성의 실제 궤도 형태를 반영
- 소행성대가 화성-목성 사이에 분포
