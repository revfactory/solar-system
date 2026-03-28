# 02. 기존 태양계 시뮬레이터 분석 보고서

> 작성일: 2026-03-28
> 목적: 기존 태양계 시뮬레이션 웹사이트/앱을 분석하여 기능, UX 패턴, 기술 스택, 디자인 벤치마크 도출

---

## 1. 시뮬레이터별 상세 분석

---

### 1.1 NASA Eyes on the Solar System

- **URL:** https://eyes.nasa.gov/apps/solar-system/
- **추가 URL:** https://eyes.nasa.gov/apps/orrery/ (간소화 오러리 버전)
- **기술 스택:** WebGL 기반 커스텀 렌더링 엔진 (확인됨), Google Tag Manager (확인됨). Three.js 또는 Babylon.js 사용 추정이나 비공개 커스텀 엔진일 가능성 높음. NASA JPL 자체 개발.
- **주요 기능:**
  - [x] 3D 행성 렌더링 — 고품질 텍스처, 실제 NASA 데이터 기반
  - [x] 궤도 시각화 — 실제 궤도 요소 기반 정밀 궤도선
  - [x] 시간 조절 (재생/가속/되감기) — 과거/미래 임의 시점 탐색
  - [x] 행성 정보 패널 — 물리 데이터, 탐사 역사, 미션 정보
  - [x] 카메라 자유 이동 — 행성 궤도 추적, 자유 시점
  - [x] 행성 간 이동/포커스 — 클릭으로 행성 간 자동 이동
  - [x] 위성 표시 — 주요 위성 포함
  - [x] 소행성대/카이퍼벨트 — 근지구 천체(NEO) 포함
  - [x] 실시간 위치 반영 — JPL 천체력 데이터 기반
  - [x] 우주 탐사선 궤적 — 실제 미션 경로 시각화
  - [ ] 모바일 반응형 — 데스크톱 중심 (모바일 제한적)
- **UX 패턴:**
  - 네비게이션: 좌측 사이드바에 천체 목록, 클릭시 카메라 자동 이동 + 줌
  - 정보 표시: 하단 또는 우측 슬라이드 인 패널, 탭 구분 (개요/물리/탐사)
  - 시간 제어: 하단 타임라인 바 + 재생/일시정지/속도 조절 버튼
  - 초기 뷰: 태양 중심 태양계 전체 조감도
  - 카메라: 마우스 드래그 회전, 스크롤 줌, 더블클릭 포커스
- **시각적 특징:**
  - 행성 렌더링: NASA 실제 촬영 텍스처, 고해상도
  - 배경: 실제 별 카탈로그 기반 별 배경
  - 조명: 태양 기반 단일 광원, 사실적 그림자
  - 대기 효과: 지구 대기 산란 표현, 토성 고리 반투명
- **강점:**
  - 최고 수준의 과학적 정확도 (JPL 천체력 직접 활용)
  - 실제 NASA 미션 데이터 통합 (우주 탐사선 궤적)
  - 시간 여행 기능의 완성도
  - 천체 정보의 깊이와 신뢰성
- **약점:**
  - 초기 로딩 시간 길음
  - 모바일 지원 미흡
  - UI가 복잡하여 초보자에게 진입 장벽
  - 시각적 화려함보다 정확도 우선

---

### 1.2 Solar System Scope

- **URL:** https://www.solarsystemscope.com/
- **기술 스택:** Unity WebGL 엔진 (확인됨 — "UnityLoader" 참조), jQuery (확인됨), Google Tag Manager (확인됨), PhotoSwipe (확인됨). Chrome 57+, Firefox 52+, Safari 10.1+ 필요.
- **텍스처 리소스:** https://www.solarsystemscope.com/textures/ — CC-BY 4.0 라이선스 무료 행성 텍스처 제공
- **주요 기능:**
  - [x] 3D 행성 렌더링 — Unity 기반 고품질 렌더링
  - [x] 궤도 시각화 — 타원 궤도선 표시
  - [x] 시간 조절 — 실시간 위치 + 시간 이동
  - [x] 행성 정보 패널 — 흥미로운 사실, 물리 데이터
  - [x] 카메라 자유 이동 — 부드러운 우주 탐색
  - [x] 행성 간 이동/포커스 — 메뉴 또는 클릭으로 이동
  - [x] 위성 표시 — 주요 위성
  - [x] 별자리 표시 — 밤하늘 뷰 제공
  - [x] 메시에 천체 — 딥스카이 카탈로그
  - [x] 거리 측정 도구 — 천체 간 거리 측정
  - [ ] 소행성대/카이퍼벨트 — 제한적
  - [x] 실시간 위치 반영 — 정확한 실시간 위치
  - [x] 모바일 반응형 — iOS/Android 앱 별도 제공
