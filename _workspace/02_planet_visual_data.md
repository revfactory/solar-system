# 행성 시각 데이터 (Planet Visual Data)

> 태양계 시뮬레이션 렌더링에 필요한 시각 데이터 종합 정리
> 작성일: 2026-03-28

---

## 1. 텍스처 맵 소스

### 1.1 주요 소스 사이트

| 소스 | URL | 라이선스 | 비고 |
|------|-----|---------|------|
| Solar System Scope | https://www.solarsystemscope.com/textures/ | CC BY 4.0 | 2K/4K/8K, NASA 데이터 기반 |
| JHT Planetary Pixel Emporium | https://planetpixelemporium.com/ | 소스 재배포 금지, 프로젝트 사용 무료 | 고해상도 범프/노멀맵 |
| NASA Visible Earth | https://visibleearth.nasa.gov/ | Public Domain (NASA) | Blue Marble 시리즈 |
| NASA SVS | https://svs.gsfc.nasa.gov/ | Public Domain (NASA) | 과학 시각화 데이터 |
| NASA 3D Resources | https://nasa3d.arc.nasa.gov/ | Public Domain (NASA) | 3D 모델 + 텍스처 |
| USGS Astrogeology | https://astrogeology.usgs.gov/ | Public Domain (USGS) | 고해상도 행성 지도 |

### 1.2 행성별 텍스처 맵 (Solar System Scope 기준)

```json
{
  "textures": {
    "sun": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_sun.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_sun.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "mercury": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_mercury.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "venus": {
      "diffuse_surface": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_venus_surface.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "diffuse_atmosphere": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_venus_atmosphere.jpg",
        "4k": "https://www.solarsystemscope.com/textures/download/4k_venus_atmosphere.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "earth": {
      "diffuse_day": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "night_emission": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_earth_nightmap.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "clouds": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_earth_clouds.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "normal": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.tif",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_earth_normal_map.tif",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "specular": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_earth_specular_map.tif",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_earth_specular_map.tif",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "blue_marble_nasa": {
        "description": "NASA Blue Marble Next Generation - 12개월 고해상도 위성 이미지",
        "url": "https://visibleearth.nasa.gov/collection/1484/blue-marble",
        "svs_url": "https://svs.gsfc.nasa.gov/2915",
        "resolution": "최대 86400x43200",
        "license": "Public Domain (NASA)"
      }
    },
    "mars": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_mars.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "jupiter": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_jupiter.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "saturn": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_saturn.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      },
      "ring_alpha": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_saturn_ring_alpha.png",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "uranus": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    },
    "neptune": {
      "diffuse": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_neptune.jpg",
        "license": "CC BY 4.0",
        "source": "Solar System Scope"
      }
    }
  },
  "additional_textures": {
    "bump_maps": {
      "source": "JHT Planetary Pixel Emporium",
      "url": "https://planetpixelemporium.com/planets.html",
      "available": ["mercury", "venus", "earth", "mars", "moon"],
      "license": "프로젝트 사용 무료, 소스 재배포 금지",
      "note": "고해상도(4K+)는 유료"
    },
    "stars_background": {
      "stars": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_stars.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_stars.jpg"
      },
      "stars_milky_way": {
        "2k": "https://www.solarsystemscope.com/textures/download/2k_stars_milky_way.jpg",
        "8k": "https://www.solarsystemscope.com/textures/download/8k_stars_milky_way.jpg"
      },
      "license": "CC BY 4.0"
    },
    "moon": {
      "2k": "https://www.solarsystemscope.com/textures/download/2k_moon.jpg",
      "8k": "https://www.solarsystemscope.com/textures/download/8k_moon.jpg",
      "license": "CC BY 4.0"
    }
  }
}
```

### 1.3 텍스처 유형별 필요 행성 매트릭스

| 텍스처 유형 | 수성 | 금성 | 지구 | 화성 | 목성 | 토성 | 천왕성 | 해왕성 |
|------------|:----:|:----:|:----:|:----:|:----:|:----:|:-----:|:-----:|
| Diffuse (color) | O | O | O | O | O | O | O | O |
| Bump/Height | O | O | O | O | - | - | - | - |
| Normal | O | O | O | O | - | - | - | - |
| Specular | - | - | O | - | - | - | - | - |
| Cloud | - | O | O | - | - | - | - | - |
| Night/Emission | - | - | O | - | - | - | - | - |
| Ring texture | - | - | - | - | O* | O | O* | O* |

> *목성, 천왕성, 해왕성 고리는 매우 희미하여 시각적으로 생략 가능

---

## 2. 색상 팔레트

