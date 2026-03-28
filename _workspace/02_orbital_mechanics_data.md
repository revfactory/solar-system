# 02. 궤도 역학 데이터 (Orbital Mechanics Data)

> **수집일**: 2026-03-28
> **에포크**: J2000.0 (2000-Jan-1.5 TT, JD 2451545.0)
> **주요 출처**: NASA JPL Solar System Dynamics (DE440/DE441), IAU WGCCRE 2015

---

## 1. 천문 상수 (Astronomical Constants)

```json
{
  "constants": {
    "G": {
      "value": 6.67430e-11,
      "uncertainty": 1.5e-15,
      "unit": "m³/(kg·s²)",
      "source": "JPL DE440"
    },
    "c": {
      "value": 299792458,
      "unit": "m/s",
      "source": "IAU 2012"
    },
    "AU": {
      "value": 149597870700,
      "unit": "m",
      "value_km": 149597870.7,
      "source": "IAU 2012 exact definition"
    },
    "light_time_per_AU": {
      "value": 499.004783836,
      "unit": "s"
    },
    "GM_sun": {
      "value": 1.32712440041279419e+20,
      "unit": "m³/s²",
      "value_km3_s2": 1.32712440041279419e+11,
      "source": "JPL DE440"
    },
    "obliquity_J2000": {
      "value": 23.439291111,
      "unit": "degrees",
      "comment": "J2000.0 기준 황도경사각"
    }
  }
}
```

---

## 2. 행성 케플러 궤도 요소 (Keplerian Orbital Elements)