- **UX 패턴:**
  - 네비게이션: 드롭다운 메뉴 + 호버 서브메뉴, 검색 기능
  - 정보 표시: 천체 선택 시 정보 패널 슬라이드, 칼 세이건/닐 타이슨 명언 로테이션
  - 시간 제어: 실시간 기본, 시간 슬라이더
  - 카메라: 풀스크린 지원, 기기 방향 감지 (모바일)
- **시각적 특징:**
  - 행성 렌더링: 매우 높은 품질, NASA 데이터 기반 텍스처
  - 배경: 은하수 배경 (2018년 추가)
  - 조명: 사실적 태양광, 행성 그림자
  - 대기 효과: 대기 셰이더, 고리 효과
  - 전반적 아트 디렉션: 교육+미적 균형 우수
- **강점:**
  - 시각적 완성도가 가장 높음 — 아름다운 렌더링
  - 무료 텍스처 리소스 제공 (CC-BY 4.0) — 재사용 가능
  - 교육적 콘텐츠와 미적 요소의 균형
  - 별자리, 메시에 천체 등 확장 콘텐츠
  - 크로스 플랫폼 (웹 + 모바일 앱)
- **약점:**
  - Unity WebGL이라 초기 로딩 무거움 (WASM 번들 큼)
  - 궤도 역학 정확도가 NASA Eyes보다 낮음
  - 커스터마이징 제한적 (Unity 엔진 제약)
  - 오픈소스가 아니라 코드 참조 불가

---

### 1.3 jsOrrery

- **URL:** https://mgvez.github.io/jsorrery/ (라이브), https://orrery.com (프로덕션)
- **GitHub:** https://github.com/mgvez/jsorrery (⭐ 424, 🍴 111)
- **기술 스택:** Three.js + WebGL (확인됨), Webpack + Babel (확인됨), GLSL 커스텀 셰이더, Node.js 개발 서버. JavaScript 93.4%.
- **주요 기능:**
  - [x] 3D 행성 렌더링
  - [x] 궤도 시각화 — 정밀 궤도 요소 기반
  - [x] 시간 조절 — 날짜 선택 기반 위치 계산
  - [x] 행성 정보 패널
  - [x] 카메라 자유 이동
  - [x] 행성 간 이동/포커스
  - [x] 위성 표시 — 달
  - [ ] 소행성대/카이퍼벨트
  - [x] 실시간 위치 반영 — JPL 궤도 요소 기반
  - [x] 우주 미션 궤적 — 아폴로 미션
  - [ ] 모바일 반응형
- **궤도 계산 정확도:**
  - JPL 궤도 요소 사용 (확인됨)
  - ELP2000-85 이론: 달 위치 계산
  - VSOP87 이론: 지구 위치 계산
  - Delta T 보정: 지구 자전 불규칙성 보정
  - JPL HORIZONS 데이터로 검증
  - 이차 적분법(quadratic integration)으로 실시간 성능 최적화
- **강점:**
  - 오픈소스, 코드 참조 가능
  - 과학적 정확도 높음 (JPL 데이터 직접 활용)
  - 궤도 역학 구현이 가장 잘 문서화됨
  - 아폴로 미션 시뮬레이션 등 독특한 기능
- **약점:**
  - UI/UX가 기본적
  - 시각적 품질이 Solar System Scope보다 낮음
  - 모바일 미지원
  - 천체 수가 제한적

---

### 1.4 100,000 Stars (Chrome Experiment)

- **URL:** http://stars.chromeexperiments.com/
- **기술 스택:** Three.js + CSS3D + Web Audio (확인됨). 커스텀 셰이더 로더 시스템.
- **주요 기능:**
  - [x] 3D 별 렌더링 — 119,617개 별 (HYG 데이터베이스)
  - [x] 은하 시각화 — 나선 은하 파티클 + 이미지
  - [x] 별 정보 패널 — CSS3D 오버레이
  - [x] 카메라 자유 이동 — FOV 동적 조절
  - [x] 줌: 은하 → 태양계 → 개별 별 수준
  - [ ] 궤도 시각화
  - [ ] 시간 조절
  - [ ] 위성/행성 표시
  - [ ] 모바일 반응형