```json
{
  "colors": {
    "sun": {
      "primary": "#FFF5E0",
      "secondary": "#FFD27F",
      "corona": "#FFE8B0",
      "chromosphere": "#FF6B35",
      "note": "5778K 흑체 복사 = 약 RGB(255, 243, 218) = #FFF3DA"
    },
    "mercury": {
      "primary": "#8C7E6E",
      "secondary": "#5C544A",
      "highlight": "#B8A99A",
      "atmosphere": null
    },
    "venus": {
      "primary": "#E8CDA0",
      "secondary": "#C4A66A",
      "atmosphere": "#F5DEB3",
      "cloud_top": "#FAEBD7"
    },
    "earth": {
      "primary": "#2B65D9",
      "secondary": "#1A8B3F",
      "ocean": "#1B4F8A",
      "land": "#5A8C3C",
      "atmosphere": "#87CEEB",
      "cloud": "#FFFFFF",
      "night_lights": "#FFCC66"
    },
    "mars": {
      "primary": "#C1440E",
      "secondary": "#8B4513",
      "polar_cap": "#E8DCC8",
      "atmosphere": "#D2996C",
      "dust": "#C4956A"
    },
    "jupiter": {
      "primary": "#C88B3A",
      "secondary": "#A0522D",
      "band_light": "#D4A76A",
      "band_dark": "#8B6914",
      "great_red_spot": "#C05030",
      "atmosphere": "#D4A574"
    },
    "saturn": {
      "primary": "#E8D088",
      "secondary": "#C4A050",
      "band_light": "#F5E6C8",
      "band_dark": "#B8960A",
      "ring_a": "#C8B078",
      "ring_b": "#D4BA82",
      "ring_c": "#A08858",
      "atmosphere": "#EAD9A0"
    },
    "uranus": {
      "primary": "#73C2C6",
      "secondary": "#5DA4A8",
      "atmosphere": "#AFEEEE",
      "note": "메탄에 의한 청록색 - 적색광 흡수"
    },
    "neptune": {
      "primary": "#3B5FC0",
      "secondary": "#5070D0",
      "atmosphere": "#4169E1",
      "dark_spot": "#1A2E5A",
      "note": "메탄 + 미확인 화합물에 의한 진한 파란색"
    }
  }
}
```

---

## 3. 대기 산란 파라미터

Rayleigh/Mie 산란 모델 기반. 셰이더 구현에 직접 사용 가능한 값.

```json
{
  "atmosphere_parameters": {
    "earth": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [5.5e-6, 13.0e-6, 22.4e-6],
      "rayleigh_scale_height_m": 8000,
      "mie_coefficient": 21e-6,
      "mie_scale_height_m": 1200,
      "mie_asymmetry_g": 0.758,
      "planet_radius_m": 6378140,
      "atmosphere_radius_m": 6478140,
      "atmosphere_height_ratio": 0.016,
      "atmosphere_color": "#87CEEB",
      "sun_intensity": 22.0,
      "source": "glsl-atmosphere (wwwtyro/glsl-atmosphere)"
    },
    "venus": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [7.0e-6, 12.0e-6, 16.0e-6],
      "rayleigh_scale_height_m": 15900,
      "mie_coefficient": 50e-6,
      "mie_scale_height_m": 2500,
      "mie_asymmetry_g": 0.70,
      "planet_radius_m": 6051800,
      "atmosphere_radius_m": 6301800,
      "atmosphere_height_ratio": 0.041,
      "atmosphere_color": "#F5DEB3",
      "note": "CO2 주성분, 두꺼운 황산 구름, 총 광학 두께 ~55",
      "cloud_optical_thickness": 55,
      "single_scattering_albedo": 0.9994,
      "source": "추정치 - 학술 데이터 기반 보정 필요"
    },
    "mars": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [19.918e-6, 13.57e-6, 5.75e-6],
      "rayleigh_scale_height_m": 11100,
      "mie_coefficient": 4e-6,
      "mie_scale_height_m": 11100,
      "mie_asymmetry_g": 0.76,
      "planet_radius_m": 3396190,
      "atmosphere_radius_m": 3496190,
      "atmosphere_height_ratio": 0.029,
      "atmosphere_color": "#D2996C",
      "note": "CO2 대기, 먼지 입자 산란이 지배적, 붉은-주황색 하늘. Rayleigh 계수가 적색>청색 (지구와 반대)",
      "source": "Physically Based Rendering of the Martian Atmosphere (학술 논문 기반)"
    },
    "jupiter": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [3.8e-6, 9.0e-6, 15.5e-6],
      "rayleigh_scale_height_m": 27000,
      "mie_coefficient": 15e-6,
      "mie_scale_height_m": 12000,
      "mie_asymmetry_g": 0.80,
      "planet_radius_m": 71492000,
      "atmosphere_radius_m": 72492000,
      "atmosphere_height_ratio": 0.014,
      "atmosphere_color": "#D4A574",
      "note": "H2/He 주성분, 암모니아 구름, 두꺼운 대기. 시뮬레이션에서는 얇은 대기 효과로 표현 권장",
      "source": "추정치 - 가스행성 대기 모델 기반"
    },
    "saturn": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [4.0e-6, 9.5e-6, 16.0e-6],
      "rayleigh_scale_height_m": 59500,
      "mie_coefficient": 10e-6,
      "mie_scale_height_m": 25000,
      "mie_asymmetry_g": 0.78,
      "planet_radius_m": 60268000,
      "atmosphere_radius_m": 61268000,
      "atmosphere_height_ratio": 0.017,
      "atmosphere_color": "#EAD9A0",
      "note": "H2/He 주성분, 암모니아 구름, 연한 황금빛",
      "source": "추정치 - 가스행성 대기 모델 기반"
    },
    "uranus": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [5.0e-6, 12.0e-6, 24.0e-6],
      "rayleigh_scale_height_m": 27700,
      "mie_coefficient": 5e-6,
      "mie_scale_height_m": 15000,
      "mie_asymmetry_g": 0.75,
      "planet_radius_m": 25559000,
      "atmosphere_radius_m": 26059000,
      "atmosphere_height_ratio": 0.020,
      "atmosphere_color": "#AFEEEE",
      "note": "H2/He/CH4 주성분, 메탄이 적색광 흡수하여 청록색",
      "source": "추정치 - 빙왕성 대기 모델 기반"
    },
    "neptune": {
      "has_atmosphere": true,
      "rayleigh_coefficients": [6.0e-6, 14.0e-6, 26.0e-6],
      "rayleigh_scale_height_m": 19700,
      "mie_coefficient": 8e-6,
      "mie_scale_height_m": 10000,
      "mie_asymmetry_g": 0.77,
      "planet_radius_m": 24764000,
      "atmosphere_radius_m": 25264000,
      "atmosphere_height_ratio": 0.020,
      "atmosphere_color": "#4169E1",
      "note": "H2/He/CH4 주성분, 메탄 + 미확인 화합물로 천왕성보다 진한 파란색",
      "source": "추정치 - 빙왕성 대기 모델 기반"
    },
    "mercury": {
      "has_atmosphere": false,
      "note": "사실상 진공, 대기 렌더링 불필요"
    }
  }
}
```

