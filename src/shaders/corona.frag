precision highp float;

uniform float time;
uniform float coronaIntensity;
uniform vec3 coronaColorInner;  // warm yellow-white
uniform vec3 coronaColorOuter;  // orange-red

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec2 vUv;

// Simple hash for noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Value noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  float fresnel = pow(1.0 - dot(vViewDir, vNormal), 3.0);

  // Animated noise for corona shape variation
  vec2 noiseUV = vUv * 4.0 + vec2(time * 0.02, time * 0.015);
  float n = fbm(noiseUV);

  // Corona intensity modulated by noise and fresnel
  float corona = fresnel * (0.7 + 0.3 * n) * coronaIntensity;

  // Color: inner (bright) to outer (red-orange) based on fresnel
  vec3 color = mix(coronaColorInner, coronaColorOuter, fresnel);
  color *= corona;

  // Fade out towards center (where planet surface is)
  float edgeFade = smoothstep(0.0, 0.4, fresnel);
  color *= edgeFade;

  gl_FragColor = vec4(color, corona * edgeFade);
}
