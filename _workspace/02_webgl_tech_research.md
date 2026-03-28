# WebGL 기술 스택 조사 보고서

> 태양계 3D 시뮬레이션 웹사이트 구현을 위한 기술 스택 비교 분석
> 작성일: 2026-03-28

---

## 1. 3D 렌더링 프레임워크 비교

### 1.1 종합 비교표

| 항목 | Three.js | Babylon.js | React Three Fiber |
|------|---------|-----------|-------------------|
| **최신 버전** | r175+ (npm 0.183.x) | 8.x | 8.x (Three.js 래퍼) |
| **번들 크기** (gzipped) | ~168 KB | ~1.4 MB | ~168 KB + React |
| **npm 주간 다운로드** | 5,000,000+ | ~13,000 | ~1,500,000 |
| **GitHub Stars** | 110,497 | 25,003 | 28,000+ |
| **Stack Overflow** | 30,000+ 질문 | 5,000+ 질문 | 5,000+ 질문 |
| **Discord** | 25,000+ | 10,000+ | pmndrs 생태계 공유 |
| **학습 곡선** | 중간 (명령형 API) | 중간-높음 (풍부한 내장 기능) | 낮음-중간 (React 경험 필요) |
| **태양계 시뮬 레퍼런스** | 매우 많음 (10+) | 적음 (1~2) | 적음 (간접 활용) |
| **성능 (대규모 씬)** | 우수 (파티클/커스텀 셰이더 강점) | 우수 (특정 WebGPU 태스크 강점) | Three.js와 동일 |
| **WebGPU 지원** | r171부터 프로덕션 (zero-config) | v5.0부터, v8.0 네이티브 WGSL | Three.js 의존 |
| **모바일 지원** | 좋음 | 좋음 | 좋음 |
| **셰이더 커스터마이징** | 매우 유연 (ShaderMaterial, RawShaderMaterial) | 유연 (CustomMaterial, Effect) | Three.js와 동일 |
| **내장 물리 엔진** | 없음 (외부 라이브러리) | 있음 (Ammo.js, Havok 등) | 없음 (rapier, cannon) |
| **XR 지원** | WebXR API | 가장 완성도 높은 WebXR | react-xr 패키지 |

### 1.2 프레임워크별 상세 분석

#### Three.js (추천)

**장점:**
- 가장 큰 커뮤니티와 생태계 (npm 주간 500만+ 다운로드)
- 태양계 시뮬레이션 레퍼런스가 압도적으로 많음 (10+ 오픈소스 프로젝트)
- 번들 크기가 작아 모바일에서도 빠른 로딩
- 셰이더 커스터마이징이 매우 자유로움 (대기 산란, 코로나 등에 필수)
- WebGPU 프로덕션 레디 (r171, 2025년 9월~)
- Safari 26 (2025년 9월)부터 모든 주요 브라우저에서 WebGPU 지원

**단점:**
- 물리 엔진, 오디오 등 미내장 (이 프로젝트에서는 불필요)
- 저수준 API이므로 보일러플레이트 코드 많음

#### Babylon.js

**장점:**
- 풍부한 내장 기능 (물리, 오디오, XR)
- Inspector/디버거 내장
- Microsoft 지원

**단점:**
- 번들 크기 ~1.4MB (Three.js의 8배)
- 태양계 시뮬레이션 레퍼런스 부족
- 커뮤니티 규모가 Three.js의 1/5 수준

#### React Three Fiber (R3F)

**장점:**
- React 생태계와 완전 통합 (선언적 3D 씬)
- drei 패키지로 공통 추상화 제공
- React 상태 관리와 자연스러운 통합

**단점:**
- React 의존성 추가
- Three.js 래퍼이므로 약간의 오버헤드
- 복잡한 셰이더 작업 시 결국 Three.js 직접 사용

---

## 2. 오픈소스 프로젝트 분석 (상위 10개)

### 2.1 jsOrrery -- 424 Stars

