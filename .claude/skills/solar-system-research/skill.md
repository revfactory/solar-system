---
name: solar-system-research
description: "태양계 8개 행성(수성~해왕성)을 심층 조사하고 관련 학술 논문을 분석하여 종합 보고서를 생성하는 오케스트레이터. '태양계 조사', '행성 리서치', '태양계 보고서', '행성 논문 분석', '태양계 연구' 등 태양계 전체 또는 다수 행성에 대한 종합 조사 요청 시 반드시 이 스킬을 사용할 것."
---

# Solar System Research Orchestrator

태양계 8개 행성을 심층 조사하고 관련 학술 논문을 분석하여 종합 보고서를 생성하는 에이전트 팀 오케스트레이터.

## 실행 모드: 에이전트 팀 (2 Phase 팀 재구성)

8개 행성을 팀 크기 가이드라인(5명)에 맞추어 2개 Phase로 분할한다.

## 에이전트 구성

| 에이전트 | 타입 | 역할 | 스킬 |
|---------|------|------|------|
| planet-researcher (x4/phase) | general-purpose | 행성별 심층 조사 | planet-research |
| paper-analyst (x1/phase) | general-purpose | 학술 논문 검색/분석 | paper-analysis |
| (리더 = 오케스트레이터) | — | 팀 조율 + 최종 통합 | — |

## 워크플로우

### Phase 1: 준비

1. 사용자 입력 분석 — 조사 범위, 특별히 강조할 주제 파악
2. `_workspace/` 디렉토리 생성
3. 행성 목록과 조사 가이드라인을 `_workspace/00_input/research_plan.md`에 저장

### Phase 2: 내행성 조사팀 (수성, 금성, 지구, 화성)

1. 팀 생성:
   ```
   TeamCreate(
     team_name: "inner-planets-team",
     members: [
       {
         name: "mercury-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 수성(Mercury) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 수성에 대한 심층 조사 보고서를 작성하세요. MESSENGER 미션과 BepiColombo 미션의 최신 성과를 반드시 포함하세요. 결과를 _workspace/02_mercury_research.md에 저장하세요. 다른 행성 연구자에게 비교 행성학적으로 흥미로운 발견을 SendMessage로 공유하세요. 논문 분석가(inner-paper-analyst)에게 발견한 핵심 논문 정보를 전달하세요."
       },
       {
         name: "venus-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 금성(Venus) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 금성에 대한 심층 조사 보고서를 작성하세요. 포스핀(phosphine) 논쟁, VERITAS/DAVINCI+ 미션, 대기 슈퍼로테이션을 반드시 포함하세요. 결과를 _workspace/02_venus_research.md에 저장하세요. 다른 행성 연구자에게 비교 행성학적으로 흥미로운 발견을 SendMessage로 공유하세요. 논문 분석가(inner-paper-analyst)에게 발견한 핵심 논문 정보를 전달하세요."
       },
       {
         name: "earth-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 지구(Earth) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 지구에 대한 심층 조사 보고서를 작성하세요. 행성과학적 관점에서 지구를 다루세요 — 다른 행성과의 비교 기준점으로서의 지구, 자기장과 생명 보호, 판구조론의 고유성, 대기 진화를 중심으로. 결과를 _workspace/02_earth_research.md에 저장하세요. 다른 행성 연구자에게 비교 데이터를 적극 제공하세요."
       },
       {
         name: "mars-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 화성(Mars) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 화성에 대한 심층 조사 보고서를 작성하세요. Perseverance/Ingenuity 미션, 지하 물/얼음 발견, 메탄 논쟁, 거주 가능성(habitability)을 반드시 포함하세요. 결과를 _workspace/02_mars_research.md에 저장하세요. 다른 행성 연구자에게 비교 행성학적으로 흥미로운 발견을 SendMessage로 공유하세요. 논문 분석가(inner-paper-analyst)에게 발견한 핵심 논문 정보를 전달하세요."
       },
       {
         name: "inner-paper-analyst",
         agent_type: "paper-analyst",
         model: "opus",
         prompt: "당신은 내행성(수성, 금성, 지구, 화성) 관련 학술 논문 분석가입니다. .claude/skills/paper-analysis/skill.md를 Read하여 분석 프레임워크를 따르세요. WebSearch로 각 내행성에 대한 최신 핵심 논문을 검색하고 심층 분석하세요. 행성당 최소 5편. NASA ADS, arXiv, Google Scholar를 활용하세요. 분석 결과를 _workspace/02_paper_analysis_inner.md에 저장하세요. 각 행성 연구자에게 해당 행성의 핵심 논문 발견을 SendMessage로 전달하세요. 행성 연구자들로부터 논문 정보를 수신하면 우선 분석하세요."
       }
     ]
   )
   ```

