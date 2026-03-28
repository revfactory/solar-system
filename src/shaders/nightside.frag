precision highp float;

uniform sampler2D dayMap;
uniform sampler2D nightMap;
uniform sampler2D cloudsMap;
uniform sampler2D normalMap;
uniform sampler2D specularMap;
uniform vec3 sunPosition;
uniform float cloudsIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 sunDir = normalize(sunPosition - vWorldPosition);
  vec3 normal = normalize(vNormal);

  // Normal map perturbation
  vec3 mapN = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
  // Simplified tangent space — works for sphere UVs
  normal = normalize(normal + mapN * 0.15);

  float NdotL = dot(normal, sunDir);

  // Day/night blending with smooth transition
  float dayFactor = smoothstep(-0.1, 0.2, NdotL);

  vec3 dayColor = texture2D(dayMap, vUv).rgb;
  vec3 nightColor = texture2D(nightMap, vUv).rgb;

  // Cloud layer (only on dayside, slightly into terminator)
  float cloudAlpha = texture2D(cloudsMap, vUv).r * cloudsIntensity;
  float cloudDay = smoothstep(-0.05, 0.15, NdotL);
  dayColor = mix(dayColor, vec3(1.0), cloudAlpha * cloudDay);

  // Specular highlight on water (oceans)
  float specMask = texture2D(specularMap, vUv).r;
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  vec3 halfDir = normalize(sunDir + viewDir);
  float spec = pow(max(dot(normal, halfDir), 0.0), 64.0);
  dayColor += vec3(0.6) * spec * specMask * max(NdotL, 0.0);

  // Diffuse lighting for day side
  float diffuse = max(NdotL, 0.0) * 0.8 + 0.2;
  dayColor *= diffuse;

  // Night emission — city lights glow
  nightColor *= 1.5; // boost visibility

  vec3 finalColor = mix(nightColor, dayColor, dayFactor);

  gl_FragColor = vec4(finalColor, 1.0);
}