> **주의**: 지구를 제외한 행성의 Rayleigh/Mie 계수는 대기 조성과 물리 파라미터로부터 추산한 값입니다. 지구의 값은 검증된 셰이더 구현(glsl-atmosphere)에서 가져왔으며, 화성은 학술 논문 기반입니다. 목성, 토성, 천왕성, 해왕성은 가스/빙 행성이므로 표면 경계가 명확하지 않아 시각적 근사치입니다.

---

## 4. 고리 시스템 데이터

### 4.1 토성 고리 (가장 화려한 고리 시스템)

```json
{
  "saturn_rings": {
    "planet_equatorial_radius_km": 60268,
    "_source": "JPL Solar System Dynamics (orbital-researcher 교차 검증)",
    "rings": {
      "D": {
        "inner_radius_km": 66900,
        "outer_radius_km": 76517,
        "width_km": 7500,
        "inner_radius_ratio": 1.11,
        "outer_radius_ratio": 1.27,
        "optical_depth": 0.001,
        "color": "#A08858",
        "opacity": 0.01,
        "note": "매우 희미, 반사광에서만 보임"
      },
      "C": {
        "inner_radius_km": 74658,
        "outer_radius_km": 92000,
        "width_km": 17500,
        "inner_radius_ratio": 1.24,
        "outer_radius_ratio": 1.53,
        "optical_depth_range": [0.05, 0.12],
        "optical_depth_avg": 0.08,
        "color": "#9C8A6A",
        "opacity": 0.15,
        "note": "Crepe Ring, 반투명"
      },
      "B": {
        "inner_radius_km": 92000,
        "outer_radius_km": 117580,
        "width_km": 25500,
        "inner_radius_ratio": 1.53,
        "outer_radius_ratio": 1.95,
        "optical_depth_range": [0.4, 5.0],
        "optical_depth_avg": 1.5,
        "color": "#D4BA82",
        "opacity": 0.9,
        "note": "가장 밝고 밀도 높은 고리"
      },
      "cassini_division": {
        "inner_radius_km": 117580,
        "outer_radius_km": 122170,
        "width_km": 4700,
        "inner_radius_ratio": 1.95,
        "outer_radius_ratio": 2.03,
        "optical_depth_avg": 0.1,
        "color": "#1A1A1A",
        "opacity": 0.05,
        "note": "A와 B 고리 사이의 간격, 거의 투명"
      },
      "A": {
        "inner_radius_km": 122170,
        "outer_radius_km": 136775,
        "width_km": 14600,
        "inner_radius_ratio": 2.03,
        "outer_radius_ratio": 2.27,
        "optical_depth_range": [0.4, 0.9],
        "optical_depth_avg": 0.6,
        "color": "#C8B078",
        "opacity": 0.7,
        "note": "Encke Gap과 Keeler Gap 포함"
      },
      "F": {
        "inner_radius_km": 140180,
        "outer_radius_km": 140680,
        "width_km": 500,
        "inner_radius_ratio": 2.33,
        "outer_radius_ratio": 2.33,
        "optical_depth": 0.1,
        "color": "#B0A070",
        "opacity": 0.15,
        "note": "매우 좁고 꼬여있음, 시뮬레이션에서 생략 가능"
      },
      "G": {
        "inner_radius_km": 166000,
        "outer_radius_km": 175000,
        "width_km": 9000,
        "inner_radius_ratio": 2.75,
        "outer_radius_ratio": 2.90,
        "optical_depth": 1e-6,
        "color": "#888060",
        "opacity": 0.005,
        "note": "매우 희미, 시뮬레이션에서 생략 가능"
      },
      "E": {
        "inner_radius_km": 180000,
        "outer_radius_km": 480000,
        "width_km": 300000,
        "inner_radius_ratio": 2.99,
        "outer_radius_ratio": 7.96,
        "optical_depth": 1.5e-5,
        "color": "#C0C0D0",
        "opacity": 0.001,
        "note": "엔셀라두스 기원, 매우 넓고 희미, 얼음 입자"
      }
    },
    "rendering_recommendation": {
      "essential_rings": ["C", "B", "cassini_division", "A"],
      "optional_rings": ["D", "F"],
      "skip_in_simulation": ["G", "E"],
      "texture_approach": "방사상(radial) 1D 텍스처를 고리 평면에 원통형 매핑. 밝기/투명도 프로파일은 optical_depth 기반으로 생성"
    }
  }
}
```

