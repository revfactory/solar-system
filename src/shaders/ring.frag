precision highp float;

uniform sampler2D ringTexture;
uniform sampler2D ringAlpha;
uniform vec3 sunPosition;
uniform vec3 planetPosition;
uniform float planetRadius;
uniform float innerRadius;
uniform float outerRadius;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  // Radial UV: map distance from center to 0..1
  float dist = length(vWorldPosition.xz - planetPosition.xz);
  float radialUV = (dist - innerRadius) / (outerRadius - innerRadius);
  radialUV = clamp(radialUV, 0.0, 1.0);

  vec4 color = texture2D(ringTexture, vec2(radialUV, 0.5));
  float alpha = texture2D(ringAlpha, vec2(radialUV, 0.5)).r;

  // Simple diffuse lighting
  vec3 sunDir = normalize(sunPosition - vWorldPosition);
  // Ring normal is roughly (0, 1, 0) in local space but we use the face normal
  vec3 ringNormal = vec3(0.0, 1.0, 0.0);
  float NdotL = abs(dot(ringNormal, sunDir));
  float lighting = mix(0.15, 1.0, NdotL);

  // Planet shadow on ring: test if fragment-to-sun ray intersects planet sphere
  vec3 fragToSun = normalize(sunPosition - vWorldPosition);
  vec3 oc = vWorldPosition - planetPosition;
  float b = dot(oc, fragToSun);
  float c = dot(oc, oc) - planetRadius * planetRadius;
  float discriminant = b * b - c;

  float shadow = 1.0;
  if (discriminant > 0.0 && b < 0.0) {
    // Fragment is in planet's shadow
    shadow = 0.15;
  }

  color.rgb *= lighting * shadow;

  gl_FragColor = vec4(color.rgb, alpha * color.a);
}
