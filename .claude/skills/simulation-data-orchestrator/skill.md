---
name: simulation-data-orchestrator
description: "태양계 시뮬레이션 웹사이트 제작에 필요한 모든 자료(궤도 데이터, 3D 기술 스택, 행성 시각 데이터, 기존 시뮬레이터 분석)를 에이전트 팀으로 병렬 수집하고 통합하는 오케스트레이터. '태양계 시뮬레이션 자료 수집', '시뮬레이션 데이터 조사', '태양계 웹사이트 리서치' 요청 시 반드시 이 스킬을 사용할 것."
---

# Simulation Data Orchestrator

태양계 시뮬레이션 웹사이트 제작에 필요한 모든 자료를 에이전트 팀으로 병렬 수집하고 통합하는 오케스트레이터.

## 실행 모드: 에이전트 팀

## 에이전트 구성

| 팀원 | 에이전트 타입 | 역할 | 스킬 | 출력 |
|------|-------------|------|------|------|
| orbital-researcher | general-purpose | 궤도 역학 데이터 수집 | orbital-data-collection | 02_orbital_mechanics_data.md |
| tech-researcher | general-purpose | 3D/WebGL 기술 스택 조사 | simulation-tech-research | 02_webgl_tech_research.md |
| visual-researcher | general-purpose | 행성 시각 데이터 수집 | planet-visual-data | 02_planet_visual_data.md |
| reference-researcher | general-purpose | 기존 시뮬레이터 분석 | sim-reference-analysis | 02_simulation_references.md |
| (리더 = 오케스트레이터) | — | 팀 조율 + 최종 통합 | — | 최종 통합 보고서 |

## 워크플로우

### Phase 1: 준비

1. 사용자 입력 분석 — 시뮬레이션의 범위, 기술 선호, 특별 요구사항 파악
2. `_workspace/` 디렉토리 생성
3. 조사 계획을 `_workspace/00_input/research_plan.md`에 저장

### Phase 2: 팀 구성 및 병렬 조사