- **기술 상세 (web.dev 케이스 스터디 기반):**
  - **파티클 시스템:** 커스텀 셰이더 머터리얼, 별마다 크기/컬러 인덱스 어트리뷰트
  - **렌즈플레어:** THREE.LensFlare + 아나모르픽 헥사곤, 가산 블렌딩
  - **태양 렌더링:** 다중 레이어 (적외선 텍스처 + 컬러 램프 룩업 + 코로나 빌보드 + 토러스 기반 태양 플레어 셰이더)
  - **셰이더 관리:** 별도 .vsh/.fsh 파일 동적 로딩 (starsurface, starhalo, starflare, galacticstars)
  - **좌표계:** 1 GL 유닛 = 1 광년 (정밀도 이슈 발생)
  - **카메라:** 씬 회전 방식 (카메라 고정), FOV 동적 조절 (멀리→넓게, 가까이→좁게)
  - **Z-fighting 해결:** Material.polygonOffset, 씬 회전 제로화
  - **CSS3D 통합:** THREE 카메라 매트릭스와 CSS3D 매트릭스 동기화, THREE.Gyroscope()로 빌보딩
  - **컬러 매핑:** 컬러 인덱스 → 컬러 램프 이미지 → Canvas getImageData() → 셰이더
- **강점:**
  - 압도적 시각적 임팩트 (은하 줌인/줌아웃)
  - Three.js + CSS3D 하이브리드 렌더링 기법 레퍼런스
  - 파티클 시스템/셰이더 구현 우수
  - 웹 오디오 통합으로 몰입감
  - 성능 최적화 기법 잘 문서화됨 (web.dev 케이스 스터디)
- **약점:**
  - 태양계 시뮬레이션이 아닌 별 시각화 중심
  - 궤도 역학/시간 제어 없음
  - 정밀도 이슈 (1 유닛=1광년 스케일)
  - 오래된 프로젝트 (유지보수 중단)

---

### 1.5 TheSkyLive 3D Solar System Viewer

- **URL:** https://theskylive.com/3dsolarsystem
- **기술 스택:** 웹 표준 기술 (추정 — 접근 제한으로 직접 분석 불가)
- **주요 기능:**
  - [x] 3D 궤도 시각화 — 행성, 소행성, 혜성 궤도
  - [x] 실시간 위치 반영 — 정밀 천체력 데이터
  - [x] 행성 정보 — 529개 천체 추적 (행성, 혜성, 소행성, 왜소행성, NEO, 우주 탐사선)
  - [x] 별자리/별/딥스카이 정보
  - [x] 천체력 계산기 — 출몰 시간, 등급, 위치
  - [x] 파인더 차트 생성 — 소천체 관측용
  - [x] 목성/토성 위성 시각화
  - [ ] 고품질 3D 렌더링 (데이터 중심)
  - [ ] 카메라 자유 이동 (제한적)
  - [x] 모바일 반응형 — Android 앱 제공
- **UX 패턴:**
  - 네비게이션: 천체 카테고리별 탐색, 검색
  - 정보 표시: 데이터 테이블 중심, 과학적
  - 강점: 데이터 깊이, 천체 수
- **강점:**
  - 추적 천체 수 최다 (529개+)
  - 천체력 데이터 정확도 높음
  - NEO(근지구 천체) 접근 추적
  - 실용적 관측 도구 (파인더 차트)
- **약점:**
  - 3D 시각화 품질이 낮음 (데이터 중심 서비스)
  - 몰입감 부족
  - 교육/엔터테인먼트보다 관측자 도구에 가까움

---

### 1.6 Celestia (데스크톱 + 웹 실험)