2. 작업 등록:
   ```
   TaskCreate(tasks: [
     { title: "수성 심층 조사", description: "수성의 물리적 특성, 대기, 내부 구조, 자기장, 탐사 역사를 조사하여 _workspace/02_mercury_research.md에 보고서 작성", assignee: "mercury-researcher" },
     { title: "금성 심층 조사", description: "금성의 물리적 특성, 대기, 내부 구조, 탐사 역사를 조사하여 _workspace/02_venus_research.md에 보고서 작성", assignee: "venus-researcher" },
     { title: "지구 심층 조사", description: "행성과학적 관점에서 지구를 조사하여 _workspace/02_earth_research.md에 보고서 작성", assignee: "earth-researcher" },
     { title: "화성 심층 조사", description: "화성의 물리적 특성, 대기, 거주 가능성, 탐사 역사를 조사하여 _workspace/02_mars_research.md에 보고서 작성", assignee: "mars-researcher" },
     { title: "내행성 논문 분석", description: "수성/금성/지구/화성 관련 핵심 논문 각 5편 이상 분석하여 _workspace/02_paper_analysis_inner.md에 저장", assignee: "inner-paper-analyst" }
   ])
   ```

3. 팀원들이 자체 조율하며 병렬 조사 수행
4. 모든 작업 완료 대기 (TaskGet으로 상태 확인)
5. 팀 정리 (SendMessage → TeamDelete)

### Phase 3: 외행성 조사팀 (목성, 토성, 천왕성, 해왕성)

Phase 2 팀을 정리한 뒤 새 팀을 구성한다.

1. 팀 생성:
   ```
   TeamCreate(
     team_name: "outer-planets-team",
     members: [
       {
         name: "jupiter-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 목성(Jupiter) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 목성에 대한 심층 조사 보고서를 작성하세요. Juno 미션의 최신 성과, 대적점(Great Red Spot) 진화, 갈릴레이 위성(특히 유로파의 해양), 강력한 자기권을 반드시 포함하세요. 결과를 _workspace/03_jupiter_research.md에 저장하세요. 다른 행성 연구자에게 비교 행성학적으로 흥미로운 발견을 SendMessage로 공유하세요."
       },
       {
         name: "saturn-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 토성(Saturn) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 토성에 대한 심층 조사 보고서를 작성하세요. Cassini-Huygens 미션의 유산, 고리 시스템의 나이와 기원, 엔셀라두스 간헐천과 내부 해양, 타이탄의 메탄 순환을 반드시 포함하세요. 결과를 _workspace/03_saturn_research.md에 저장하세요."
       },
       {
         name: "uranus-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 천왕성(Uranus) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 천왕성에 대한 심층 조사 보고서를 작성하세요. 극단적 자전축 기울기(98도)의 원인과 영향, 비정상적 자기장, 얼음거인 내부 구조, Voyager 2 이후의 관측 데이터, 제안된 전용 미션(Uranus Orbiter and Probe)을 반드시 포함하세요. 결과를 _workspace/03_uranus_research.md에 저장하세요."
       },
       {
         name: "neptune-researcher",
         agent_type: "planet-researcher",
         model: "opus",
         prompt: "당신은 해왕성(Neptune) 전담 연구자입니다. .claude/skills/planet-research/skill.md를 Read하여 조사 워크플로우와 보고서 구조를 따르세요. WebSearch와 WebFetch를 적극 활용하여 해왕성에 대한 심층 조사 보고서를 작성하세요. 태양계에서 가장 강한 바람, 대흑점(Great Dark Spot)의 생성/소멸, 트리톤의 역행 궤도와 지질 활동, 얼음거인 내부의 다이아몬드 비, JWST의 해왕성 관측을 반드시 포함하세요. 결과를 _workspace/03_neptune_research.md에 저장하세요."
       },
       {
         name: "outer-paper-analyst",
         agent_type: "paper-analyst",
         model: "opus",
         prompt: "당신은 외행성(목성, 토성, 천왕성, 해왕성) 관련 학술 논문 분석가입니다. .claude/skills/paper-analysis/skill.md를 Read하여 분석 프레임워크를 따르세요. WebSearch로 각 외행성에 대한 최신 핵심 논문을 검색하고 심층 분석하세요. 행성당 최소 5편. NASA ADS, arXiv, Google Scholar를 활용하세요. 분석 결과를 _workspace/03_paper_analysis_outer.md에 저장하세요. 각 행성 연구자에게 해당 행성의 핵심 논문 발견을 SendMessage로 전달하세요."
       }
     ]
   )
   ```

2. Phase 2와 동일한 작업 등록 및 실행 패턴
3. 모든 작업 완료 대기 → 팀 정리