### 4.2 목성 고리

```json
{
  "jupiter_rings": {
    "planet_equatorial_radius_km": 71492,
    "_source": "JPL Solar System Dynamics",
    "rings": {
      "halo": {
        "inner_radius_km": 92000,
        "outer_radius_km": 122500,
        "width_km": 30500,
        "optical_depth": 1e-6,
        "color": "#8B7355",
        "note": "두꺼운 토러스 형태, 매우 희미"
      },
      "main": {
        "inner_radius_km": 122500,
        "outer_radius_km": 129000,
        "width_km": 6500,
        "optical_depth": 5.9e-6,
        "color": "#8B7355",
        "note": "가장 밝은 고리 (그래도 매우 희미)"
      },
      "amalthea_gossamer": {
        "inner_radius_km": 129000,
        "outer_radius_km": 182000,
        "width_km": 53000,
        "optical_depth": 1e-7,
        "color": "#8B7355",
        "note": "아말테아 물질 기원"
      },
      "thebe_gossamer": {
        "inner_radius_km": 129000,
        "outer_radius_km": 226000,
        "width_km": 97000,
        "optical_depth": 3e-8,
        "color": "#8B7355",
        "note": "테베 물질 기원"
      }
    },
    "rendering_recommendation": "목성 고리는 광학 깊이가 10^-6 이하로 육안으로 거의 보이지 않음. 시뮬레이션에서는 생략하거나 매우 희미하게 표현"
  }
}
```

### 4.3 천왕성 고리

```json
{
  "uranus_rings": {
    "planet_equatorial_radius_km": 25559,
    "_source": "JPL Solar System Dynamics",
    "total_ring_count": 13,
    "major_rings": {
      "epsilon": {
        "orbital_radius_km": 51149,
        "width_km": "20-96",
        "optical_depth_range": [0.5, 2.5],
        "color": "#555555",
        "note": "가장 밝고 넓은 고리"
      },
      "inner_rings_6_5_4_alpha_beta": {
        "radius_range_km": [41837, 45661],
        "width_km": "1-12",
        "optical_depth_range": [0.3, 0.6],
        "note": "매우 좁은 고리들"
      },
      "mu_ring": {
        "orbital_radius_km": 97700,
        "width_km": 17000,
        "optical_depth": 8.5e-6,
        "note": "먼지 고리, 매우 희미"
      },
      "nu_ring": {
        "orbital_radius_km": 67300,
        "width_km": 3800,
        "optical_depth": 5.4e-6,
        "note": "먼지 고리, 매우 희미"
      }
    },
    "rendering_recommendation": "천왕성 고리는 토성에 비해 매우 어둡고 좁음. 어두운 회색 톤. 엡실론 고리만 간략 표현 권장. 자전축 97.77도 기울어져 있어 고리가 수직에 가깝게 보일 수 있음"
  }
}
```

### 4.4 해왕성 고리