1. 팀 생성:
   ```
   TeamCreate(
     team_name: "simulation-data-team",
     members: [
       {
         name: "orbital-researcher",
         agent_type: "orbital-mechanics-researcher",
         model: "opus",
         prompt: "당신은 태양계 시뮬레이션에 필요한 궤도 역학 데이터를 수집하는 전문가입니다.

.claude/agents/orbital-mechanics-researcher.md를 Read하여 역할과 통신 프로토콜을 확인하세요.
.claude/skills/orbital-data-collection/skill.md를 Read하여 데이터 수집 워크플로우를 따르세요.

WebSearch와 WebFetch를 적극 활용하여 다음 데이터를 수집하세요:
1. 8개 행성의 케플러 궤도 요소 (J2000.0 에포크, 변화율 포함)
2. 태양 및 행성의 중력 파라미터 (GM)
3. 자전 파라미터 (주기, 축 기울기, 북극 방향)
4. 천문 상수 (G, AU, 광속 등)
5. 주요 위성의 궤도 데이터
6. 케플러 방정식 풀이 알고리즘 및 좌표 변환 공식

모든 데이터는 JSON 호환 형식으로 정리하세요. 결과를 _workspace/02_orbital_mechanics_data.md에 저장하세요.

다른 팀원에게 유용한 정보를 발견하면 SendMessage로 공유하세요:
- visual-researcher에게: 행성 반지름 데이터
- tech-researcher에게: 궤도 계산 알고리즘/라이브러리 정보"
       },
       {
         name: "tech-researcher",
         agent_type: "webgl-tech-researcher",
         model: "opus",
         prompt: "당신은 태양계 3D 시뮬레이션 웹사이트의 기술 스택을 조사하는 전문가입니다.

.claude/agents/webgl-tech-researcher.md를 Read하여 역할과 통신 프로토콜을 확인하세요.
.claude/skills/simulation-tech-research/skill.md를 Read하여 조사 워크플로우를 따르세요.

WebSearch와 WebFetch를 적극 활용하여 다음을 조사하세요:
1. Three.js vs Babylon.js vs React Three Fiber 비교 분석
2. GitHub 오픈소스 태양계 시뮬레이션 프로젝트 (상위 5~10개) 분석
3. 궤도 역학 JS 라이브러리 (astronomy-engine, orb.js 등)
4. 대기 셰이더, 고리 렌더링, 태양 코로나 구현 기법
5. 카메라 제어 및 행성 간 전환 패턴
6. 성능 최적화 기법 (LOD, 텍스처 압축, Web Worker)
7. 최종 기술 스택 추천안

결과를 _workspace/02_webgl_tech_research.md에 저장하세요.

다른 팀원에게 유용한 정보를 발견하면 SendMessage로 공유하세요:
- visual-researcher에게: 텍스처 포맷/해상도 가이드라인
- reference-researcher에게: 발견한 오픈소스 프로젝트 정보
- orbital-researcher에게: 물리 엔진 선택 관련 정보"
       },
       {
         name: "visual-researcher",
         agent_type: "planet-visual-researcher",
         model: "opus",
         prompt: "당신은 태양계 시뮬레이션의 시각 데이터를 수집하는 전문가입니다.

.claude/agents/planet-visual-researcher.md를 Read하여 역할과 통신 프로토콜을 확인하세요.
.claude/skills/planet-visual-data/skill.md를 Read하여 수집 워크플로우를 따르세요.

WebSearch와 WebFetch를 적극 활용하여 다음을 수집하세요:
1. 8개 행성 + 태양의 텍스처 맵 소스 (diffuse, bump, normal, specular, cloud, night, ring)
   - URL, 해상도, 라이선스를 함께 기록
2. 행성별 색상 팔레트 (hex/RGB)
3. 대기 산란 파라미터 (Rayleigh/Mie 계수) — 대기 있는 행성
4. 고리 시스템 시각 데이터 (토성 등)
5. 크기/거리 스케일링 전략 (실제 비율 + 시뮬레이션용 조정)
6. 태양 렌더링 데이터 + 배경 스카이박스 소스

모든 데이터를 JSON 호환 형식으로 정리하세요. 결과를 _workspace/02_planet_visual_data.md에 저장하세요.

다른 팀원에게:
- tech-researcher에게: 필요한 시각 효과 목록 (대기, 고리, 구름 등)
- orbital-researcher에게: 행성 크기 데이터 교차 검증 요청
- reference-researcher에게: 발견한 텍스처 소스 공유"
       },
       {
         name: "reference-researcher",
         agent_type: "simulation-reference-researcher",
         model: "opus",
         prompt: "당신은 기존 태양계 시뮬레이션 웹사이트/앱을 분석하는 전문가입니다.

.claude/agents/simulation-reference-researcher.md를 Read하여 역할과 통신 프로토콜을 확인하세요.
.claude/skills/sim-reference-analysis/skill.md를 Read하여 분석 워크플로우를 따르세요.

WebSearch와 WebFetch를 적극 활용하여 다음을 분석하세요:
1. NASA Eyes on the Solar System — 기능/UX/정확도 분석
2. Solar System Scope — 비주얼/UX 분석
3. GitHub 오픈소스 시뮬레이터 (Three.js 기반) — 코드 분석
4. 기타 주요 시뮬레이터 3~5개 분석
5. 기능 우선순위 매트릭스 (필수/권장/선택 분류)
6. UX 패턴 종합 (네비게이션, 정보 표시, 시간 제어, 카메라)
7. 디자인 인사이트 (우리 프로젝트에 적용할 제안)

결과를 _workspace/02_simulation_references.md에 저장하세요.

다른 팀원에게 유용한 정보를 발견하면 SendMessage로 공유하세요:
- tech-researcher에게: 각 시뮬레이터의 기술 스택 정보
- visual-researcher에게: 텍스처 소스, 시각 효과 사례
- orbital-researcher에게: 시뮬레이터별 정확도 수준"
       }
     ]
   )
   ```

2. 작업 등록:
   ```
   TaskCreate(tasks: [
     { title: "궤도 역학 데이터 수집", description: "8행성 케플러 요소, GM, 자전 파라미터, 천문 상수, 위성 궤도, 구현 공식을 JSON 형식으로 수집 → _workspace/02_orbital_mechanics_data.md", assignee: "orbital-researcher" },
     { title: "3D 기술 스택 조사", description: "Three.js/Babylon.js 비교, 오픈소스 프로젝트 분석, 셰이더 기법, 성능 최적화, 기술 스택 추천안 → _workspace/02_webgl_tech_research.md", assignee: "tech-researcher" },
     { title: "행성 시각 데이터 수집", description: "텍스처 맵 소스, 색상 팔레트, 대기 파라미터, 고리 데이터, 스케일링 전략 → _workspace/02_planet_visual_data.md", assignee: "visual-researcher" },
     { title: "기존 시뮬레이터 분석", description: "NASA Eyes, Solar System Scope 등 분석, 기능 매트릭스, UX 패턴, 디자인 인사이트 → _workspace/02_simulation_references.md", assignee: "reference-researcher" }
   ])
   ```

3. **팀원 자체 조율:**
   - 팀원들은 독립적으로 조사하되, 유용한 발견을 SendMessage로 즉시 공유
   - 특히 tech-researcher ↔ visual-researcher 간 텍스처 포맷/셰이더 호환성 조율
   - reference-researcher가 발견한 오픈소스 정보를 tech-researcher에게 공유
   - orbital-researcher와 visual-researcher 간 행성 크기 데이터 교차 검증

4. 모든 작업 완료 대기 (TaskGet으로 상태 확인)

### Phase 3: 통합 보고서 생성