- **URL:** https://celestia.mobi/web (웹 버전), https://celestia.space (메인)
- **GitHub:** https://github.com/CelestiaProject/Celestia (⭐ 2,200, 🍴 341, 54 기여자)
- **기술 스택:** C++ 88.7% (확인됨), OpenGL/OpenGL ES (확인됨), CMake 빌드. 웹 버전은 WebAssembly (Emscripten) + WebGL.
- **주요 기능:**
  - [x] 3D 행성 렌더링 — 전통적 OpenGL 파이프라인
  - [x] 궤도 시각화
  - [x] 시간 조절
  - [x] 행성 정보 — 별 브라우저, 태양계 브라우저
  - [x] 카메라 자유 이동 — 지수 줌 (은하 클러스터 ~ 우주선 수 미터)
  - [x] 행성 간 이동/포커스
  - [x] 100,000+ 별 카탈로그
  - [x] 사용자 정의 카탈로그 (SSC, STC, DSC)
  - [x] 가이드 투어
  - [ ] 웹 버전 미완성 ("not working yet" 주석 발견)
  - [ ] 모바일 웹 제한적
- **강점:**
  - 오래된 역사(20년+)와 방대한 천체 데이터
  - 극한 줌 범위 (은하 ~ 미터 스케일)
  - 사용자 확장 가능한 카탈로그 시스템
  - 강력한 오픈소스 커뮤니티
- **약점:**
  - 웹 버전 미완성/불안정
  - UI가 매우 올드스쿨
  - WebAssembly 포팅으로 성능 제약
  - Three.js 생태계와 무관 (C++ 네이티브)

---

### 1.7 GitHub 오픈소스 프로젝트 분석

#### 1.7.1 Tycho (⭐ 109)
- **GitHub:** https://github.com/jshor/tycho
- **기술 스택:** React + Redux + Three.js (확인됨), react-three-renderer, Create React App, Jest/Enzyme, node-sass-chokidar, BEM CSS.
- **아키텍처:**
  - React/Redux 컨테이너 패턴: 컨테이너(상태/로직) ↔ 컴포넌트(프레젠테이션)
  - 공유 상태 = Redux 스토어 (천체 2D/3D 위치, 현재 시간)
  - 물리 계산/비즈니스 로직 → 서비스 레이어
  - 카메라 전용 서비스 분리
  - 단방향 데이터 플로우
- **의의:** React + Three.js 통합 패턴의 좋은 레퍼런스. 현대적 프론트엔드 아키텍처 적용.

#### 1.7.2 solar-system-threejs (⭐ 401)
- **GitHub:** https://github.com/sanderblue/solar-system-threejs
- **기술 스택:** Three.js + WebGL (확인됨), Gulp, npm/Bower, ES6. JavaScript 61%, HTML 29.2%, CSS 9.8%.
- **특징:** 태양, 8개 행성, 위성, 소행성대, 별 모두 실제 천문 데이터 기반 스케일 모델링.

#### 1.7.3 jsulpis/realtime-planet-shader (⭐ 389)
- **GitHub:** https://github.com/jsulpis/realtime-planet-shader
- **기술 스택:** GLSL 44.8%, Astro 34%, TypeScript 21.2%, pnpm, WebGL.
- **셰이더 기법:**
  - 레이캐스팅 구체 + fbm 노이즈 (법선/색상)
  - 아나리틱 레이캐스팅 (레이마칭에서 전환 — 성능 최적화)
  - 거리 함수 기반 대기 시뮬레이션
  - 절차적(Procedural) 지형/색상 생성
  - 실제 텍스처 모드 (지구, 화성, 목성 등)
  - GUI로 셰이더 유니폼 인터랙티브 제어
- **의의:** 행성 셰이더 구현의 최고 레퍼런스. 저사양에서도 60fps.

#### 1.7.4 SolarSys (⭐ 88)
- **GitHub:** https://github.com/solarcg/SolarSys
- **라이브 데모:** https://solarcg.github.io/SolarSys/
- **기술 스택:** JavaScript 96.6%, Three.js + WebGL + 커스텀 GLSL 셰이더
- **핵심 기능:**
  - 포토리얼리스틱 행성 렌더링
  - **대기 산란 모델 (Rayleigh Scattering)** — 단순하지만 아름다운 구현
  - 1인칭 로밍 + 충돌 감지
  - 카메라 간 부드러운 전환
- **의의:** 대기 산란 셰이더 구현의 실용적 레퍼런스. 1인칭 탐색 모드가 독특.

#### 1.7.5 Accrete.js (⭐ 38)
- **GitHub:** https://github.com/tmanderson/Accrete.js
- **특징:** 행성계 형성 시뮬레이션 (Starform 알고리즘). 브라우저/서버 양쪽 실행 가능. 2026-01 활동.
- **의의:** 절차적 행성계 생성 알고리즘 레퍼런스 (향후 확장 시 참고)