- **URL:** https://github.com/mgvez/jsorrery
- **라이브 데모:** https://mgvez.github.io/jsorrery/
- **기술 스택:** Three.js, Webpack, Babel, GLSL
- **최근 커밋:** 2017-08 (v3.0.0, 유지보수 중단)
- **아키텍처:**
  - NASA/JPL 궤도 요소 데이터 기반
  - ELP2000-85 달 이론, VSOP87 지구 위치 계산
  - Keith Burnett, Paul Schlyter, E.M. Standish 알고리즘
  - James Hastings-Trew 행성 텍스처
- **재사용 가능한 코드:**
  - 궤도 역학 계산 모듈 (JPL 데이터 기반)
  - 날짜 기반 정확한 행성 위치 계산
  - GLSL 셰이더 (1.9%)
- **한계:** 유지보수 중단, 구버전 Three.js, 모듈 시스템 구식

### 2.2 Tycho -- 109 Stars

- **URL:** https://github.com/jshor/tycho
- **라이브 데모:** https://tycho.io
- **기술 스택:** React, Redux, Three.js (react-three-renderer), Sass, Jest
- **최근 커밋:** 2024년 초
- **아키텍처:**
  - React/Redux 컨테이너 패턴
  - NASA/JPL HORIZONS 데이터베이스 연동
  - 물리 계산을 별도 서비스 모듈로 분리
  - `yarn ephemeris` 스크립트로 NASA 데이터 자동 갱신
- **재사용 가능한 코드:**
  - JPL HORIZONS 데이터 페칭 스크립트
  - React + Three.js 통합 패턴
  - 상태 관리 기반 시뮬레이션 제어
- **한계:** react-three-renderer (구식, R3F 이전), 복잡한 의존성

### 2.3 SolarSys -- 88 Stars

- **URL:** https://github.com/solarcg/SolarSys
- **기술 스택:** Three.js, WebGL, GLSL
- **최근 커밋:** 활발하지 않음
- **아키텍처:**
  - `js/` (로직), `css/`, `res/` (리소스), `images/` 구조
  - 1인칭 로밍 + 충돌 감지
  - 카메라 간 부드러운 전환
- **재사용 가능한 코드:**
  - 대기 산란 모델 (Rayleigh scattering)
  - 포토리얼리스틱 행성 렌더링
  - 카메라 전환 시스템
- **한계:** 모듈화 부족, 번들링 미사용
- **관련 프로젝트:** EarthVR (WebVR 지구 시각화)

### 2.4 3d-Solar-System-ThreeJS -- 82 Stars

- **URL:** https://github.com/SoumyaEXE/3d-Solar-System-ThreeJS
- **기술 스택:** Three.js, Vite
- **최근 커밋:** 2025-11
- **아키텍처:**
  - Vite 기반 빌드
  - 인터랙티브 궤도 시각화
  - 모던 JS 모듈 시스템
- **재사용 가능한 코드:**
  - Vite + Three.js 프로젝트 설정
  - 기본 궤도 렌더링
- **한계:** 비교적 단순한 구현

### 2.5 solar-system-threejs (sanderblue) -- Stars 미확인

- **URL:** https://github.com/sanderblue/solar-system-threejs
- **라이브 데모:** https://sanderblue.github.io/solar-system-threejs/
- **기술 스택:** Three.js
- **특징:**
  - 실제 천문학 데이터 기반 스케일 모델링
  - 태양, 8개 행성, 각 행성 위성, 소행성대, 수천 개 별
  - 모든 객체가 실제 비율로 모델링

### 2.6 Accrete.js -- 38 Stars

- **URL:** https://github.com/tmanderson/Accrete.js
- **최근 커밋:** 2026-01
- **특징:**
  - 행성계 형성 시뮬레이션
  - 브라우저 및 서버 모두 지원
  - 물리 기반 행성 생성

### 2.7 SaturnWebGL -- Stars 미확인

- **URL:** https://github.com/adelmassimo/SaturnWebGL
- **특징:**
  - 파티클 기반 토성 고리 렌더링
  - GLSL 셰이더 중심 구현
  - 토성 시스템 전문 시각화

### 2.8 Solar-System-3D (N3rson) -- Stars 미확인

- **URL:** https://github.com/N3rson/Solar-System-3D
- **특징:** Three.js 기반 동적/인터랙티브 태양계 시뮬레이션

### 2.9 SolarSystem (ongyishen) -- Stars 미확인

