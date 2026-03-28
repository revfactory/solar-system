---
name: simulation-build-orchestrator
description: "태양계 3D 시뮬레이션 웹사이트를 에이전트 팀으로 빌드하는 오케스트레이터. 프로젝트 스캐폴딩, 천체 렌더링, 셰이더, UI를 4명의 엔지니어가 병렬 구현하고 통합한다. '시뮬레이션 만들어', '시뮬레이션 빌드', '웹사이트 구현', '코드 작성 시작' 요청 시 반드시 이 스킬을 사용할 것."
---

# Simulation Build Orchestrator

태양계 3D 시뮬레이션 웹사이트를 에이전트 팀으로 빌드하는 오케스트레이터.

## 실행 모드: 에이전트 팀

## 에이전트 구성

| 팀원 | 에이전트 타입 | 역할 | 스킬 | 주요 출력 |
|------|-------------|------|------|---------|
| foundation | foundation-engineer | 스캐폴드 + 코어 + QA | project-scaffold | core/, orbital/, data/ |
| celestial | celestial-engineer | 천체 렌더링 | celestial-rendering | celestial/ |
| shader | shader-engineer | 셰이더 + 이펙트 | shader-implementation | shaders/, effects/ |
| ui | ui-engineer | UI + 인터랙션 | simulation-ui | ui/, controls/, styles/ |

## 워크플로우

### Phase 1: 준비
1. 기존 자료 확인 (`_workspace/02_*.md`, `태양계_시뮬레이션_자료집.md`)
2. `src/` 디렉토리 구조 확인/생성

### Phase 2: 팀 구성

```
TeamCreate(
  team_name: "simulation-build-team",
  members: [
    {
      name: "foundation",
      agent_type: "foundation-engineer",
      model: "opus",
      prompt: "태양계 시뮬레이션 프로젝트의 기반을 구축하세요.

Read: .claude/agents/foundation-engineer.md (역할)
Read: .claude/skills/project-scaffold/skill.md (구현 가이드)
Read: _workspace/02_orbital_mechanics_data.md (궤도 데이터)
Read: _workspace/02_webgl_tech_research.md (기술 스택, 특히 섹션 3.6 SimulationClock, 4.4 프로젝트 구조, 4.5 의존성)

구현 순서:
1. package.json + vite.config.js + index.html
2. src/core/Renderer.js, Scene.js, Camera.js, SimulationClock.js
3. src/orbital/OrbitalEngine.js (astronomy-engine 래퍼)
4. public/data/planets.json, constants.json (_workspace/02_* 데이터 기반)
5. src/main.js (엔트리 포인트 - 렌더 루프)

완료 후:
- 모든 팀원에게 '코어 준비 완료' SendMessage + API 요약 전송
- TaskUpdate로 담당 작업 완료 처리
- 이후 다른 팀원들의 통합 이슈 지원 대기"
    },
    {
      name: "celestial",
      agent_type: "celestial-engineer",
      model: "opus",
      prompt: "태양계의 천체(태양, 행성, 위성)를 3D로 렌더링하세요.

Read: .claude/agents/celestial-engineer.md (역할)
Read: .claude/skills/celestial-rendering/skill.md (구현 가이드)
Read: _workspace/02_planet_visual_data.md (텍스처, 색상, 스케일링)
Read: _workspace/02_orbital_mechanics_data.md (반지름, 자전, 위성 데이터)

foundation의 코어가 준비된 후 시작하세요 (TaskList 확인 또는 foundation 메시지 대기).

구현:
1. src/celestial/CelestialBody.js (기본 클래스)
2. src/celestial/Sun.js (발광 + PointLight)
3. src/celestial/Planet.js (텍스처 + 자전 + 축기울기)
4. src/celestial/OrbitLine.js (궤도 타원)
5. src/celestial/Moon.js (주요 위성)
6. src/celestial/AsteroidBelt.js (InstancedMesh)
7. main.js에 천체 추가하는 초기화 코드

shader에게 Planet의 material 교체 포인트를 SendMessage로 알려주세요.
ui에게 행성 클릭용 raycasting 대상과 데이터 API를 알려주세요."
    },
    {
      name: "shader",
      agent_type: "shader-engineer",
      model: "opus",
      prompt: "태양계 시뮬레이션의 셰이더와 이펙트를 구현하세요.

Read: .claude/agents/shader-engineer.md (역할)
Read: .claude/skills/shader-implementation/skill.md (구현 가이드)
Read: _workspace/02_planet_visual_data.md (대기 파라미터 섹션 3, 고리 데이터 섹션 4)
Read: _workspace/02_webgl_tech_research.md (셰이더 기법 섹션 3.2~3.4)

foundation의 코어가 준비된 후 시작하세요.

구현:
1. src/shaders/atmosphere.vert + atmosphere.frag (Rayleigh/Mie)
2. src/celestial/Atmosphere.js (대기 메시 + 머티리얼 클래스)
3. src/shaders/ring.vert + ring.frag (투명도 + 그림자)
4. src/celestial/Ring.js (고리 메시 + 머티리얼)
5. src/shaders/corona.vert + corona.frag (프레넬 + 노이즈)
6. src/shaders/nightside.vert + nightside.frag (주야간 블렌딩)
7. src/effects/PostProcessing.js (선택적 블룸)

celestial에게 Atmosphere/Ring 적용 방법을 SendMessage로 알려주세요.
foundation에게 PostProcessing이 Renderer에 필요한 설정을 알려주세요."
    },
    {
      name: "ui",
      agent_type: "ui-engineer",
      model: "opus",
      prompt: "태양계 시뮬레이션의 UI와 인터랙션을 구현하세요.

Read: .claude/agents/ui-engineer.md (역할)
Read: .claude/skills/simulation-ui/skill.md (구현 가이드)
Read: _workspace/02_simulation_references.md (UX 패턴 섹션 3)
Read: _workspace/02_webgl_tech_research.md (카메라 섹션 3.5, 시간 섹션 3.6)

foundation의 코어가 준비된 후 시작하세요.

구현:
1. src/styles/main.css + ui.css (우주 테마, 글래스모피즘)
2. index.html UI 구조 (네비게이션, 패널, 타임라인 오버레이)
3. src/controls/CameraController.js (OrbitControls + Tween 전환)
4. src/controls/TimeController.js (SimulationClock 래퍼)
5. src/ui/Timeline.js (시간 제어 UI)
6. src/ui/InfoPanel.js (행성 정보 슬라이드인)
7. src/ui/Navigation.js (행성 목록 사이드바)
8. src/ui/LoadingScreen.js (로딩 화면)
9. Raycaster 행성 클릭 인터랙션
10. 반응형 레이아웃 (모바일 터치)"
    }
  ]
)
```