---

## 2. 기능 우선순위 매트릭스

| 기능 | 분류 | 구현 복잡도 | 레퍼런스 | 근거 |
|------|------|------------|---------|------|
| **3D 행성 렌더링 + 텍스처** | 필수 | 중 | 전체 | 모든 시뮬레이터의 핵심 기능 |
| **궤도 라인 시각화** | 필수 | 중 | Solar System Scope, jsOrrery | 태양계 이해의 기본 요소 |
| **태양 렌더링 (발광 효과)** | 필수 | 중 | 100k Stars, Solar System Scope | 시각적 앵커 포인트 |
| **시간 제어 UI (재생/속도/날짜)** | 필수 | 중 | NASA Eyes, jsOrrery | 교육/탐색의 핵심 인터랙션 |
| **행성 클릭 → 정보 패널** | 필수 | 중 | Solar System Scope, NASA Eyes | 모든 교육용 시뮬레이터 공통 |
| **카메라 자유 이동 (줌/회전/팬)** | 필수 | 저 | 전체 (OrbitControls) | 3D 탐색의 기본 |
| **행성 간 포커스 이동 (자동 카메라)** | 필수 | 중 | NASA Eyes, Solar System Scope | UX 핵심. 자동 줌+트랜지션 |
| **실시간 천체 위치 반영** | 필수 | 고 | NASA Eyes, jsOrrery, TheSkyLive | 과학적 신뢰성 확보 |
| **반응형/모바일 지원** | 필수 | 중 | Solar System Scope | 현대 웹 필수 |
| **대기 셰이더 (지구 등)** | 권장 | 고 | Solar System Scope, realtime-planet-shader, SolarSys | 시각적 품질 크게 향상 |
| **토성 고리 렌더링** | 권장 | 중 | Solar System Scope | 상징적 시각 요소 |
| **위성(달) 표시** | 권장 | 중 | NASA Eyes, jsOrrery | 교육적 가치 높음 |
| **별 배경 (파티클/스카이박스)** | 권장 | 저 | 100k Stars, Solar System Scope | 몰입감 향상 |
| **행성 자전 애니메이션** | 권장 | 저 | Solar System Scope | 생동감 부여 |
| **소행성대 시각화** | 권장 | 중 | solar-system-threejs, NASA Eyes | 태양계 구조 이해 |
| **블룸/글로우 포스트프로세싱** | 권장 | 중 | 100k Stars, N3rson/Solar-System-3D | 시각적 임팩트 |
| **태양 그림자/조명** | 권장 | 중 | NASA Eyes | 사실감 향상 |
| **카이퍼벨트 시각화** | 선택 | 중 | NASA Eyes | 확장 콘텐츠 |
| **우주 탐사선 궤적** | 선택 | 고 | NASA Eyes, jsOrrery | 교육적이나 데이터 확보 난이도 높음 |
| **별자리 오버레이** | 선택 | 중 | Solar System Scope, Celestia | 밤하늘 뷰에서 유용 |
| **메시에 천체/딥스카이** | 선택 | 중 | Solar System Scope, Celestia | 확장 콘텐츠 |
| **왜소행성/혜성** | 선택 | 중 | TheSkyLive | 천체 수 확장 |
| **사운드/음악** | 선택 | 저 | 100k Stars | 몰입감이나 필수 아님 |
| **VR/AR 지원** | 선택 | 고 | — | 미래 확장 |
| **다국어 지원** | 선택 | 저 | Solar System Scope, Celestia | 글로벌 접근성 |

---

## 3. UX 패턴 종합

### 3.1 공통 패턴 (대부분의 시뮬레이터에서 발견)

| 패턴 | 설명 | 대표 구현 |
|------|------|---------|
| **천체 목록 사이드바** | 좌측 또는 상단에 행성/천체 목록. 클릭 시 자동 카메라 이동. | NASA Eyes, Solar System Scope |
| **정보 슬라이드인 패널** | 천체 선택 시 우측/하단에서 슬라이드 인. 탭으로 구분 (개요/물리/탐사). | NASA Eyes, Solar System Scope |
| **하단 타임라인 바** | 화면 하단에 시간 제어 UI. 재생/일시정지 + 속도 조절 + 날짜 표시. | NASA Eyes |
| **OrbitControls 카메라** | 마우스 드래그=회전, 스크롤=줌, 우클릭=팬. Three.js 표준. | 거의 전체 |
| **초기 뷰 = 태양계 조감도** | 첫 로딩 시 태양 중심 전체 행성 보이는 조감도. | 전체 |
| **더블클릭/클릭 = 포커스** | 천체 클릭 시 자동으로 카메라 이동+줌 인. 부드러운 트랜지션. | NASA Eyes, Solar System Scope |
| **검색 기능** | 천체 이름으로 검색, 자동완성. | Solar System Scope, TheSkyLive |