에포크: J2000.0, 유효 범위: 1800 AD ~ 2050 AD
출처: [NASA JPL — Approximate Positions of the Planets](https://ssd.jpl.nasa.gov/planets/approx_pos.html) (Standish & Williams)

**파라미터 설명**:
- `a`: 반장축 (AU)
- `e`: 이심률 (무차원)
- `I`: 궤도 경사 (deg, J2000 황도면 기준)
- `L`: 평균 경도 (deg)
- `omega_bar`: 근일점 경도 (deg) = Ω + ω
- `Omega`: 승교점 경도 (deg)
- `_rate` 접미사: 세기당 변화율 (단위/cy, cy = 줄리안 세기 = 36525일)

```json
{
  "epoch": "J2000.0",
  "valid_range": "1800 AD - 2050 AD",
  "source": "NASA JPL Standish & Williams, ssd.jpl.nasa.gov/planets/approx_pos.html",
  "planets": {
    "mercury": {
      "a":           0.38709927,    "a_rate":           0.00000037,
      "e":           0.20563593,    "e_rate":           0.00001906,
      "I":           7.00497902,    "I_rate":          -0.00594749,
      "L":         252.25032350,    "L_rate":       149472.67411175,
      "omega_bar":  77.45779628,    "omega_bar_rate":   0.16047689,
      "Omega":      48.33076593,    "Omega_rate":      -0.12534081
    },
    "venus": {
      "a":           0.72333566,    "a_rate":           0.00000390,
      "e":           0.00677672,    "e_rate":          -0.00004107,
      "I":           3.39467605,    "I_rate":          -0.00078890,
      "L":         181.97909950,    "L_rate":        58517.81538729,
      "omega_bar": 131.60246718,    "omega_bar_rate":   0.00268329,
      "Omega":      76.67984255,    "Omega_rate":      -0.27769418
    },
    "earth": {
      "comment": "Earth-Moon barycenter",
      "a":           1.00000261,    "a_rate":           0.00000562,
      "e":           0.01671123,    "e_rate":          -0.00004392,
      "I":          -0.00001531,    "I_rate":          -0.01294668,
      "L":         100.46457166,    "L_rate":        35999.37244981,
      "omega_bar": 102.93768193,    "omega_bar_rate":   0.32327364,
      "Omega":       0.0,          "Omega_rate":        0.0
    },
    "mars": {
      "a":           1.52371034,    "a_rate":           0.00001847,
      "e":           0.09339410,    "e_rate":           0.00007882,
      "I":           1.84969142,    "I_rate":          -0.00813131,
      "L":          -4.55343205,    "L_rate":        19140.30268499,
      "omega_bar": -23.94362959,    "omega_bar_rate":   0.44441088,
      "Omega":      49.55953891,    "Omega_rate":      -0.29257343
    },
    "jupiter": {
      "a":           5.20288700,    "a_rate":          -0.00011607,
      "e":           0.04838624,    "e_rate":          -0.00013253,
      "I":           1.30439695,    "I_rate":          -0.00183714,
      "L":          34.39644051,    "L_rate":         3034.74612775,
      "omega_bar":  14.72847983,    "omega_bar_rate":   0.21252668,
      "Omega":     100.47390909,    "Omega_rate":       0.20469106
    },
    "saturn": {
      "a":           9.53667594,    "a_rate":          -0.00125060,
      "e":           0.05386179,    "e_rate":          -0.00050991,
      "I":           2.48599187,    "I_rate":           0.00193609,
      "L":          49.95424423,    "L_rate":         1222.49362201,
      "omega_bar":  92.59887831,    "omega_bar_rate":  -0.41897216,
      "Omega":     113.66242448,    "Omega_rate":      -0.28867794
    },
    "uranus": {
      "a":          19.18916464,    "a_rate":          -0.00196176,
      "e":           0.04725744,    "e_rate":          -0.00004397,
      "I":           0.77263783,    "I_rate":          -0.00242939,
      "L":         313.23810451,    "L_rate":          428.48202785,
      "omega_bar": 170.95427630,    "omega_bar_rate":   0.40805281,
      "Omega":      74.01692503,    "Omega_rate":       0.04240589
    },
    "neptune": {
      "a":          30.06992276,    "a_rate":           0.00026291,
      "e":           0.00859048,    "e_rate":           0.00005105,
      "I":           1.77004347,    "I_rate":           0.00035372,
      "L":         -55.12002969,    "L_rate":          218.45945325,
      "omega_bar":  44.96476227,    "omega_bar_rate":  -0.32241464,
      "Omega":     131.78422574,    "Omega_rate":      -0.00508664
    }
  }
}
```

### 외행성 보정 항 (3000 BC ~ 3000 AD 확장 범위용)

평균 근점 이각 보정: `M = L - ω̄ + b·T² + c·cos(f·T) + s·sin(f·T)`

```json
{
  "outer_planet_corrections": {
    "comment": "For extended range 3000 BC - 3000 AD. T in Julian centuries from J2000.0",
    "jupiter":  { "b": -0.00012452, "c":  0.06064060, "s": -0.35635438, "f": 38.35125000 },
    "saturn":   { "b":  0.00025899, "c": -0.13434469, "s":  0.87320147, "f": 38.35125000 },
    "uranus":   { "b":  0.00058331, "c": -0.97731848, "s":  0.17689245, "f":  7.67025000 },
    "neptune":  { "b": -0.00041348, "c":  0.68346318, "s": -0.10162547, "f":  7.67025000 }
  }
}
```

---

## 3. 행성 중력 파라미터 (Gravitational Parameters)

출처: [NASA JPL Astrodynamic Parameters — DE440](https://ssd.jpl.nasa.gov/astro_par.html)

```json
{
  "gravitational_parameters": {
    "source": "JPL DE440",
    "sun": {
      "GM_km3_s2": 132712440041.279419,
      "GM_m3_s2": 1.32712440041279419e+20
    },
    "mercury": {
      "GM_km3_s2": 22031.868551,
      "GM_m3_s2": 2.2031868551e+13
    },
    "venus": {
      "GM_km3_s2": 324858.592000,
      "GM_m3_s2": 3.24858592e+14
    },
    "earth": {
      "GM_km3_s2": 398600.435507,
      "GM_m3_s2": 3.98600435507e+14
    },
    "moon": {
      "GM_km3_s2": 4902.800118,
      "GM_m3_s2": 4.902800118e+12
    },
    "mars_system": {
      "GM_km3_s2": 42828.375816,
      "GM_m3_s2": 4.2828375816e+13
    },
    "jupiter_system": {
      "GM_km3_s2": 126712764.100000,
      "GM_m3_s2": 1.267127641e+17
    },
    "saturn_system": {
      "GM_km3_s2": 37940584.841800,
      "GM_m3_s2": 3.79405848418e+16
    },
    "uranus_system": {
      "GM_km3_s2": 5794556.400000,
      "GM_m3_s2": 5.7945564e+15
    },
    "neptune_system": {
      "GM_km3_s2": 6836527.100580,
      "GM_m3_s2": 6.83652710058e+15
    }
  }
}
```

---

## 4. 행성 물리 파라미터 (Physical Parameters)

출처: [NASA JPL Planetary Physical Parameters](https://ssd.jpl.nasa.gov/planets/phys_par.html)

```json
{
  "physical_parameters": {
    "source": "JPL Solar System Dynamics",
    "planets": {
      "mercury": {
        "equatorial_radius_km": 2440.53,
        "mean_radius_km": 2439.4,
        "mass_1e24_kg": 0.3301,
        "bulk_density_g_cm3": 5.4289,
        "geometric_albedo": 0.106
      },
      "venus": {
        "equatorial_radius_km": 6051.8,
        "mean_radius_km": 6051.8,
        "mass_1e24_kg": 4.8673,
        "bulk_density_g_cm3": 5.243,
        "geometric_albedo": 0.65
      },
      "earth": {
        "equatorial_radius_km": 6378.14,
        "mean_radius_km": 6371.01,
        "mass_1e24_kg": 5.9722,
        "bulk_density_g_cm3": 5.5134,
        "geometric_albedo": 0.367
      },
      "mars": {
        "equatorial_radius_km": 3396.19,
        "mean_radius_km": 3389.50,
        "mass_1e24_kg": 0.6417,
        "bulk_density_g_cm3": 3.9340,
        "geometric_albedo": 0.150
      },
      "jupiter": {
        "equatorial_radius_km": 71492,
        "mean_radius_km": 69911,
        "mass_1e24_kg": 1898.13,
        "bulk_density_g_cm3": 1.3262,
        "geometric_albedo": 0.52
      },
      "saturn": {
        "equatorial_radius_km": 60268,
        "mean_radius_km": 58232,
        "mass_1e24_kg": 568.32,
        "bulk_density_g_cm3": 0.6871,
        "geometric_albedo": 0.47
      },
      "uranus": {
        "equatorial_radius_km": 25559,
        "mean_radius_km": 25362,
        "mass_1e24_kg": 86.81,
        "bulk_density_g_cm3": 1.270,
        "geometric_albedo": 0.51
      },
      "neptune": {
        "equatorial_radius_km": 24764,
        "mean_radius_km": 24622,
        "mass_1e24_kg": 102.41,
        "bulk_density_g_cm3": 1.638,
        "geometric_albedo": 0.41
      }
    }
  }
}
```

---

## 5. 자전 파라미터 (Rotation Parameters)

출처: IAU WGCCRE 2015 Report (Archinal et al. 2018, Celestial Mechanics and Dynamical Astronomy, 130:22), NASA JPL

### 5.1 자전 주기 및 자전축 경사

```json
{
  "rotation_parameters": {
    "source": "IAU WGCCRE 2015, NASA Planetary Fact Sheet",
    "planets": {
      "mercury": {
        "sidereal_rotation_period_hours": 1407.6,
        "sidereal_rotation_period_days": 58.646,
        "axial_tilt_deg": 0.034,
        "retrograde": false
      },
      "venus": {
        "sidereal_rotation_period_hours": 5832.6,
        "sidereal_rotation_period_days": -243.025,
        "axial_tilt_deg": 177.36,
        "retrograde": true
      },
      "earth": {
        "sidereal_rotation_period_hours": 23.9345,
        "sidereal_rotation_period_days": 0.99727,
        "axial_tilt_deg": 23.4393,
        "retrograde": false
      },
      "mars": {
        "sidereal_rotation_period_hours": 24.6229,
        "sidereal_rotation_period_days": 1.02596,
        "axial_tilt_deg": 25.19,
        "retrograde": false
      },
      "jupiter": {
        "sidereal_rotation_period_hours": 9.9250,
        "sidereal_rotation_period_days": 0.41354,
        "axial_tilt_deg": 3.13,
        "retrograde": false
      },
      "saturn": {
        "sidereal_rotation_period_hours": 10.656,
        "sidereal_rotation_period_days": 0.4440,
        "axial_tilt_deg": 26.73,
        "retrograde": false
      },
      "uranus": {
        "sidereal_rotation_period_hours": -17.24,
        "sidereal_rotation_period_days": -0.71833,
        "axial_tilt_deg": 97.77,
        "retrograde": true
      },
      "neptune": {
        "sidereal_rotation_period_hours": 16.11,
        "sidereal_rotation_period_days": 0.67125,
        "axial_tilt_deg": 28.32,
        "retrograde": false
      }
    }
  }
}
```

### 5.2 북극 방향 (J2000.0 적도 좌표계)

```json
{
  "north_pole_orientation": {
    "source": "IAU WGCCRE 2015 (Archinal et al. 2018)",
    "epoch": "J2000.0",
    "comment": "α₀ = 북극 적경(RA), δ₀ = 북극 적위(DEC), 단위: degrees",
    "planets": {
      "mercury":  { "alpha0": 281.0097, "delta0":  61.4143 },
      "venus":    { "alpha0": 272.76,   "delta0":  67.16   },
      "earth":    { "alpha0":   0.00,   "delta0":  90.00   },
      "mars":     { "alpha0": 317.68143,"delta0":  52.88650 },
      "jupiter":  { "alpha0": 268.056595,"delta0": 64.495303 },
      "saturn":   { "alpha0":  40.589,  "delta0":  83.537  },
      "uranus":   { "alpha0": 257.311,  "delta0": -15.175  },
      "neptune":  { "alpha0": 299.36,   "delta0":  43.46   }
    }
  }
}
```

---

## 6. 주요 위성 궤도 데이터 (Major Satellite Orbital Elements)

출처: [JPL Planetary Satellite Mean Elements](https://ssd.jpl.nasa.gov/sats/elem/), [JPL Satellite Physical Parameters](https://ssd.jpl.nasa.gov/sats/phys_par/)

```json
{
  "satellites": {
    "epoch": "J2000.0",
    "source": "JPL Solar System Dynamics",
    "earth": {
      "moon": {
        "semi_major_axis_km": 384400,
        "eccentricity": 0.0554,
        "inclination_deg": 5.16,
        "orbital_period_days": 27.322,
        "GM_km3_s2": 4902.800,
        "radius_km": 1737.4,
        "comment": "경사는 황도면 기준"
      }
    },
    "mars": {
      "phobos": {
        "semi_major_axis_km": 9375,
        "eccentricity": 0.015,
        "inclination_deg": 1.1,
        "orbital_period_days": 0.3187,
        "GM_km3_s2": 0.0007087,
        "radius_km": 11.08,
        "comment": "비구형, 평균 반지름"
      },
      "deimos": {
        "semi_major_axis_km": 23457,
        "eccentricity": 0.000,
        "inclination_deg": 1.8,
        "orbital_period_days": 1.2625,
        "GM_km3_s2": 0.0000962,
        "radius_km": 6.2,
        "comment": "비구형, 평균 반지름"
      }
    },
    "jupiter": {
      "io": {
        "semi_major_axis_km": 421800,
        "eccentricity": 0.004,
        "inclination_deg": 0.0,
        "orbital_period_days": 1.762732,
        "GM_km3_s2": 5959.91547,
        "radius_km": 1821.49
      },
      "europa": {
        "semi_major_axis_km": 671100,
        "eccentricity": 0.009,
        "inclination_deg": 0.5,
        "orbital_period_days": 3.525463,
        "GM_km3_s2": 3202.71210,
        "radius_km": 1560.80
      },
      "ganymede": {
        "semi_major_axis_km": 1070400,
        "eccentricity": 0.001,
        "inclination_deg": 0.2,
        "orbital_period_days": 7.155588,
        "GM_km3_s2": 9887.83275,
        "radius_km": 2631.20
      },
      "callisto": {
        "semi_major_axis_km": 1882700,
        "eccentricity": 0.007,
        "inclination_deg": 0.3,
        "orbital_period_days": 16.690440,
        "GM_km3_s2": 7179.28340,
        "radius_km": 2410.30
      }
    },
    "saturn": {
      "enceladus": {
        "semi_major_axis_km": 238400,
        "eccentricity": 0.005,
        "inclination_deg": 0.0,
        "orbital_period_days": 1.370218,
        "GM_km3_s2": 7.21037,
        "radius_km": 252.10
      },
      "titan": {
        "semi_major_axis_km": 1221900,
        "eccentricity": 0.029,
        "inclination_deg": 0.3,
        "orbital_period_days": 15.945448,
        "GM_km3_s2": 8978.13710,
        "radius_km": 2574.76
      }
    },
    "uranus": {
      "miranda": {
        "semi_major_axis_km": 129846,
        "eccentricity": 0.001,
        "inclination_deg": 4.4,
        "orbital_period_days": 1.413479,
        "GM_km3_s2": 4.3,
        "radius_km": 235.8
      },
      "ariel": {
        "semi_major_axis_km": 190929,
        "eccentricity": 0.001,
        "inclination_deg": 0.0,
        "orbital_period_days": 2.520379,
        "GM_km3_s2": 83.5,
        "radius_km": 578.9
      },
      "umbriel": {
        "semi_major_axis_km": 265986,
        "eccentricity": 0.004,
        "inclination_deg": 0.1,
        "orbital_period_days": 4.144177,
        "GM_km3_s2": 85.1,
        "radius_km": 584.7
      },
      "titania": {
        "semi_major_axis_km": 436298,
        "eccentricity": 0.002,
        "inclination_deg": 0.1,
        "orbital_period_days": 8.705869,
        "GM_km3_s2": 226.9,
        "radius_km": 788.9
      },
      "oberon": {
        "semi_major_axis_km": 583511,
        "eccentricity": 0.002,
        "inclination_deg": 0.1,
        "orbital_period_days": 13.463237,
        "GM_km3_s2": 205.3,
        "radius_km": 761.4
      }
    },
    "neptune": {
      "triton": {
        "semi_major_axis_km": 354800,
        "eccentricity": 0.000,
        "inclination_deg": 157.3,
        "orbital_period_days": 5.876994,
        "GM_km3_s2": 1428.49546,
        "radius_km": 1352.60,
        "comment": "역행 궤도 (inclination > 90°)"
      }
    }
  }
}
```

---

## 7. 공전 주기 요약 (Orbital Periods)

시뮬레이션 시간 스케일 설정 참고용:

```json
{
  "orbital_periods": {
    "unit": "earth_days",
    "mercury":    87.969,
    "venus":     224.701,
    "earth":     365.256,
    "mars":      686.980,
    "jupiter":  4332.589,
    "saturn":  10759.22,
    "uranus":  30688.5,
    "neptune": 60182.0
  }
}
```

---

## 8. 궤도 역학 구현 가이드 (Implementation Guide)

### 8.1 시간 변환

```javascript
// UTC Date → Julian Date
function dateToJD(year, month, day) {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) +
         Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Julian Date → J2000.0 세기 (T)
function jdToT(jd) {
  return (jd - 2451545.0) / 36525.0;
}

// JavaScript Date → T
function dateToT(date) {
  const jd = dateToJD(date.getUTCFullYear(), date.getUTCMonth() + 1,
    date.getUTCDate() + date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 + date.getUTCSeconds() / 86400);
  return jdToT(jd);
}
```

### 8.2 궤도 요소 계산 (현재 시각)

```javascript
// T = J2000.0 기준 줄리안 세기
function computeElements(planet, T) {
  const el = PLANET_DATA[planet];
  return {
    a:         el.a         + el.a_rate         * T,  // AU
    e:         el.e         + el.e_rate         * T,
    I:         el.I         + el.I_rate         * T,  // deg
    L:         el.L         + el.L_rate         * T,  // deg
    omega_bar: el.omega_bar + el.omega_bar_rate * T,  // deg
    Omega:     el.Omega     + el.Omega_rate     * T   // deg
  };
}

// 평균 근점 이각 계산
function meanAnomaly(elements) {
  let M = elements.L - elements.omega_bar;
  // -180° ~ 180° 범위로 정규화
  M = ((M % 360) + 540) % 360 - 180;
  return M;
}

// 근일점 편각 계산
function argumentOfPerihelion(elements) {
  return elements.omega_bar - elements.Omega;
}
```

### 8.3 케플러 방정식 풀이 (Newton-Raphson)

`M = E - e·sin(E)` 에서 E(이심 근점 이각)를 구한다.

```javascript
/**
 * 케플러 방정식 풀이: M = E - e*sin(E)
 * @param {number} M - 평균 근점 이각 (radians)
 * @param {number} e - 이심률
 * @param {number} tol - 수렴 허용 오차 (기본 1e-12)
 * @param {number} maxIter - 최대 반복 횟수 (기본 50)
 * @returns {number} E - 이심 근점 이각 (radians)
 */
function solveKepler(M, e, tol = 1e-12, maxIter = 50) {
  // 초기 추정값: M + e*sin(M) (낮은 이심률에서 빠른 수렴)
  let E = M + e * Math.sin(M);

  for (let i = 0; i < maxIter; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tol) return E;
  }

  // 수렴 실패 시 (매우 높은 이심률에서 발생 가능)
  console.warn('Kepler equation did not converge for M=', M, 'e=', e);
  return E;
}
```

### 8.4 궤도 요소 → 3D 직교 좌표 변환

황도 좌표계(ecliptic) 기준으로 변환한다.

```javascript
const DEG2RAD = Math.PI / 180;
const AU_TO_KM = 149597870.7;

/**
 * 궤도 요소 → 황도 직교 좌표 (heliocentric ecliptic)
 * @param {Object} elements - { a, e, I, omega_bar, Omega, L } (a: AU, angles: deg)
 * @returns {Object} { x, y, z } in AU
 */
function orbitalElementsToPosition(elements) {
  const { a, e, I, omega_bar, Omega, L } = elements;

  // 근일점 편각
  const omega = omega_bar - Omega;

  // 평균 근점 이각 (degrees → radians)
  let M_deg = L - omega_bar;
  M_deg = ((M_deg % 360) + 540) % 360 - 180;
  const M = M_deg * DEG2RAD;

  // 케플러 방정식 풀기
  const E = solveKepler(M, e);

  // 궤도면 내 좌표
  const xPrime = a * (Math.cos(E) - e);
  const yPrime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // 각도 → 라디안
  const omegaRad = omega * DEG2RAD;
  const OmegaRad = Omega * DEG2RAD;
  const IRad = I * DEG2RAD;

  // 3D 회전 (궤도면 → 황도면)
  const cosO = Math.cos(OmegaRad), sinO = Math.sin(OmegaRad);
  const cosI = Math.cos(IRad),     sinI = Math.sin(IRad);
  const cosw = Math.cos(omegaRad), sinw = Math.sin(omegaRad);

  const x = (cosO * cosw - sinO * sinw * cosI) * xPrime +
            (-cosO * sinw - sinO * cosw * cosI) * yPrime;

  const y = (sinO * cosw + cosO * sinw * cosI) * xPrime +
            (-sinO * sinw + cosO * cosw * cosI) * yPrime;

  const z = (sinw * sinI) * xPrime +
            (cosw * sinI) * yPrime;

  return { x, y, z };
}
```

### 8.5 황도 좌표 → 적도 좌표 변환 (선택)

```javascript
/**
 * 황도 좌표 → J2000 적도 좌표
 * @param {Object} ecliptic - { x, y, z } in AU (heliocentric ecliptic)
 * @returns {Object} { x, y, z } in AU (heliocentric equatorial)
 */
function eclipticToEquatorial(ecliptic) {
  const obliquity = 23.43928 * DEG2RAD; // J2000.0 황도 경사각
  const cosEps = Math.cos(obliquity);
  const sinEps = Math.sin(obliquity);

  return {
    x: ecliptic.x,
    y: ecliptic.y * cosEps - ecliptic.z * sinEps,
    z: ecliptic.y * sinEps + ecliptic.z * cosEps
  };
}
```

### 8.6 외행성 보정 적용 (3000 BC ~ 3000 AD)

```javascript
/**
 * 외행성(목성~해왕성)의 평균 근점 이각 보정
 * Table 2b corrections for outer planets
 */
function correctedMeanAnomaly(planet, L, omega_bar, T) {
  let M = L - omega_bar;

  const corrections = OUTER_PLANET_CORRECTIONS[planet];
  if (corrections) {
    M += corrections.b * T * T +
         corrections.c * Math.cos(corrections.f * T * DEG2RAD) +
         corrections.s * Math.sin(corrections.f * T * DEG2RAD);
  }

  return ((M % 360) + 540) % 360 - 180;
}
```

---

## 9. 단위 변환 참고

```json
{
  "unit_conversions": {
    "AU_to_m": 149597870700,
    "AU_to_km": 149597870.7,
    "day_to_seconds": 86400,
    "julian_year_days": 365.25,
    "julian_century_days": 36525,
    "deg_to_rad": 0.017453292519943295,
    "rad_to_deg": 57.29577951308232,
    "earth_radius_km": 6378.14,
    "solar_radius_km": 695700,
    "solar_mass_kg": 1.98892e+30
  }
}
```

---

## 출처 (Sources)

1. **JPL Approximate Positions of the Planets** — https://ssd.jpl.nasa.gov/planets/approx_pos.html
   Standish, E.M. & Williams, J.G. — Keplerian Elements for Approximate Positions (1800-2050 AD, 3000 BC-3000 AD)
2. **JPL Astrodynamic Parameters (DE440)** — https://ssd.jpl.nasa.gov/astro_par.html
   GM values, fundamental constants
3. **JPL Planetary Physical Parameters** — https://ssd.jpl.nasa.gov/planets/phys_par.html
   Mass, radius, density, rotation period
4. **JPL Planetary Satellite Mean Elements** — https://ssd.jpl.nasa.gov/sats/elem/
   Satellite orbital elements
5. **JPL Planetary Satellite Physical Parameters** — https://ssd.jpl.nasa.gov/sats/phys_par/
   Satellite GM and radius values
6. **IAU WGCCRE 2015** — Archinal, B.A. et al. (2018), Celestial Mechanics and Dynamical Astronomy, 130:22
   North pole orientation, prime meridian definitions
