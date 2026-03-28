---
name: simulation-ui
description: "태양계 시뮬레이션의 UI/UX(정보 패널, 시간 타임라인, 행성 네비게이션, 카메라 전환, 반응형)를 구현하는 스킬. UI 구현, 정보 패널, 시간 제어, 카메라 컨트롤, 반응형 디자인 시 반드시 이 스킬을 사용할 것."
---

# Simulation UI — UI/UX + 인터랙션 구현

시간 제어, 행성 정보, 네비게이션, 카메라 전환을 구현한다.

## 데이터 소스
- UX 패턴: `_workspace/02_simulation_references.md` 섹션 3의 Best Practices
- 카메라 패턴: `_workspace/02_webgl_tech_research.md` 섹션 3.5
- 시간 제어: `_workspace/02_webgl_tech_research.md` 섹션 3.6

## 레이아웃 구조 (index.html)

```html
<div id="app">
  <canvas id="canvas"></canvas>
  <div id="loading-screen">...</div>
  <nav id="navigation">...</nav>
  <div id="info-panel">...</div>
  <div id="timeline">...</div>
  <div id="controls-overlay">...</div>
</div>
```

모든 UI는 canvas 위에 absolute/fixed로 오버레이. CSS pointer-events로 3D 인터랙션 패스스루.

## 카메라 제어 (CameraController.js)

### OrbitControls 기본 설정
```javascript
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 0.1;
controls.maxDistance = 500;
controls.enablePan = true;
```

### 행성 간 전환 (Tween)
```javascript
function flyTo(planet) {
  const targetPos = planet.getViewPosition(); // 행성 위치 + 오프셋
  new TWEEN.Tween(camera.position)
    .to(targetPos, 2000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .start();
  new TWEEN.Tween(controls.target)
    .to(planet.position, 2000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .start();
}
```

## 시간 제어 (Timeline.js + TimeController.js)

### UI 구조
```
[⏮] [⏪] [⏯] [⏩] [⏭]  |  2026-03-28  |  ×1일/초  |  ━━━━━●━━━━━
```

### 배속 프리셋
| 버튼 | timeScale | 라벨 |
|------|-----------|------|
| ⏮ | -31536000 | -1년/초 |
| ⏪ | -86400 | -1일/초 |
| ⏯ | 0/1 | 일시정지/실시간 |
| ⏩ | 86400 | 1일/초 |
| ⏭ | 31536000 | 1년/초 |

### TimeController
SimulationClock의 래퍼. UI 이벤트를 Clock API로 변환.

## 정보 패널 (InfoPanel.js)

### 트리거
- 행성 클릭 (Raycaster) → 패널 슬라이드인
- 네비게이션 목록 클릭 → 패널 슬라이드인 + 카메라 전환

### 구조
```
┌─────────────────┐
│ [X]  수성 Mercury│
├─────────────────┤
│ [개요] [물리] [탐사]│
├─────────────────┤
│ 태양에서 가장...   │
│                 │
│ 반지름: 2,440 km │
│ 질량: 0.33×10²⁴kg│
│ ...              │
└─────────────────┘
```

### 데이터
`public/data/planets.json`에서 로드. 한국어 설명 포함.

## 행성 네비게이션 (Navigation.js)

### 구조
좌측 사이드바, 행성 아이콘 + 이름 목록. 클릭 시 카메라 전환.

### 검색
상단 검색 입력, 필터링.

## Raycaster (행성 클릭)

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableObjects);
  if (intersects.length > 0) {
    selectPlanet(intersects[0].object.userData.planet);
  }
});
```

## 반응형

### 브레이크포인트
- Desktop: > 1024px — 사이드바 좌측, 패널 우측
- Tablet: 768~1024px — 사이드바 숨김(토글), 패널 하단
- Mobile: < 768px — 네비게이션 하단 탭, 패널 하단 시트

### 터치
- 핀치 줌: OrbitControls 기본 지원
- 스와이프: 회전 (OrbitControls)
- 탭: 행성 선택 (Raycaster)

## 로딩 화면 (LoadingScreen.js)
- 텍스처/모델 로딩 진행률 표시
- LoadingManager 연동
- 완료 시 fade out

## CSS 설계 원칙
- CSS 변수로 색상 테마 (--bg-dark, --text-primary, --accent)
- backdrop-filter: blur()로 글래스모피즘 패널
- transition으로 모든 상태 변화 애니메이션
- 우주 테마: 어두운 배경, 밝은 텍스트, 반투명 패널