### Phase 4: 통합 보고서 생성

리더(오케스트레이터)가 모든 산출물을 통합한다.

1. `_workspace/`의 모든 산출물을 Read:
   - `02_mercury_research.md` ~ `02_mars_research.md`
   - `02_paper_analysis_inner.md`
   - `03_jupiter_research.md` ~ `03_neptune_research.md`
   - `03_paper_analysis_outer.md`

2. 종합 보고서 구성:
   ```markdown
   # 태양계 행성 종합 조사 보고서

   ## 총론
   - 태양계 형성과 진화 개요
   - 행성 분류 체계 (지구형, 가스거인, 얼음거인)
   - 비교 행성학의 주요 인사이트

   ## 개별 행성 보고서
   ### 1. 수성 (Mercury)
   ### 2. 금성 (Venus)
   ### 3. 지구 (Earth)
   ### 4. 화성 (Mars)
   ### 5. 목성 (Jupiter)
   ### 6. 토성 (Saturn)
   ### 7. 천왕성 (Uranus)
   ### 8. 해왕성 (Neptune)

   ## 비교 행성학 분석
   - 대기 비교표
   - 내부 구조 비교
   - 자기장 비교
   - 위성 시스템 비교

   ## 학술 논문 분석
   ### 행성별 핵심 논문
   ### 연구 동향 종합
   ### 미해결 질문과 미래 연구 방향

   ## 부록
   - 행성 물리량 비교표
   - 주요 탐사 미션 연대표
   - 전체 참고 문헌 목록
   ```

3. 최종 보고서를 `태양계_종합_조사_보고서.md`에 저장

### Phase 5: 정리

1. `_workspace/` 디렉토리 보존 (중간 산출물 = 사후 검증·감사 추적용)
2. 사용자에게 결과 요약 보고:
   - 총 조사된 행성 수
   - 총 분석된 논문 수
   - 보고서 위치
   - 핵심 발견 3~5개 하이라이트

## 데이터 흐름

```
Phase 2: 내행성팀
[리더] → TeamCreate("inner-planets-team")
    ├── mercury-researcher ←SendMessage→ venus-researcher
    ├── earth-researcher ←SendMessage→ mars-researcher
    └── inner-paper-analyst ←SendMessage→ 모든 행성 연구자
    → 각자 _workspace/02_*.md 저장
    → TeamDelete

Phase 3: 외행성팀
[리더] → TeamCreate("outer-planets-team")
    ├── jupiter-researcher ←SendMessage→ saturn-researcher
    ├── uranus-researcher ←SendMessage→ neptune-researcher
    └── outer-paper-analyst ←SendMessage→ 모든 행성 연구자
    → 각자 _workspace/03_*.md 저장
    → TeamDelete

Phase 4: 통합
[리더] → Read(_workspace/02_*.md + 03_*.md)
       → 종합 보고서 생성
       → 태양계_종합_조사_보고서.md
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 팀원 1명 실패/중지 | 리더가 감지 → SendMessage로 상태 확인 → 재시작 시도. 재실패 시 해당 행성 보고서 없이 진행, 최종 보고서에 누락 명시 |
| 팀원 과반 실패 | 사용자에게 알리고 진행 여부 확인 |
| 논문 검색 실패 | paper-analyst가 검색 범위 확장 (학회 발표, 기술 보고서 포함). 그래도 부족하면 해당 행성 논문 섹션에 "추가 조사 필요" 명시 |
| 팀원 간 데이터 충돌 | 출처 명시 후 병기, 삭제하지 않음. 최신 데이터 우선 표시 |
| 타임아웃 | 현재까지 수집된 부분 결과로 통합 진행 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 "태양계 행성 심층 조사"를 요청
2. Phase 1에서 `_workspace/` 생성, 조사 계획 수립
3. Phase 2에서 내행성팀 5명 구성, 4개 행성 보고서 + 논문 분석 생성
4. Phase 3에서 외행성팀 5명 구성, 4개 행성 보고서 + 논문 분석 생성
5. Phase 4에서 10개 산출물 통합하여 종합 보고서 생성
6. 예상 결과: `태양계_종합_조사_보고서.md` (8개 행성 보고서 + 40편+ 논문 분석)

### 에러 흐름
1. Phase 2에서 venus-researcher가 WebSearch 실패로 중지
2. 리더가 유휴 알림 수신 → SendMessage로 재시작 지시
3. 재시작 실패 시 mercury/earth/mars 결과 + 논문 분석으로 Phase 2 완료
4. Phase 3 정상 진행
5. Phase 4에서 금성 섹션을 "조사 미완료 — 기본 데이터만 포함"으로 표시
6. 사용자에게 부분 완료 알림 + 금성 재조사 옵션 제안
