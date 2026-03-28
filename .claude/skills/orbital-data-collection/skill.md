---
name: orbital-data-collection
description: "태양계 시뮬레이션 구현에 필요한 궤도 역학 데이터(케플러 요소, 중력 파라미터, 자전 데이터, 천문 상수)를 정밀하게 수집하는 스킬. 궤도 데이터, 케플러 요소, 에페메리스, 행성 궤도 파라미터 수집 시 반드시 이 스킬을 사용할 것."
---

# Orbital Data Collection — 궤도 역학 데이터 수집 스킬

시뮬레이션 코드에 직접 사용할 수 있는 정밀한 궤도 역학 데이터를 수집한다.

## 데이터 수집 워크플로우

### 1단계: 1차 소스 수집
1. WebSearch로 "NASA JPL planetary orbital elements" 검색
2. WebFetch로 NASA Planetary Fact Sheet 접근 (nssdc.gsfc.nasa.gov/planetary/factsheet)
3. JPL Solar System Dynamics 데이터 확인 (ssd.jpl.nasa.gov)

### 2단계: 케플러 요소 수집
1. J2000.0 에포크 기준 6개 궤도 요소 + 변화율 수집 (8행성)
2. NASA의 "Keplerian Elements for Approximate Positions" 페이퍼 참조
3. 각 요소의 유효 범위(epoch range)를 기록

### 3단계: 물리 상수 수집
1. IAU 2012 권장값 기준 천문 상수 수집
2. GM값은 DE441 기준 최신값 사용
3. 단위 변환 계수 정리

### 4단계: 자전 파라미터 수집
1. IAU WGCCRE(Working Group on Cartographic Coordinates and Rotational Elements) 데이터 사용
2. 각 행성의 북극 방향 (적경α₀, 적위δ₀) 수집
3. 프라임 메리디언 정의와 회전율 수집

### 5단계: 위성 궤도 데이터 수집 (주요 위성)
- 지구: 달
- 화성: 포보스, 데이모스
- 목성: 이오, 유로파, 가니메데, 칼리스토
- 토성: 타이탄, 엔셀라두스
- 천왕성: 미란다, 아리엘, 움브리엘, 티타니아, 오베론
- 해왕성: 트리톤

### 6단계: 구현 가이드 작성
- 케플러 방정식 M = E - e·sin(E) 풀이 알고리즘 (Newton-Raphson)
- 궤도 요소 → 3D 직교 좌표 변환 공식
- 시간 스케일 변환 (UTC → JD → J2000 세기)

## 출력 형식

모든 데이터를 JSON 호환 형식으로 정리한다:

```json
{
  "epoch": "J2000.0 (2000-Jan-1.5 TT)",
  "constants": {
    "G": { "value": 6.67430e-11, "unit": "m³/(kg·s²)" },
    "AU": { "value": 1.495978707e11, "unit": "m" },
    "GM_sun": { "value": 1.32712440018e20, "unit": "m³/s²" }
  },
  "planets": {
    "mercury": {
      "orbital_elements": {
        "a": { "value": 0.38709927, "rate": 0.00000037, "unit": "AU", "rate_unit": "AU/cy" },
        "e": { "value": 0.20563593, "rate": 0.00001906 },
        "i": { "value": 7.00497902, "rate": -0.00594749, "unit": "deg" },
        "L": { "value": 252.25032350, "rate": 149472.67411175, "unit": "deg" },
        "omega_bar": { "value": 77.45779628, "rate": 0.16047689, "unit": "deg" },
        "Omega": { "value": 48.33076593, "rate": -0.12534081, "unit": "deg" }
      },
      "physical": {
        "GM": { "value": 2.2032e13, "unit": "m³/s²" },
        "radius_eq": { "value": 2439.7, "unit": "km" }
      },
      "rotation": {
        "period_hours": 1407.6,
        "axial_tilt_deg": 0.034,
        "north_pole_ra_deg": 281.01,
        "north_pole_dec_deg": 61.41
      }
    }
  }
}
```

## 데이터 소스 우선순위
1. NASA JPL DE441 에페메리스
2. NASA Planetary Fact Sheet (nssdc.gsfc.nasa.gov)
3. IAU WGCCRE Reports
4. Standish & Williams (2003) — "Keplerian Elements for Approximate Positions"
5. 피어리뷰 논문 (Astronomy & Astrophysics 등)

## 품질 기준
- 모든 값에 단위, 에포크, 출처를 명시한다
- SI 단위와 천문학적 관용 단위를 병기한다
- 유효 자릿수를 출처와 일치시킨다 (임의로 반올림하지 않는다)
- 세기당 변화율(rates)을 포함하여 장기 시뮬레이션을 지원한다