### Phase 2 작업 등록

```
TaskCreate(tasks: [
  // Foundation 작업 (즉시 시작 가능)
  { title: "프로젝트 스캐폴딩", description: "package.json, vite.config.js, index.html, 디렉토리 구조 생성", assignee: "foundation" },
  { title: "코어 모듈 구현", description: "Renderer.js, Scene.js, Camera.js, SimulationClock.js 구현", assignee: "foundation" },
  { title: "궤도 엔진 + 데이터", description: "OrbitalEngine.js, planets.json, constants.json 생성", assignee: "foundation" },
  { title: "main.js 엔트리 포인트", description: "렌더 루프, 모듈 통합 초기화 코드", assignee: "foundation" },

  // Celestial 작업 (코어 의존)
  { title: "천체 클래스 구현", description: "CelestialBody, Sun, Planet 클래스 구현", assignee: "celestial", depends_on: ["코어 모듈 구현"] },
  { title: "궤도/위성/소행성대", description: "OrbitLine, Moon, AsteroidBelt, Label 구현", assignee: "celestial", depends_on: ["천체 클래스 구현"] },

  // Shader 작업 (코어 의존)
  { title: "대기 + 고리 셰이더", description: "atmosphere.glsl, Atmosphere.js, ring.glsl, Ring.js", assignee: "shader", depends_on: ["코어 모듈 구현"] },
  { title: "코로나 + 야간면 + 블룸", description: "corona.glsl, nightside.glsl, PostProcessing.js", assignee: "shader", depends_on: ["대기 + 고리 셰이더"] },

  // UI 작업 (코어 의존)
  { title: "CSS + 레이아웃", description: "main.css, ui.css, index.html UI 구조", assignee: "ui", depends_on: ["프로젝트 스캐폴딩"] },
  { title: "카메라 + 시간 제어", description: "CameraController.js, TimeController.js, Timeline.js", assignee: "ui", depends_on: ["코어 모듈 구현"] },
  { title: "정보 패널 + 네비게이션", description: "InfoPanel.js, Navigation.js, Raycaster, LoadingScreen.js", assignee: "ui", depends_on: ["카메라 + 시간 제어"] },

  // 통합 (모든 모듈 의존)
  { title: "통합 + QA", description: "모든 모듈 main.js에 통합, 경계면 검증, npm run dev 테스트", assignee: "foundation", depends_on: ["궤도/위성/소행성대", "코로나 + 야간면 + 블룸", "정보 패널 + 네비게이션"] }
])
```