- **URL:** https://github.com/ongyishen/SolarSystem
- **특징:** 정확한 행성 역학과 시각 효과에 초점

### 2.10 Frontier -- 15 Stars

- **URL:** https://github.com/CosmoFrontier/Frontier
- **기술 스택:** Three.js
- **특징:** 3D 태양계 탐색 도구

---

## 3. 핵심 기술 요소별 분석

### 3.1 궤도 역학 라이브러리

#### astronomy-engine (추천)

- **URL:** https://github.com/cosinekitty/astronomy
- **npm:** `astronomy-engine`
- **Stars:** 843
- **라이센스:** MIT
- **크기:** 축소 JS < 120KB
- **정확도:** NOVAS 대비 항상 1 arcminute 이내
- **기반 모델:** VSOP87 삼각급수 + NOVAS C 3.1
- **외부 의존성:** 없음
- **주요 기능:**
  - 태양, 달, 수성~명왕성 위치 계산
  - 목성 위성 위치 계산
  - 월식/일식/행성 횡단 예측
  - 춘분/하지/추분/동지 계산
  - 적경/적위 ↔ 황경/황위 ↔ 지평 ↔ 은하 좌표 변환
  - `GravitySimulator` 클래스로 소행성/혜성/우주선 궤적 시뮬레이션
- **지원 언어:** JavaScript, C, C#, Python, Kotlin/JVM

```javascript
// 사용 예시: 화성 위치 계산
import { Body, HelioVector } from 'astronomy-engine';

const date = new Date('2026-03-28');
const marsPos = HelioVector(Body.Mars, date);
// { x: AU, y: AU, z: AU } 헬리오센트릭 좌표
```

#### orb.js (대안)

- **URL:** https://github.com/lizard-isana/orb.js
- **특징:** 케플러 궤도 요소 기반 위치 계산, 행성/달/태양/소행성 지원

#### orbjs (대안)

- **URL:** https://github.com/benelsen/orb
- **npm:** `orbjs`
- **특징:** 궤도 역학 공통 문제 해결, 좌표계 변환, 케플러 전파

#### orbits.js (대안)

- **URL:** https://github.com/vsr83/orbits.js
- **특징:** 케플러 방정식 풀이, 궤도 요소 진동, 케플러 전파

#### kepler.js (대안)

- **URL:** https://github.com/Rotiahn/kepler.js
- **특징:** 순수 JS 궤도 역학 도구 모음

### 3.2 대기 셰이더 (Rayleigh/Mie Scattering)

#### 접근법 비교

| 접근법 | 라이브러리 | 장점 | 단점 |
|--------|-----------|------|------|
| **실시간 레이마칭** | glsl-atmosphere | 단순, 가벼움, 매개변수 조절 쉬움 | 행성별 튜닝 필요 |
| **사전 계산 LUT** | @takram/three-atmosphere | 물리적으로 정확, GPU 부하 적음 | 지구 대기에 최적화, 범용성 낮음 |
| **천문학 특화** | THRASTRO shaders | 식(eclipse) 그림자, 고리, 행성 렌더링 통합 | Stars 10개, 커뮤니티 작음 |
| **GPU Gems 2** | 직접 구현 | 최고의 제어력, 교육 자료 풍부 | 구현 시간 많이 필요 |

#### glsl-atmosphere (추천 기반)

- **URL:** https://github.com/wwwtyro/glsl-atmosphere
- **Stars:** 629
- **특징:**
  - Rayleigh + Mie 산란 구현
  - npm 설치 (`glsl-atmosphere`), glslify 호환
  - 매개변수 조절 가능: 태양 강도, 행성 반경, 대기 높이, 산란 계수

```glsl
// 셰이더 함수 시그니처
vec3 atmosphere(
    vec3 r,        // 정규화된 광선 방향
    vec3 r0,       // 광선 원점
    vec3 pSun,     // 태양 위치
    float iSun,    // 태양 강도
    float rPlanet, // 행성 반경
    float rAtmos,  // 대기 반경
    vec3 kRlh,     // Rayleigh 산란 계수
    float kMie,    // Mie 산란 계수
    float shRlh,   // Rayleigh 스케일 높이
    float shMie,   // Mie 스케일 높이
    float g        // Mie 선호 산란 방향
);
```

