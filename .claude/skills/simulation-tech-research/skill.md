---
name: simulation-tech-research
description: "태양계 3D 시뮬레이션 웹사이트 구현에 필요한 기술 스택(Three.js, WebGL, 물리 엔진, 셰이더)과 오픈소스 구현체를 조사하는 스킬. 3D 웹 기술, WebGL 라이브러리, 시뮬레이션 프레임워크, 행성 렌더링 기법 조사 시 반드시 이 스킬을 사용할 것."
---

# Simulation Tech Research — 3D 시뮬레이션 기술 스택 조사 스킬

태양계 시뮬레이션 웹사이트 구현에 필요한 기술 스택, 라이브러리, 구현 패턴을 조사한다.

## 조사 워크플로우

### 1단계: 3D 프레임워크 비교
1. WebSearch로 Three.js / Babylon.js / React Three Fiber 비교
2. 각 프레임워크의 공식 문서 WebFetch
3. 태양계 시뮬레이션에 특화된 장단점 비교표 작성

### 2단계: 오픈소스 프로젝트 조사
1. WebSearch로 GitHub에서 관련 프로젝트 검색:
   - "solar system three.js"
   - "planet simulation webgl"
   - "solar system simulator javascript"
2. 스타 수, 최근 활동, 코드 품질 기준으로 상위 5~10개 선별
3. 각 프로젝트의 아키텍처 분석

### 3단계: 핵심 기술 요소별 조사
| 기술 요소 | 검색 키워드 |
|----------|-----------|
| 궤도 계산 | "kepler equation javascript", "orbital mechanics js library" |
| 대기 셰이더 | "atmospheric scattering glsl three.js" |
| 고리 렌더링 | "saturn ring shader three.js" |
| 카메라 제어 | "three.js smooth camera transition planets" |
| 성능 최적화 | "three.js performance large scene optimization" |
| 텍스처 관리 | "three.js texture loading optimization lazy" |

### 4단계: 기술 스택 추천안 작성
조사 결과를 종합하여 최종 기술 스택 추천안을 작성한다.

## 비교 분석 구조

```markdown
## 프레임워크 비교

| 항목 | Three.js | Babylon.js | React Three Fiber |
|------|---------|-----------|-------------------|
| 번들 크기 | | | |
| 학습 곡선 | | | |
| 생태계/플러그인 | | | |
| 태양계 시뮬 레퍼런스 | | | |
| 성능 (대규모 씬) | | | |
| 커뮤니티 활성도 | | | |
| 모바일 지원 | | | |
| 셰이더 커스터마이징 | | | |
```

## 오픈소스 분석 구조

```markdown
### [프로젝트명] — ⭐ {stars}
- **URL:** github.com/...
- **기술 스택:** Three.js / ...
- **최근 커밋:** YYYY-MM
- **아키텍처:**
  - 파일 구조
  - 렌더링 파이프라인
  - 데이터 구조 (행성 정의 방식)
- **재사용 가능한 코드:**
  - 궤도 계산 모듈
  - 셰이더 코드
  - 카메라 제어
- **한계/개선점:**
```

## 코드 패턴 수집

실제 구현에 참고할 코드 패턴을 수집한다:

1. **씬 초기화** — 카메라, 조명, 렌더러 설정
2. **행성 클래스 구조** — 객체 지향 행성 정의
3. **궤도 업데이트 루프** — 애니메이션 프레임마다의 위치 계산
4. **셰이더 코드** — 대기, 고리, 태양 코로나
5. **카메라 전환** — 행성 간 부드러운 전환
6. **시간 제어** — 재생 속도 조절 시스템
7. **정보 패널** — 행성 데이터 표시 UI

## 출력 형식
- 프레임워크 비교표
- 오픈소스 프로젝트 분석 (상위 5~10개)
- 핵심 기술 요소별 조사 결과
- 코드 패턴 모음 (실행 가능한 코드 스니펫)
- 최종 기술 스택 추천안