### 3.2 최적 사례 (Best Practice)

1. **NASA Eyes의 시간 제어**: 하단 타임라인 + 재생 버튼 + 속도 슬라이더 + 날짜 피커. 직관적이면서 강력.
2. **Solar System Scope의 비주얼 품질**: Unity 기반이지만 웹에서 최고 수준의 행성 렌더링. 대기, 고리, 조명 모두 우수.
3. **100k Stars의 줌 경험**: 은하에서 개별 별까지 매끄러운 줌. FOV 동적 조절 기법이 핵심.
4. **Tycho의 아키텍처**: React/Redux + Three.js 통합 패턴. 상태 관리, 서비스 레이어 분리 등 현대적 설계.
5. **jsOrrery의 과학적 정확도**: JPL 궤도 요소, ELP2000-85, VSOP87 이론 직접 구현. 검증 가능한 정확도.

### 3.3 카메라 제어 패턴 비교

| 시뮬레이터 | 방식 | 특징 |
|-----------|------|------|
| NASA Eyes | 자유 카메라 + 포커스 모드 | 천체 추적 모드, 자유 비행 모드 전환 |
| Solar System Scope | OrbitControls 유사 | 부드러운 감속, 풀스크린 지원 |
| 100k Stars | 씬 회전 (카메라 고정) | FOV 동적 조절로 줌 보강 |
| jsOrrery | OrbitControls | 기본적 구현 |
| Celestia | 지수 줌 | 은하 클러스터 ~ 미터 스케일 |

---

## 4. 기술 스택 비교

| 시뮬레이터 | 렌더링 엔진 | 프레임워크 | 궤도 계산 | 셰이더 |
|-----------|-----------|----------|----------|--------|
| NASA Eyes | 커스텀 WebGL | 자체 (JPL) | JPL 천체력 | 커스텀 |
| Solar System Scope | Unity WebGL | Unity + jQuery | 내장 | Unity 셰이더 |
| jsOrrery | Three.js | Webpack/Babel | JPL 궤도요소 + VSOP87 + ELP2000 | 커스텀 GLSL |
| 100k Stars | Three.js + CSS3D | Vanilla | HYG 카탈로그 (위치만) | 커스텀 GLSL (.vsh/.fsh) |
| TheSkyLive | 미확인 | 웹 표준 | 정밀 천체력 | — |
| Celestia | OpenGL (C++) | CMake | 내장 | OpenGL 셰이더 |
| Tycho | Three.js | React/Redux | 서비스 레이어 | Three.js 표준 |
| solar-system-threejs | Three.js | Gulp | 천문 데이터 기반 스케일 | Three.js 표준 |
| realtime-planet-shader | WebGL (순수) | Astro/TS | — (셰이더 전용) | 커스텀 GLSL (fbm, raycasting) |

### 기술 스택 추천 (우리 프로젝트)

**렌더링:** Three.js (R3F/React Three Fiber 또는 순수 Three.js)
- 근거: 오픈소스 시뮬레이터 대부분이 Three.js 사용, 생태계/커뮤니티 최대
- Unity WebGL은 번들 크기 과대, 커스터마이징 제한

**프레임워크:** React + React Three Fiber (R3F)
- 근거: Tycho가 React/Redux + Three.js 패턴 입증. R3F는 더 현대적 접근.

**궤도 계산:** Kepler 방정식 + JPL 궤도 요소
- 근거: jsOrrery의 접근법이 정확도와 성능 균형 최적

**셰이더:** 커스텀 GLSL
- 근거: realtime-planet-shader의 대기/행성 셰이더 기법 참조

---

## 5. 디자인 인사이트 — 우리 프로젝트에 적용할 제안

