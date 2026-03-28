# 태양계 3D 시뮬레이션

Three.js 기반의 인터랙티브 태양계 시뮬레이션 웹 애플리케이션입니다.

![Three.js](https://img.shields.io/badge/Three.js-r175-black?logo=threedotjs)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue)

## 주요 기능

- **실시간 3D 렌더링** — 태양, 8개 행성, 위성, 소행성대를 포함한 태양계 시각화
- **케플러 궤도 역학** — 실제 천문 데이터 기반의 궤도 계산
- **GLSL 셰이더** — 대기 산란, 태양 코로나, 행성 고리, 야간면 조명 효과
- **시간 제어** — 재생/일시정지, 속도 조절을 통한 시간 흐름 시뮬레이션
- **행성 탐색** — 클릭으로 행성 선택, 상세 정보 패널 확인
- **포스트프로세싱** — 블룸 효과로 사실적인 발광 표현
- **반응형 UI** — 데스크톱, 태블릿, 모바일 대응

## 기술 스택

| 구분 | 기술 |
|------|------|
| 3D 엔진 | Three.js |
| 빌드 도구 | Vite |
| 셰이더 | GLSL (vite-plugin-glsl) |
| 천문 계산 | astronomy-engine |
| 애니메이션 | @tweenjs/tween.js |
| 후처리 | postprocessing |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── main.js                 # 앱 진입점
├── core/                   # Scene, Camera, Renderer, SimulationClock
├── orbital/                # 케플러 궤도 역학 엔진
├── celestial/              # 천체 렌더링 (Sun, Planet, Moon, Ring, Atmosphere ...)
├── shaders/                # GLSL 셰이더 (대기, 코로나, 고리, 야간면)
├── effects/                # 포스트프로세싱 (블룸)
├── controls/               # 카메라·시간 컨트롤러
├── ui/                     # InfoPanel, Navigation, Timeline, LoadingScreen
└── styles/                 # CSS (글래스모피즘 UI)
```

## 조작법

| 입력 | 동작 |
|------|------|
| 마우스 드래그 | 카메라 회전 |
| 스크롤 | 줌 인/아웃 |
| 행성 클릭 | 행성 선택 및 정보 패널 열기 |
| 타임라인 | 시간 재생/일시정지, 속도 조절 |

## 라이선스

MIT