리더가 4개 산출물을 Read하여 통합한다.

1. `_workspace/`의 모든 산출물 Read:
   - `02_orbital_mechanics_data.md`
   - `02_webgl_tech_research.md`
   - `02_planet_visual_data.md`
   - `02_simulation_references.md`

2. 종합 보고서 구성:

```markdown
# 태양계 시뮬레이션 웹사이트 — 종합 자료집

## 1. 프로젝트 개요
- 목표와 범위
- 기술 요구사항 요약

## 2. 추천 기술 스택
- 프레임워크 선택 (근거 포함)
- 핵심 라이브러리 목록
- 개발 환경 구성

## 3. 궤도 역학 데이터
### 3.1 천문 상수
### 3.2 행성별 케플러 궤도 요소 (JSON)
### 3.3 자전 파라미터 (JSON)
### 3.4 주요 위성 궤도 데이터
### 3.5 구현 알고리즘 (케플러 방정식, 좌표 변환)

## 4. 행성 시각 데이터
### 4.1 텍스처 맵 소스 목록 (URL + 라이선스)
### 4.2 행성별 색상 팔레트 (JSON)
### 4.3 대기 산란 파라미터 (JSON)
### 4.4 고리 시스템 데이터
### 4.5 크기/거리 스케일링 전략
### 4.6 태양 및 배경 렌더링 데이터

## 5. 기존 시뮬레이터 분석
### 5.1 시뮬레이터별 상세 분석
### 5.2 기능 우선순위 매트릭스
### 5.3 UX/디자인 패턴 종합

## 6. 오픈소스 레퍼런스
### 6.1 주요 프로젝트 분석
### 6.2 재사용 가능한 코드 패턴

## 7. 구현 로드맵 제안
- Phase 1: 기본 씬 + 궤도 렌더링
- Phase 2: 텍스처 + 대기 + 고리
- Phase 3: UI/인터랙션 + 정보 패널
- Phase 4: 성능 최적화 + 모바일

## 부록
- 전체 데이터 JSON 파일
- 참고 URL 목록
- 라이선스 요약
```

3. 최종 보고서를 `태양계_시뮬레이션_자료집.md`에 저장

### Phase 4: 정리

1. 팀원들에게 종료 요청 (SendMessage)
2. 팀 정리 (TeamDelete)
3. `_workspace/` 디렉토리 보존
4. 사용자에게 결과 요약 보고:
   - 수집된 자료 카테고리별 요약
   - 추천 기술 스택 하이라이트
   - 보고서 위치

## 데이터 흐름

```
[리더] → TeamCreate("simulation-data-team")
    ├── orbital-researcher ──SendMessage──→ visual-researcher (행성 크기)
    ├── tech-researcher ←──SendMessage──→ visual-researcher (텍스처 포맷)
    ├── reference-researcher ──SendMessage──→ tech-researcher (기술 스택 정보)
    └── reference-researcher ──SendMessage──→ visual-researcher (텍스처 소스)
    → 각자 _workspace/02_*.md 저장

[리더] → Read(02_*.md) → 통합 → 태양계_시뮬레이션_자료집.md
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 팀원 1명 실패/중지 | 리더가 감지 → SendMessage로 상태 확인 → 재시작. 재실패 시 해당 영역 없이 진행, 보고서에 누락 명시 |
| 팀원 과반 실패 | 사용자에게 알리고 진행 여부 확인 |
| 웹사이트 접근 불가 | 대안 소스로 전환 (NASA → ESA, GitHub → npm 등) |
| 팀원 간 데이터 충돌 | 출처 명시 후 병기 |
| 타임아웃 | 현재까지 수집된 부분 결과로 통합 진행 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 "태양계 시뮬레이션 웹사이트용 자료 수집"을 요청
2. Phase 1에서 `_workspace/` 생성, 조사 계획 수립
3. Phase 2에서 4명 팀 구성, 병렬 조사 수행:
   - orbital-researcher → 궤도 데이터 JSON
   - tech-researcher → 기술 스택 분석 + 추천
   - visual-researcher → 텍스처/색상/대기 데이터
   - reference-researcher → 시뮬레이터 분석 + 기능 매트릭스
4. Phase 3에서 4개 산출물 통합 → `태양계_시뮬레이션_자료집.md`
5. Phase 4에서 팀 정리 + 사용자 보고

### 에러 흐름
1. Phase 2에서 reference-researcher가 WebFetch 실패로 일부 시뮬레이터 분석 불가
2. reference-researcher가 접근 가능한 시뮬레이터만 분석하고, 나머지는 "접근 불가 — 리뷰 기반 분석"으로 대체
3. 나머지 3명 정상 완료
4. Phase 3에서 부분적으로 완료된 레퍼런스 분석을 포함하여 통합
5. 최종 보고서에 "일부 시뮬레이터는 직접 분석 불가, 2차 리뷰 기반" 명시