#### @takram/three-atmosphere

- **npm:** `@takram/three-atmosphere`
- **특징:** Eric Bruneton의 사전 계산 대기 산란 구현
- **의존성:** three, postprocessing
- **R3F 지원:** @react-three/fiber, @react-three/postprocessing
- **한계:** 지구 대기에 한정, WebGPU 미지원 (예정)

#### THRASTRO Shaders

- **URL:** https://github.com/THRASTRO/thrastro-shaders
- **Stars:** 10
- **셰이더 종류:**
  - `EclipseShader` - 식 그림자
  - `PlanetShader` - 행성 표면
  - `GroundShader` - 대기 (지면)
  - `SkyShader` - 대기 (하늘)
  - `RingShader` - 행성 고리
  - `OrbitalsShader` - 인스턴스드 케플러 궤적
  - `ConstellationsShader` - 별자리
  - `FirmamentShader` - 성운
- **통합:** Three.js 네이티브 머티리얼 확장 (MeshBasicMaterial, MeshPhongMaterial 등)
- **한계:** Stars 10개, 최근 업데이트 2022년 3월

### 3.3 고리 렌더링 기법

#### 권장 접근법: RingGeometry + 커스텀 셰이더

1. **지오메트리:** `THREE.RingGeometry(innerRadius, outerRadius, segments)` 양면 디스크
2. **UV 좌표 변환:** 직교→극좌표 매핑 (텍스처가 극좌표 기준이므로)
3. **셰이더 구현:**
   - 색상/알파 텍스처 적용
   - 태양 각도 기반 주간/야간 블렌딩
   - 스페큘러 반사
4. **그림자 시스템:**
   - 행성→고리: 태양~표면 점 광선과 고리 평면 교차 계산
   - 고리→행성: 태양~고리 점 광선과 행성 구 교차 계산
   - 소프트 섀도: 광원 세분화로 반그림자 효과

```javascript
// 토성 고리 기본 구조
const ringGeometry = new THREE.RingGeometry(1.3, 2.2, 128);
const ringMaterial = new THREE.ShaderMaterial({
    uniforms: {
        ringTexture: { value: ringColorTexture },
        ringAlpha: { value: ringAlphaTexture },
        sunPosition: { value: new THREE.Vector3() },
        planetRadius: { value: 1.0 }
    },
    vertexShader: ringVertexShader,
    fragmentShader: ringFragmentShader,
    side: THREE.DoubleSide,
    transparent: true
});
```

### 3.4 태양 코로나/블룸 효과

#### 권장 접근법: 선택적 UnrealBloomPass + 커스텀 셰이더

**라이브러리:**
- `pmndrs/postprocessing` - Three.js 포스트프로세싱 라이브러리
- Three.js 내장 `UnrealBloomPass`

**구현 전략:**

1. **선택적 블룸 (Selective Bloom):**
   - 태양만 블룸 적용, 나머지 객체는 제외
   - 방법 1: 태양을 별도 씬에 배치하여 블룸 처리
   - 방법 2: 블룸 대상 외 객체의 머티리얼을 검은색으로 교체 후 렌더링

2. **코로나 셰이더:**
   - 프레넬 효과로 가장자리 글로우
   - 노이즈 텍스처로 코로나 형태 변형
   - 시간 기반 애니메이션으로 역동적 효과

```javascript
// 선택적 블룸 설정
const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(new RenderPass(scene, camera));
bloomComposer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
));
```

### 3.5 카메라 제어

#### OrbitControls + Tween 기반 전환 (추천)

**기본 탐색:** Three.js `OrbitControls`
- 회전, 줌, 패닝
- 감쇠(damping)로 부드러운 조작감
- 최소/최대 거리 제한

**행성 간 전환:** Tween 라이브러리
- **@tweenjs/tween.js** 또는 **GSAP (GreenSock)**
- 카메라 위치 + lookAt 동시 보간
- 이징 함수로 자연스러운 가감속