```json
{
  "neptune_rings": {
    "planet_equatorial_radius_km": 24764,
    "_source": "JPL Solar System Dynamics",
    "rings": {
      "galle": {
        "orbital_radius_km": 42000,
        "width_km": 2000,
        "optical_depth": 1e-4,
        "color": "#444444"
      },
      "le_verrier": {
        "orbital_radius_km": 53200,
        "width_km": 113,
        "optical_depth": 0.006,
        "color": "#444444"
      },
      "lassell": {
        "orbital_radius_km": 55200,
        "width_km": 4000,
        "optical_depth": 1e-4,
        "color": "#444444"
      },
      "arago": {
        "orbital_radius_km": 57200,
        "width_km": 100,
        "optical_depth": 0.001,
        "color": "#444444"
      },
      "adams": {
        "orbital_radius_km": 62932,
        "width_km": 50,
        "optical_depth_outside_arcs": 0.011,
        "optical_depth_within_arcs": 0.06,
        "color": "#444444",
        "note": "밝은 호(arc) 구조가 특징"
      }
    },
    "rendering_recommendation": "해왕성 고리는 매우 희미하고 불완전한 호(arc) 구조. 시뮬레이션에서 생략 가능"
  }
}
```

---

## 5. 크기/거리 스케일링

### 5.1 실제 비율 데이터

```json
{
  "actual_scale": {
    "radii_km": {
      "sun": 695700,
      "mercury": 2440.53,
      "venus": 6051.8,
      "earth": 6378.14,
      "mars": 3396.19,
      "jupiter": 71492,
      "saturn": 60268,
      "uranus": 25559,
      "neptune": 24764,
      "_source": "JPL Solar System Dynamics (orbital-researcher 교차 검증)"
    },
    "semi_major_axis_au": {
      "mercury": 0.387,
      "venus": 0.723,
      "earth": 1.000,
      "mars": 1.524,
      "jupiter": 5.203,
      "saturn": 9.537,
      "uranus": 19.191,
      "neptune": 30.069
    },
    "semi_major_axis_km": {
      "mercury": 57909227,
      "venus": 108208930,
      "earth": 149598023,
      "mars": 227943824,
      "jupiter": 778340821,
      "saturn": 1426666422,
      "uranus": 2870658186,
      "neptune": 4498396441
    },
    "axial_tilt_deg": {
      "sun": 7.25,
      "mercury": 0.034,
      "venus": 177.4,
      "earth": 23.44,
      "mars": 25.19,
      "jupiter": 3.13,
      "saturn": 26.73,
      "uranus": 97.77,
      "neptune": 28.32
    },
    "rotation_period_hours": {
      "sun": 609.12,
      "mercury": 1407.6,
      "venus": -5832.5,
      "earth": 23.934,
      "mars": 24.623,
      "jupiter": 9.925,
      "saturn": 10.656,
      "uranus": -17.24,
      "neptune": 16.11
    }
  }
}
```

> 음수 회전 주기 = 역행 자전 (금성, 천왕성)

### 5.2 스케일링 문제

| 비교 | 실제 비율 | 문제점 |
|------|----------|--------|
| 태양 vs 지구 반지름 | 109:1 | 태양이 화면을 지배 |
| 목성 vs 수성 반지름 | 28.7:1 | 내행성이 점으로 보임 |
| 해왕성 궤도 vs 수성 궤도 | 77.7:1 | 내행성 궤도가 화면 중앙에 뭉침 |
| 태양 반지름 vs 해왕성 궤도 | 1:6464 | 태양이 점으로 보임 |

### 5.3 시뮬레이션용 스케일 전략 제안

