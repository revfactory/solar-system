---
name: planet-visual-data
description: "태양계 시뮬레이션 렌더링에 필요한 행성 시각 데이터(텍스처 맵, 색상 팔레트, 대기 파라미터, 고리 데이터, 크기비/거리비)를 수집하는 스킬. 행성 텍스처, 행성 외관, 시각 파라미터, 렌더링 데이터 수집 시 반드시 이 스킬을 사용할 것."
---

# Planet Visual Data — 행성 시각 데이터 수집 스킬

태양계 시뮬레이션에서 각 행성을 사실적으로 렌더링하기 위한 시각 데이터를 수집한다.

## 수집 워크플로우

### 1단계: 텍스처 맵 소스 수집
1. WebSearch로 각 소스 사이트의 최신 URL과 라이선스 확인:
   - "NASA visible earth texture map"
   - "solar system scope texture pack"
   - "planet texture free download"
2. 각 행성별로 사용 가능한 텍스처 유형(diffuse, bump, normal, specular, cloud, night, ring) 매핑
3. 해상도별(2K, 4K, 8K) 옵션 정리
4. 라이선스 확인 (CC0, Public Domain, CC-BY 등)

### 2단계: 색상 팔레트 수집
1. NASA 공식 이미지에서 각 행성의 대표 색상 추출
2. hex/RGB 값으로 정리:
   - 주 색상 (primary)
   - 보조 색상 (secondary)
   - 대기 색상 (atmosphere)
   - 표면 하이라이트 색상

### 3단계: 대기 파라미터 수집
1. Rayleigh/Mie 산란 모델 기준 파라미터:
   - Rayleigh 산란 계수 (RGB 채널별)
   - Mie 산란 계수
   - Mie 비대칭 인자 (g)
   - 대기 두께 비율 (행성 반지름 대비)
   - 대기 밀도 감쇄율 (scale height)
2. 대기가 있는 행성: 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성, 타이탄

### 4단계: 고리 시스템 데이터
1. 토성: 주요 고리(D, C, B, A, F, G, E)의 내/외경, 광학 깊이, 색상
2. 목성, 천왕성, 해왕성: 고리 존재 확인 및 파라미터
3. 고리 텍스처 생성용 데이터 (방사상 밝기/투명도 프로파일)

### 5단계: 크기/거리 스케일링 전략
1. 실제 비율 정리 (km 단위)
2. 시뮬레이션용 스케일 전략 제안:
   - 행성 크기: log 스케일 또는 고정 최소 크기
   - 궤도 거리: 조정 가능한 비선형 스케일
   - 사용자 줌 레벨에 따른 동적 스케일

### 6단계: 태양 + 배경 시각 데이터
1. 태양: 색온도(5778K), 코로나 색상, 블룸 파라미터
2. 배경 별: 스카이박스/큐브맵 소스 (ESA/Gaia, Tycho-2 catalog)
3. 은하수 텍스처 소스

## 행성별 체크리스트

각 행성에 대해 다음 항목을 수집한다:

- [ ] Diffuse(color) map URL + 해상도 + 라이선스
- [ ] Bump/Height map (지구형 행성)
- [ ] Normal map (해당 시)
- [ ] Specular map (지구)
- [ ] Cloud map (지구, 금성)
- [ ] Night/Emission map (지구)
- [ ] Ring texture (토성, 목성, 천왕성, 해왕성)
- [ ] 주 색상 hex/RGB
- [ ] 대기 산란 파라미터 (해당 시)
- [ ] 자전축 기울기 (시각적 렌더링용)

## 출력 형식

```json
{
  "textures": {
    "mercury": {
      "diffuse": { "url": "...", "resolution": "4K", "license": "Public Domain", "source": "NASA" },
      "bump": { "url": "...", "resolution": "4K", "license": "Public Domain" }
    }
  },
  "colors": {
    "mercury": {
      "primary": "#8C7E6E",
      "secondary": "#5C544A",
      "atmosphere": null
    }
  },
  "atmosphere": {
    "earth": {
      "rayleigh": [5.5e-6, 13.0e-6, 22.4e-6],
      "mie": 21e-6,
      "mie_g": 0.758,
      "height_ratio": 0.025,
      "scale_height_rayleigh": 8500,
      "scale_height_mie": 1200
    }
  },
  "rings": {
    "saturn": {
      "inner_radius_ratio": 1.239,
      "outer_radius_ratio": 2.267,
      "texture_url": "...",
      "opacity_profile": "..."
    }
  },
  "scale": {
    "actual_radii_km": { "mercury": 2439.7, "venus": 6051.8, "..." : "..." },
    "actual_distances_au": { "mercury": 0.387, "venus": 0.723, "..." : "..." },
    "suggested_visual_scale": { "planet_exaggeration": 200, "distance_compression": "log" }
  }
}
```

## 품질 기준
- 모든 텍스처 URL은 실제 접근 가능한지 확인한다
- 라이선스가 명확한 소스만 포함한다 (불명확하면 "라이선스 확인 필요" 표시)
- 색상값은 NASA 공식 이미지 기반으로 추출한다
- 대기 파라미터는 학술 논문 또는 검증된 셰이더 구현을 출처로 한다