```javascript
// 행성 전환 예시 (tween.js)
import TWEEN from '@tweenjs/tween.js';

function flyToPlanet(camera, controls, targetPosition, duration = 2000) {
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();

    new TWEEN.Tween({ t: 0 })
        .to({ t: 1 }, duration)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(({ t }) => {
            camera.position.lerpVectors(startPos, targetPosition, t);
            controls.target.lerpVectors(startTarget, planetPos, t);
            controls.update();
        })
        .start();
}

// 애니메이션 루프에서
function animate(time) {
    TWEEN.update(time);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
```

### 3.6 시간 제어 시스템

#### 커스텀 SimulationClock 패턴 (추천)

Three.js `Clock`은 실시간 전용이므로, 시뮬레이션 시간 제어를 위한 커스텀 클래스 필요:

```javascript
class SimulationClock {
    constructor() {
        this.simulationTime = new Date();  // 현재 시뮬레이션 날짜
        this.timeScale = 1;                // 1 = 실시간, 86400 = 1일/초
        this.paused = false;
        this.lastRealTime = performance.now();
    }

    update() {
        const now = performance.now();
        if (!this.paused) {
            const realDelta = (now - this.lastRealTime) / 1000; // 초
            const simDelta = realDelta * this.timeScale;
            this.simulationTime = new Date(
                this.simulationTime.getTime() + simDelta * 1000
            );
        }
        this.lastRealTime = now;
        return this.simulationTime;
    }

    setSpeed(scale) { this.timeScale = scale; }
    pause() { this.paused = true; }
    resume() { this.paused = false; }
    setDate(date) { this.simulationTime = new Date(date); }
    reverse() { this.timeScale = -Math.abs(this.timeScale); }
}
```

**시간 배속 프리셋:**
| 배속 | timeScale | 용도 |
|------|-----------|------|
| 실시간 | 1 | 현재 상태 확인 |
| 1일/초 | 86,400 | 내행성 궤도 관찰 |
| 1주/초 | 604,800 | 외행성 궤도 관찰 |
| 1달/초 | 2,592,000 | 전체 태양계 패턴 |
| 1년/초 | 31,536,000 | 장기 궤도 패턴 |

### 3.7 성능 최적화 전략

#### 3.7.1 텍스처 압축 (KTX2/Basis Universal)

**효과:**
- 4096x4096 JPEG: GPU VRAM ~67MB (RGBA) → KTX2/ETC1S: ~8MB (**10배 감소**)
- 전체 텍스처 메모리: 300MB → 120MB 이하 (사례 기준)
- 텍스처 업로드 시간 및 메모리 최대 70% 절감 (특히 모바일)

**포맷 가이드:**
| 포맷 | 용도 | 특징 |
|------|------|------|
| **UASTC** | 노멀맵, 히어로 텍스처 | 높은 품질, 큰 파일 |
| **ETC1S** | 디퓨즈맵, 환경 텍스처 | 작은 파일, 수용 가능한 품질 |

```javascript
// KTX2Loader 사용
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/basis/')
    .detectSupport(renderer);

ktx2Loader.load('planet_earth_diffuse.ktx2', (texture) => {
    earthMaterial.map = texture;
    earthMaterial.needsUpdate = true;
});
```

#### 3.7.2 LOD (Level of Detail)

- 카메라 거리에 따라 행성 지오메트리 상세도 변경
- 근거리: 고해상도 구체 (128 segments), 고해상도 텍스처 (4K)
- 원거리: 저해상도 구체 (32 segments), 저해상도 텍스처 (512px)
- 매우 원거리: 빌보드 스프라이트로 대체

#### 3.7.3 GPU 인스턴싱 (소행성대)

- `THREE.InstancedMesh`로 단일 드로 콜로 수만~수십만 개 렌더링
- 개별 메시: ~7,000개에서 60fps 이하
- 인스턴싱: ~100,000개까지 60fps 유지 (데스크톱)
- 셰이더 내 애니메이션으로 CPU↔GPU 통신 최소화

```javascript
// 소행성대 인스턴싱 예시
const asteroidGeometry = new THREE.IcosahedronGeometry(0.01, 1);
const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const asteroidBelt = new THREE.InstancedMesh(
    asteroidGeometry, asteroidMaterial, 50000
);

const dummy = new THREE.Object3D();
for (let i = 0; i < 50000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.2 + Math.random() * 0.8; // 화성-목성 사이
    dummy.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.1,
        Math.sin(angle) * radius
    );
    dummy.scale.setScalar(0.5 + Math.random());
    dummy.updateMatrix();
    asteroidBelt.setMatrixAt(i, dummy.matrix);
}
scene.add(asteroidBelt);
```