```json
{
  "scaling_strategies": {
    "strategy_1_log_scale": {
      "name": "로그 스케일",
      "planet_radius_formula": "log10(actual_radius_km) * scale_factor",
      "orbit_distance_formula": "log10(actual_distance_au) * scale_factor",
      "pros": "모든 행성이 식별 가능, 비례 관계 유지",
      "cons": "직관적이지 않은 비율",
      "example_radii_normalized": {
        "sun": 1.0,
        "mercury": 0.579,
        "venus": 0.646,
        "earth": 0.650,
        "mars": 0.604,
        "jupiter": 0.828,
        "saturn": 0.814,
        "uranus": 0.752,
        "neptune": 0.749
      }
    },
    "strategy_2_capped_exaggeration": {
      "name": "과장 비율 + 최소 크기",
      "description": "행성 크기를 과장하고 최소 크기를 보장. 거리는 비선형 압축",
      "planet_radius_exaggeration": 200,
      "planet_min_visual_size_px": 10,
      "orbit_distance_compression": "sqrt(actual_au) * base_scale",
      "pros": "가장 자연스러운 외관",
      "cons": "실제 비율과 괴리",
      "example_visual_radii": {
        "comment": "지구=1 기준 상대 크기 (과장 200x 적용 전)",
        "sun": 109.17,
        "mercury": 0.383,
        "venus": 0.950,
        "earth": 1.000,
        "mars": 0.532,
        "jupiter": 10.973,
        "saturn": 9.140,
        "uranus": 3.981,
        "neptune": 3.865
      }
    },
    "strategy_3_dynamic_zoom": {
      "name": "동적 줌 레벨 스케일링",
      "description": "카메라 거리에 따라 행성 크기와 궤도 간격을 동적으로 조정",
      "zoom_levels": {
        "solar_system_overview": {
          "planet_scale": "max(log_scale, min_visible_size)",
          "orbit_scale": "sqrt_compression"
        },
        "planet_focus": {
          "planet_scale": "actual_relative_ratios",
          "orbit_scale": "irrelevant (단일 행성 뷰)"
        },
        "inner_solar_system": {
          "planet_scale": "moderate_exaggeration (50x)",
          "orbit_scale": "linear"
        }
      },
      "pros": "가장 유연하고 교육적",
      "cons": "구현 복잡도 높음"
    },
    "recommended": "strategy_2_capped_exaggeration",
    "recommendation_reason": "구현이 단순하면서도 시각적으로 만족스러운 결과. 대부분의 태양계 시뮬레이터(Solar System Scope, NASA Eyes 등)가 유사한 전략 사용"
  }
}
```

---

## 6. 태양 + 배경 렌더링

### 6.1 태양 렌더링 파라미터

```json
{
  "sun_rendering": {
    "color_temperature_K": 5778,
    "blackbody_rgb": {
      "r": 255,
      "g": 243,
      "b": 218,
      "hex": "#FFF3DA",
      "note": "CIE 1964 10도 색매칭함수 기반 sRGB 변환"
    },
    "corona": {
      "inner_color": "#FFF8E7",
      "outer_color": "#FFF3DA44",
      "radius_ratio": 3.0,
      "falloff": "inverse_square",
      "note": "실제 코로나는 매우 희미하지만 시뮬레이션에서는 과장 표현"
    },
    "bloom_parameters": {
      "threshold": 0.8,
      "intensity": 1.5,
      "radius": 0.4,
      "passes": 5,
      "note": "Three.js UnrealBloomPass 파라미터 기준"
    },
    "lens_flare": {
      "enabled": true,
      "color": "#FFFFEE",
      "size": 0.05,
      "ghosts": 6,
      "ghost_dispersal": 0.3
    },
    "light_source": {
      "type": "PointLight",
      "color": "#FFF5E0",
      "intensity": 1.5,
      "distance": 0,
      "decay": 2,
      "cast_shadow": true,
      "shadow_map_size": 2048
    },
    "surface_animation": {
      "type": "procedural_noise",
      "noise_scale": 4.0,
      "noise_speed": 0.5,
      "color_variation": ["#FFF5E0", "#FFD27F", "#FF8C00"],
      "note": "Simplex/Perlin 노이즈로 표면 활동 시뮬레이션"
    }
  }
}
```

### 6.2 배경 (스카이박스/별 배경)

```json
{
  "background": {
    "recommended_sources": {
      "solar_system_scope_stars": {
        "equirectangular": {
          "2k": "https://www.solarsystemscope.com/textures/download/2k_stars.jpg",
          "8k": "https://www.solarsystemscope.com/textures/download/8k_stars.jpg"
        },
        "with_milky_way": {
          "2k": "https://www.solarsystemscope.com/textures/download/2k_stars_milky_way.jpg",
          "8k": "https://www.solarsystemscope.com/textures/download/8k_stars_milky_way.jpg"
        },
        "license": "CC BY 4.0"
      },
      "esa_gaia": {
        "description": "ESA Gaia Early Data Release 3 기반 별 밀도 맵",
        "license": "CC BY-SA 3.0 IGO",
        "note": "등장방형(equirectangular) 투영. 게임 모드 형태로 가공된 버전 존재",
        "source": "ESA/Gaia/DPAC"
      },
      "spacescape_tool": {
        "description": "무료 우주 스카이박스 생성 도구",
        "url": "http://alexcpeterson.com/spacescape/",
        "output_format": "큐브맵 6면",
        "license": "생성물 자유 사용 (상업 포함)",
        "note": "커스텀 성운, 별 밀도, 색상 조절 가능"
      }
    },
    "implementation": {
      "three_js": {
        "method": "CubeTextureLoader 또는 equirectangular를 Scene.background에 할당",
        "code_hint": "scene.background = new THREE.TextureLoader().load('8k_stars_milky_way.jpg')"
      }
    }
  }
}
```

---

## 7. 행성별 종합 시각 파라미터 (개발용 통합 JSON)