### 5.1 시각적 품질
- **Solar System Scope 수준의 행성 텍스처**: solarsystemscope.com/textures/ 의 CC-BY 4.0 텍스처 활용 가능
- **realtime-planet-shader의 대기 셰이더**: fbm 노이즈 + 거리 함수 기반 대기 표현, 60fps 유지
- **100k Stars의 태양 렌더링 기법**: 다중 레이어 (텍스처 + 코로나 빌보드 + 플레어 셰이더)
- **블룸 포스트프로세싱**: EffectComposer + BloomPass로 발광체(태양) 글로우 효과

### 5.2 UX 설계
- **초기 뷰**: 태양계 전체 조감도 → 천천히 자동 회전하며 로딩
- **행성 선택**: 클릭/탭 → 부드러운 카메라 트랜지션(GSAP 또는 Tween) → 정보 패널 슬라이드 인
- **정보 패널 구조**: 좌측 또는 우측 슬라이드인 패널, 탭 구분 (개요 | 물리 데이터 | 탐사 역사 | 갤러리)
- **시간 제어**: NASA Eyes 스타일 하단 바 (재생/일시정지/배속 + 날짜 피커 + 슬라이더)
- **검색**: 상단 검색바, 자동완성으로 천체 빠른 접근
- **반응형**: 모바일에서는 터치 제스처(핀치 줌, 스와이프 회전), 패널은 하단 시트로 전환

### 5.3 기술 아키텍처
- **상태 관리**: Tycho 패턴 참조 — 천체 위치/시간을 전역 상태로 관리, 단방향 데이터 플로우
- **서비스 레이어 분리**: 궤도 계산, 카메라 제어를 독립 서비스로 분리 (Tycho 패턴)
- **셰이더 관리**: 100k Stars 패턴 — 별도 .glsl 파일로 관리, 빌드 시 번들링
- **성능**: LOD(Level of Detail) — 줌 레벨에 따라 행성 디테일 조절, 먼 행성은 점으로 표시

### 5.4 차별화 포인트
1. **한국어 우선**: 기존 시뮬레이터는 모두 영어 중심. 한국어 UI + 한국어 천체 정보 제공
2. **현대적 기술 스택**: React Three Fiber + TypeScript + 최신 Three.js (기존 프로젝트 대부분 오래됨)
3. **NASA Eyes의 정확도 + Solar System Scope의 아름다움**: 두 장점을 결합
4. **모바일 퍼스트**: 기존 시뮬레이터 대부분 데스크톱 중심. 모바일 터치 UX 최적화
5. **접근성**: 키보드 네비게이션, 스크린 리더 지원 등 (기존 시뮬레이터 대부분 미흡)

---

## 부록: 텍스처 리소스

| 소스 | URL | 라이선스 | 품질 | 비고 |
|------|-----|---------|------|------|
| Solar System Scope Textures | solarsystemscope.com/textures/ | CC-BY 4.0 | 2K | 가장 널리 사용됨 |
| Planet Pixel Emporium | planetpixelemporium.com | 무료/상업용 | 다양 | 범프맵 포함 |
| NASA Blue Marble | visibleearth.nasa.gov | Public Domain | 최대 21K | 지구 전용, 최고 품질 |
| Tim Stupak 16K Pack | artstation.com/store | 유료 | 16K | 최고 해상도 |
| Sketchfab 8K Pack | sketchfab.com | 다양 | 8K | 3D 모델 포함 |

---

## 부록: 주요 GitHub 레포지토리

| 프로젝트 | ⭐ | 기술 | 특징 |
|---------|---|------|------|
| CelestiaProject/Celestia | 2,200 | C++/OpenGL | 데스크톱 원조 |
| mgvez/jsorrery | 424 | Three.js | 궤도 역학 최고 |
| sanderblue/solar-system-threejs | 401 | Three.js | 실척 모델링 |
| jsulpis/realtime-planet-shader | 389 | GLSL/WebGL | 행성 셰이더 최고 |
| jshor/tycho | 109 | React/Redux/Three.js | 현대 아키텍처 |
| N3rson/Solar-System-3D | — | Three.js/Vite | BloomPass 예시 |
| solarcg/SolarSys | 88 | Three.js/GLSL | 대기 산란, 1인칭 로밍 |
| SoumyaEXE/3d-Solar-System-ThreeJS | 82 | Three.js/Vite | NASA API 통합 |
| tmanderson/Accrete.js | 38 | JavaScript | 행성계 형성 시뮬레이션 |
