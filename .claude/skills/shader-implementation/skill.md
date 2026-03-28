---
name: shader-implementation
description: "태양계 시뮬레이션의 GLSL 셰이더(대기 산란, 고리, 코로나, 야간면)와 포스트프로세싱(블룸)을 구현하는 스킬. 대기 셰이더, Rayleigh 산란, 고리 렌더링, 코로나 효과, 블룸, GLSL 구현 시 반드시 이 스킬을 사용할 것."
---

# Shader Implementation — GLSL 셰이더 + 포스트프로세싱

대기 산란, 고리, 태양 코로나, 야간면 셰이더와 블룸 효과를 구현한다.

## 데이터 소스
- 대기 파라미터: `_workspace/02_planet_visual_data.md` 섹션 3의 JSON
- 고리 데이터: `_workspace/02_planet_visual_data.md` 섹션 4의 JSON
- 기술 레퍼런스: `_workspace/02_webgl_tech_research.md` 섹션 3.2~3.4

## 대기 산란 셰이더 (Atmosphere.js + atmosphere.glsl)

glsl-atmosphere 접근법 기반. 행성별 파라미터를 uniform으로 받는다.

### Uniforms
```javascript
uniforms: {
  sunPosition: { value: new THREE.Vector3() },
  sunIntensity: { value: 22.0 },
  planetRadius: { value: 1.0 },
  atmosphereRadius: { value: 1.02 },
  rayleighCoefficients: { value: new THREE.Vector3(5.5e-6, 13.0e-6, 22.4e-6) },
  mieCoefficient: { value: 21e-6 },
  rayleighScaleHeight: { value: 8000.0 },
  mieScaleHeight: { value: 1200.0 },
  mieG: { value: 0.758 }
}
```

### 구현 전략
1. Atmosphere 클래스: 행성보다 약간 큰 구체, BackSide 렌더링
2. Fragment shader에서 레이마칭으로 대기 산란 계산
3. 행성별 파라미터는 `_workspace/02_planet_visual_data.md`의 atmosphere_parameters 사용
4. 레이마칭 스텝: 데스크톱 16, 모바일 8 (uniform으로 조절)
5. additive blending (THREE.AdditiveBlending)

## 고리 셰이더 (Ring.js + ring.glsl)

### Geometry
- RingGeometry(innerRadius, outerRadius, 128)
- UV를 방사상(radial) 매핑으로 재계산

### Uniforms
```javascript
uniforms: {
  ringTexture: { value: ringColorTexture },
  ringAlpha: { value: ringAlphaTexture },
  sunPosition: { value: new THREE.Vector3() },
  planetPosition: { value: new THREE.Vector3() },
  planetRadius: { value: 1.0 }
}
```

### 그림자 계산
- Fragment shader에서 태양-프래그먼트 광선과 행성 구 교차 테스트
- 교차 시 그림자 (darken factor 적용)
- DoubleSide + transparent: true

## 태양 코로나 (corona.glsl)

### 접근법
1. 태양 메시 주위에 약간 큰 구체 (BackSide)
2. 프레넬 효과로 가장자리 글로우
3. fbm 노이즈로 코로나 형태 변형 (시간 기반 애니메이션)

```glsl
float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
vec3 coronaColor = mix(vec3(1.0, 0.9, 0.7), vec3(1.0, 0.5, 0.2), fresnel);
```

## 야간면 셰이더 (nightside.glsl)

지구 전용. 주간면(diffuse)과 야간면(emission) 블렌딩:

```glsl
float NdotL = dot(normal, lightDir);
float dayFactor = smoothstep(-0.1, 0.2, NdotL);
vec3 dayColor = texture2D(dayMap, vUv).rgb;
vec3 nightColor = texture2D(nightMap, vUv).rgb;
gl_FragColor = vec4(mix(nightColor, dayColor, dayFactor), 1.0);
```

## 포스트프로세싱 (PostProcessing.js)

### 선택적 블룸 (태양만)
```javascript
import { EffectComposer, RenderPass, BloomEffect, EffectPass } from 'postprocessing';

// 방법: 블룸 레이어 시스템
// 태양에 layers.enable(1) 설정
// 블룸 전용 렌더 패스에서 layer 1만 렌더링
```

- BloomEffect: strength 1.5, radius 0.4, threshold 0.85
- 태양만 블룸 적용, 나머지 천체는 제외

## 품질 기준
- 지구에 파란 대기 글로우가 보임
- 토성 고리가 반투명하고 행성 그림자가 표시
- 태양 주위에 코로나 글로우 + 블룸
- 지구 야간면에 도시 불빛이 보임
- 모바일에서 30fps 이상 유지