```json
{
  "planets": {
    "mercury": {
      "radius_km": 2440.53,
      "color_primary": "#8C7E6E",
      "color_secondary": "#5C544A",
      "axial_tilt_deg": 0.034,
      "rotation_period_hours": 1407.6,
      "semi_major_axis_au": 0.387,
      "atmosphere": {
        "has_atmosphere": false
      },
      "ring": {
        "has_ring": false
      },
      "textures": {
        "diffuse": "2k_mercury.jpg"
      }
    },
    "venus": {
      "radius_km": 6051.80,
      "color_primary": "#E8CDA0",
      "color_secondary": "#C4A66A",
      "axial_tilt_deg": 177.4,
      "rotation_period_hours": -5832.5,
      "semi_major_axis_au": 0.723,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#F5DEB3",
        "opacity": 0.95,
        "rayleigh_coefficients": [7.0e-6, 12.0e-6, 16.0e-6],
        "mie_coefficient": 50e-6,
        "mie_g": 0.70,
        "atmosphere_height_ratio": 0.041,
        "scale_height_rayleigh": 15900,
        "scale_height_mie": 2500
      },
      "ring": {
        "has_ring": false
      },
      "textures": {
        "diffuse": "2k_venus_surface.jpg",
        "cloud": "2k_venus_atmosphere.jpg"
      }
    },
    "earth": {
      "radius_km": 6378.14,
      "color_primary": "#2B65D9",
      "color_secondary": "#1A8B3F",
      "axial_tilt_deg": 23.44,
      "rotation_period_hours": 23.934,
      "semi_major_axis_au": 1.000,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#87CEEB",
        "opacity": 0.6,
        "rayleigh_coefficients": [5.5e-6, 13.0e-6, 22.4e-6],
        "mie_coefficient": 21e-6,
        "mie_g": 0.758,
        "atmosphere_height_ratio": 0.016,
        "scale_height_rayleigh": 8000,
        "scale_height_mie": 1200
      },
      "ring": {
        "has_ring": false
      },
      "textures": {
        "diffuse": "2k_earth_daymap.jpg",
        "night": "2k_earth_nightmap.jpg",
        "cloud": "2k_earth_clouds.jpg",
        "normal": "2k_earth_normal_map.tif",
        "specular": "2k_earth_specular_map.tif"
      }
    },
    "mars": {
      "radius_km": 3396.19,
      "color_primary": "#C1440E",
      "color_secondary": "#8B4513",
      "axial_tilt_deg": 25.19,
      "rotation_period_hours": 24.623,
      "semi_major_axis_au": 1.524,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#D2996C",
        "opacity": 0.15,
        "rayleigh_coefficients": [19.918e-6, 13.57e-6, 5.75e-6],
        "mie_coefficient": 4e-6,
        "mie_g": 0.76,
        "atmosphere_height_ratio": 0.029,
        "scale_height_rayleigh": 11100,
        "scale_height_mie": 11100
      },
      "ring": {
        "has_ring": false
      },
      "textures": {
        "diffuse": "2k_mars.jpg"
      }
    },
    "jupiter": {
      "radius_km": 71492,
      "color_primary": "#C88B3A",
      "color_secondary": "#A0522D",
      "axial_tilt_deg": 3.13,
      "rotation_period_hours": 9.925,
      "semi_major_axis_au": 5.203,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#D4A574",
        "opacity": 0.3,
        "rayleigh_coefficients": [3.8e-6, 9.0e-6, 15.5e-6],
        "mie_coefficient": 15e-6,
        "mie_g": 0.80,
        "atmosphere_height_ratio": 0.014,
        "scale_height_rayleigh": 27000,
        "scale_height_mie": 12000
      },
      "ring": {
        "has_ring": true,
        "visible": false,
        "note": "광학 깊이 ~10^-6, 시뮬레이션에서 생략 권장"
      },
      "textures": {
        "diffuse": "2k_jupiter.jpg"
      }
    },
    "saturn": {
      "radius_km": 60268,
      "color_primary": "#E8D088",
      "color_secondary": "#C4A050",
      "axial_tilt_deg": 26.73,
      "rotation_period_hours": 10.656,
      "semi_major_axis_au": 9.537,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#EAD9A0",
        "opacity": 0.25,
        "rayleigh_coefficients": [4.0e-6, 9.5e-6, 16.0e-6],
        "mie_coefficient": 10e-6,
        "mie_g": 0.78,
        "atmosphere_height_ratio": 0.017,
        "scale_height_rayleigh": 59500,
        "scale_height_mie": 25000
      },
      "ring": {
        "has_ring": true,
        "visible": true,
        "inner_radius_ratio": 1.24,
        "outer_radius_ratio": 2.27,
        "texture": "2k_saturn_ring_alpha.png",
        "essential_components": ["C", "B", "cassini_division", "A"]
      },
      "textures": {
        "diffuse": "2k_saturn.jpg",
        "ring": "2k_saturn_ring_alpha.png"
      }
    },
    "uranus": {
      "radius_km": 25559,
      "color_primary": "#73C2C6",
      "color_secondary": "#5DA4A8",
      "axial_tilt_deg": 97.77,
      "rotation_period_hours": -17.24,
      "semi_major_axis_au": 19.191,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#AFEEEE",
        "opacity": 0.4,
        "rayleigh_coefficients": [5.0e-6, 12.0e-6, 24.0e-6],
        "mie_coefficient": 5e-6,
        "mie_g": 0.75,
        "atmosphere_height_ratio": 0.020,
        "scale_height_rayleigh": 27700,
        "scale_height_mie": 15000
      },
      "ring": {
        "has_ring": true,
        "visible": false,
        "note": "매우 어둡고 좁은 고리, 엡실론 고리만 간략 표현 가능"
      },
      "textures": {
        "diffuse": "2k_uranus.jpg"
      }
    },
    "neptune": {
      "radius_km": 24764,
      "color_primary": "#3B5FC0",
      "color_secondary": "#5070D0",
      "axial_tilt_deg": 28.32,
      "rotation_period_hours": 16.11,
      "semi_major_axis_au": 30.069,
      "atmosphere": {
        "has_atmosphere": true,
        "color": "#4169E1",
        "opacity": 0.4,
        "rayleigh_coefficients": [6.0e-6, 14.0e-6, 26.0e-6],
        "mie_coefficient": 8e-6,
        "mie_g": 0.77,
        "atmosphere_height_ratio": 0.020,
        "scale_height_rayleigh": 19700,
        "scale_height_mie": 10000
      },
      "ring": {
        "has_ring": true,
        "visible": false,
        "note": "매우 희미, 불완전한 호(arc) 구조"
      },
      "textures": {
        "diffuse": "2k_neptune.jpg"
      }
    }
  }
}
```