#### 3.7.4 Web Worker 활용

- **궤도 계산 분리:** 물리 계산을 Web Worker에서 수행, 메인 스레드는 렌더링에 집중
- **OffscreenCanvas:** Three.js 렌더링 자체를 Worker로 이동 가능
  - **주의:** Safari에서 OffscreenCanvas + WebGL 미지원 (2026년 기준 확인 필요)
- **SharedArrayBuffer:** Worker ↔ 메인 스레드 간 위치 데이터 공유

```javascript
// 궤도 계산 Web Worker 예시
// orbital-worker.js
import { HelioVector, Body } from 'astronomy-engine';

self.onmessage = ({ data: { date, bodies } }) => {
    const positions = {};
    for (const body of bodies) {
        const vec = HelioVector(Body[body], new Date(date));
        positions[body] = { x: vec.x, y: vec.y, z: vec.z };
    }
    self.postMessage(positions);
};
```

---

## 4. 최종 기술 스택 추천

### 4.1 핵심 스택

| 영역 | 추천 기술 | 근거 |
|------|---------|------|
| **3D 렌더링** | Three.js (최신 r175+) | 압도적 생태계, 가벼운 번들, 태양계 레퍼런스 최다, WebGPU 프로덕션 |
| **궤도 계산** | astronomy-engine | 843 Stars, 1 arcminute 정확도, VSOP87 기반, 외부 의존성 없음, 120KB |
| **빌드 도구** | Vite | 빠른 HMR, ESM 네이티브, Three.js와 호환 우수 |
| **카메라 제어** | OrbitControls + @tweenjs/tween.js | 표준 탐색 + 행성 간 부드러운 전환 |
| **포스트프로세싱** | pmndrs/postprocessing | 선택적 블룸 (태양 코로나), 효율적인 이펙트 체이닝 |
| **텍스처 압축** | KTX2 (Basis Universal) | GPU VRAM 10배 절감, Three.js KTX2Loader 내장 |

### 4.2 셰이더 스택

| 효과 | 구현 방식 |
|------|---------|
| **대기 산란** | glsl-atmosphere 기반 커스텀 (행성별 매개변수 조절) |
| **토성 고리** | RingGeometry + 커스텀 ShaderMaterial (그림자 교차 계산) |
| **태양 코로나** | 선택적 UnrealBloomPass + 프레넬 셰이더 |
| **야간면** | 커스텀 ShaderMaterial (도시 조명/야간 텍스처 블렌딩) |

### 4.3 성능 스택

| 기법 | 적용 대상 |
|------|---------|
| **KTX2 압축** | 모든 행성 텍스처 (ETC1S 디퓨즈, UASTC 노멀) |
| **LOD** | 행성 지오메트리 + 텍스처 해상도 |
| **InstancedMesh** | 소행성대, 배경 별 |
| **Web Worker** | 궤도 계산 (astronomy-engine) |
| **오브젝트 풀링** | 궤도 트레일 라인 |

### 4.4 프로젝트 구조 제안