### Phase 2 실행

**팀원 자체 조율:**
- foundation이 코어를 완성하면 나머지 3명에게 "코어 준비 완료" SendMessage
- celestial ↔ shader: material 교체 포인트와 Atmosphere/Ring 적용 인터페이스 조율
- celestial → ui: 행성 raycasting 대상과 데이터 API 공유
- foundation ← all: 통합 이슈 보고
- foundation은 코어 완성 후 다른 팀원들의 통합을 지원하다가 마지막에 전체 QA

**모니터링:**
- TaskGet으로 진행 상황 확인
- 팀원 유휴 시 다음 작업 안내 또는 통합 이슈 해결 요청

### Phase 3: 통합 + QA

foundation-engineer가 최종 통합:
1. 모든 모듈이 main.js에서 정상 import/초기화되는지 확인
2. `npm run dev` 실행하여 브라우저에서 동작 확인
3. 경계면 검증:
   - OrbitalEngine → Planet.updatePosition 연결
   - Atmosphere/Ring → Planet 부착
   - Raycaster → InfoPanel 연결
   - SimulationClock → TimeController/Timeline 연결
4. 콘솔 에러/경고 확인

### Phase 4: 정리
1. 팀원들에게 종료 요청 (SendMessage)
2. 팀 정리 (TeamDelete)
3. `npm run dev`로 최종 동작 확인
4. 사용자에게 결과 보고

## 데이터 흐름

```
[foundation] → 코어 모듈 + 데이터 JSON
    ↓ "코어 준비 완료" SendMessage
    ├── [celestial] → 천체 클래스 + 텍스처
    │       ↕ SendMessage (material/API)
    ├── [shader] → GLSL + PostProcessing
    │       ↕ SendMessage (Atmosphere/Ring)
    └── [ui] → CSS + 컨트롤 + 패널
    ↓ 모든 모듈 완성
[foundation] → 통합 + QA → npm run dev
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| npm install 실패 | foundation이 의존성 버전 조정 |
| 팀원 1명 실패 | 해당 모듈 없이 나머지 통합, 사용자에게 보고 |
| 모듈 간 인터페이스 충돌 | foundation이 중재, 인터페이스 조정 |
| 셰이더 컴파일 에러 | shader가 fallback material 적용 |
| 텍스처 로딩 실패 | celestial이 단색 fallback 적용 |

## 테스트 시나리오

### 정상 흐름
1. foundation이 프로젝트 스캐폴딩 + 코어 구현 (10~15분)
2. 코어 완성 후 3명 병렬 시작
3. celestial: 8행성 + 태양 + 궤도 라인 + 위성 구현
4. shader: 대기 + 고리 + 코로나 + 블룸 구현
5. ui: 타임라인 + 정보 패널 + 네비게이션 + 반응형 구현
6. foundation: 전체 통합 + QA
7. `npm run dev` → 브라우저에서 태양계 시뮬레이션 동작

### 에러 흐름
1. shader-engineer의 대기 셰이더 컴파일 실패
2. shader가 에러 진단 → uniform 타입 불일치 발견 → 수정
3. 수정 실패 시 MeshBasicMaterial(대기 색상) fallback 적용
4. 나머지 모듈 정상 통합
5. 최종 보고서에 "대기 셰이더 fallback 적용 — 추후 수정 필요" 명시