---

## 8. 필요한 시각 효과 목록 (tech-researcher 참조용)

렌더링에 필요한 주요 시각 효과:

1. **대기 산란 (Atmospheric Scattering)** - Rayleigh + Mie 모델, 7개 행성 (금성~해왕성)
2. **토성 고리 렌더링** - 방사상 텍스처, 알파 블렌딩, 그림자 투사/수신
3. **지구 구름층** - 반투명 구 위 회전하는 구름 텍스처
4. **지구 야간 도시 불빛** - 태양 반대편에 emission 텍스처
5. **태양 표면 애니메이션** - Procedural noise 기반 텍스처
6. **태양 코로나/블룸** - HDR 블룸 포스트 프로세싱
7. **태양 렌즈 플레어** - 카메라 방향 기반 플레어 효과
8. **스카이박스 별 배경** - 큐브맵 또는 등장방형 텍스처
9. **Bump/Normal 매핑** - 지구형 행성 표면 디테일
10. **Specular 매핑** - 지구 바다 반사
11. **행성 그림자** - 자체 그림자 + 고리 그림자
12. **동적 스케일링** - 줌 레벨에 따른 행성/궤도 크기 조정

---

## 9. 출처 및 참고자료

- [Solar System Scope Textures](https://www.solarsystemscope.com/textures/) - CC BY 4.0
- [JHT Planetary Pixel Emporium](https://planetpixelemporium.com/)
- [NASA Visible Earth - Blue Marble](https://visibleearth.nasa.gov/collection/1484/blue-marble)
- [NASA SVS Blue Marble](https://svs.gsfc.nasa.gov/2915)
- [glsl-atmosphere (GitHub)](https://github.com/wwwtyro/glsl-atmosphere) - 대기 산란 셰이더
- [GPU Gems 2 Ch.16 - Atmospheric Scattering](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering)
- [Alan Zucconi - Atmospheric Scattering](https://www.alanzucconi.com/2017/10/10/atmospheric-scattering-1/)
- [Rings of Saturn - Wikipedia](https://en.wikipedia.org/wiki/Rings_of_Saturn)
- [Rings of Jupiter - Wikipedia](https://en.wikipedia.org/wiki/Rings_of_Jupiter)
- [Rings of Neptune - Wikipedia](https://en.wikipedia.org/wiki/Rings_of_Neptune)
- [Rings of Uranus - Wikipedia](https://en.wikipedia.org/wiki/Rings_of_Uranus)
- [Spacescape - 스카이박스 생성 도구](http://alexcpeterson.com/spacescape/)
- [ESA Gaia Data Release 3](https://www.esa.int/Science_Exploration/Space_Science/Gaia) - CC BY-SA 3.0 IGO
- [Color Temperature to RGB](https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html)
