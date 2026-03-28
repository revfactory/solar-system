# 태양계 시뮬레이션 웹사이트 — 자료 수집 계획

## 목표
태양계 8개 행성의 3D 시뮬레이션 웹사이트를 제작하기 위한 모든 기술/과학/시각 자료를 수집한다.

## 조사 영역

### 1. 궤도 역학 데이터 (orbital-researcher)
- 8행성 케플러 궤도 요소 (J2000.0, 변화율 포함)
- 태양/행성 중력 파라미터 (GM)
- 자전 파라미터 (주기, 축 기울기)
- 천문 상수 (G, AU, c)
- 주요 위성 궤도 데이터
- 구현 알고리즘 (케플러 방정식, 좌표 변환)

### 2. 3D/WebGL 기술 스택 (tech-researcher)
- Three.js / Babylon.js / R3F 비교
- 오픈소스 태양계 시뮬레이션 프로젝트 분석
- 셰이더 기법 (대기, 고리, 태양)
- 성능 최적화 (LOD, 텍스처 압축, Web Worker)
- 카메라 제어 / UI 패턴

### 3. 행성 시각 데이터 (visual-researcher)
- 텍스처 맵 소스 (URL + 라이선스)
- 색상 팔레트 (hex/RGB)
- 대기 산란 파라미터 (Rayleigh/Mie)
- 고리 시스템 데이터
- 크기/거리 스케일링 전략
- 태양 + 배경 렌더링 데이터

### 4. 기존 시뮬레이터 분석 (reference-researcher)
- NASA Eyes, Solar System Scope 등 분석
- 기능 우선순위 매트릭스
- UX/디자인 패턴
- GitHub 오픈소스 코드 분석

## 산출물
- _workspace/02_orbital_mechanics_data.md
- _workspace/02_webgl_tech_research.md
- _workspace/02_planet_visual_data.md
- _workspace/02_simulation_references.md
- 최종 통합: 태양계_시뮬레이션_자료집.md