```
solar-system/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── textures/           # KTX2 압축 텍스처
│   │   ├── sun/
│   │   ├── mercury/
│   │   ├── venus/
│   │   ├── earth/
│   │   ├── mars/
│   │   ├── jupiter/
│   │   ├── saturn/
│   │   ├── uranus/
│   │   ├── neptune/
│   │   └── skybox/
│   └── data/               # 행성 데이터 JSON
├── src/
│   ├── main.js             # 엔트리 포인트
│   ├── App.js              # 앱 초기화, 렌더 루프
│   ├── core/
│   │   ├── Renderer.js     # Three.js 렌더러 설정
│   │   ├── Scene.js        # 씬 구성
│   │   ├── Camera.js       # 카메라 + OrbitControls
│   │   └── Clock.js        # SimulationClock (시간 제어)
│   ├── celestial/
│   │   ├── CelestialBody.js    # 기본 천체 클래스
│   │   ├── Sun.js              # 태양 (코로나 셰이더)
│   │   ├── Planet.js           # 행성 (대기, 고리)
│   │   ├── Moon.js             # 위성
│   │   └── AsteroidBelt.js     # 소행성대 (InstancedMesh)
│   ├── orbital/
│   │   ├── OrbitalEngine.js    # astronomy-engine 래퍼
│   │   └── orbital-worker.js   # Web Worker 궤도 계산
│   ├── shaders/
│   │   ├── atmosphere.glsl     # 대기 산란
│   │   ├── ring.glsl           # 행성 고리
│   │   ├── corona.glsl         # 태양 코로나
│   │   └── nightside.glsl      # 야간면
│   ├── effects/
│   │   └── PostProcessing.js   # 블룸, 톤매핑
│   ├── controls/
│   │   ├── CameraController.js # 카메라 전환 (Tween)
│   │   └── TimeController.js   # UI 시간 제어
│   └── ui/
│       ├── InfoPanel.js        # 행성 정보 패널
│       ├── Timeline.js         # 시간 슬라이더
│       └── Navigation.js       # 행성 네비게이션
└── tools/
    └── compress-textures.js    # KTX2 변환 스크립트
```

### 4.5 핵심 의존성 (package.json)

```json
{
  "dependencies": {
    "three": "^0.183.0",
    "astronomy-engine": "^2.1.0",
    "@tweenjs/tween.js": "^23.0.0",
    "postprocessing": "^7.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vite-plugin-glsl": "^1.3.0"
  }
}
```

**총 프로덕션 번들 예상:** ~300-400KB (gzipped, 텍스처 제외)

---

## 5. 참고 자료 및 출처

### 프레임워크 비교
- [Three.js vs Babylon.js vs PlayCanvas 비교 가이드 2026](https://www.utsubo.com/blog/threejs-vs-babylonjs-vs-playcanvas-comparison)
- [React Three Fiber vs Three.js 2026](https://graffersid.com/react-three-fiber-vs-three-js/)
- [Babylon.js vs Three.js: 360도 기술 비교](https://dev.to/devin-rosario/babylonjs-vs-threejs-the-360deg-technical-comparison-for-production-workloads-2fn6)

### 오픈소스 프로젝트
- [jsOrrery - WebGL Solar System](https://github.com/mgvez/jsorrery)
- [Tycho - React/Redux Solar System](https://github.com/jshor/tycho)
- [SolarSys - Realistic Simulation](https://github.com/solarcg/SolarSys)
- [solar-system-threejs - Scale Model](https://github.com/sanderblue/solar-system-threejs)
- [GitHub solar-system 토픽](https://github.com/topics/solar-system?l=javascript&o=desc&s=stars)

### 궤도 역학
- [Astronomy Engine](https://github.com/cosinekitty/astronomy)
- [orb.js](https://github.com/lizard-isana/orb.js)
- [orbits.js](https://vsr83.github.io/orbits.js/)

### 셰이더/렌더링
- [glsl-atmosphere](https://github.com/wwwtyro/glsl-atmosphere)
- [@takram/three-atmosphere](https://www.npmjs.com/package/@takram/three-atmosphere)
- [THRASTRO Shaders](https://github.com/THRASTRO/thrastro-shaders)
- [Saturn Ring Shader 튜토리얼](https://sangillee.com/2024-11-02-create-realistic-saturn-with-shaders/)
- [GPU Gems 2 - Atmospheric Scattering](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering)

### 성능 최적화
- [100 Three.js 팁 (2026)](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- [KTX2Loader 문서](https://threejs.org/docs/pages/KTX2Loader.html)
- [InstancedMesh 문서](https://threejs.org/docs/pages/InstancedMesh.html)
- [OffscreenCanvas + Web Workers](https://evilmartians.com/chronicles/faster-webgl-three-js-3d-graphics-with-offscreencanvas-and-web-workers)

### 카메라/애니메이션
- [Three.js 카메라 애니메이션](https://dev.to/pahund/animating-camera-movement-in-three-js-17e9)
- [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing)
- [Selective Bloom 튜토리얼](https://waelyasmina.net/articles/unreal-bloom-selective-threejs-post-processing/)
