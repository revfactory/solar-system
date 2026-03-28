precision highp float;

#define PI 3.14159265359

uniform vec3 sunPosition;
uniform float sunIntensity;
uniform float planetRadius;
uniform float atmosphereRadius;
uniform vec3 rayleighCoefficients;
uniform float mieCoefficient;
uniform float rayleighScaleHeight;
uniform float mieScaleHeight;
uniform float mieG;
uniform int numSamples;
uniform int numSamplesLight;

varying vec3 vWorldPosition;
varying vec3 vNormal;

// Ray-sphere intersection: returns (near, far), negative if no hit
vec2 raySphere(vec3 origin, vec3 dir, float radius) {
  float a = dot(dir, dir);
  float b = 2.0 * dot(dir, origin);
  float c = dot(origin, origin) - radius * radius;
  float discriminant = b * b - 4.0 * a * c;
  if (discriminant < 0.0) return vec2(1e5, -1e5);
  float sqrtD = sqrt(discriminant);
  return vec2((-b - sqrtD) / (2.0 * a), (-b + sqrtD) / (2.0 * a));
}

// Rayleigh phase function
float phaseRayleigh(float cosTheta) {
  return 3.0 / (16.0 * PI) * (1.0 + cosTheta * cosTheta);
}

// Henyey-Greenstein phase function for Mie scattering
float phaseMie(float cosTheta, float g) {
  float g2 = g * g;
  float num = 3.0 * (1.0 - g2) * (1.0 + cosTheta * cosTheta);
  float denom = 8.0 * PI * (2.0 + g2) * pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5);
  return num / denom;
}

void main() {
  vec3 cameraPos = cameraPosition;
  vec3 rayDir = normalize(vWorldPosition - cameraPos);

  // Intersect ray with atmosphere sphere
  vec2 atmoHit = raySphere(cameraPos, rayDir, atmosphereRadius);
  if (atmoHit.x > atmoHit.y) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Clamp near to 0 (camera inside atmosphere)
  float tStart = max(atmoHit.x, 0.0);
  float tEnd = atmoHit.y;

  // Check if ray hits planet (occlusion)
  vec2 planetHit = raySphere(cameraPos, rayDir, planetRadius);
  if (planetHit.x > 0.0 && planetHit.x < tEnd) {
    tEnd = planetHit.x;
  }

  float segmentLength = (tEnd - tStart) / float(numSamples);
  float tCurrent = tStart;

  vec3 totalRayleigh = vec3(0.0);
  vec3 totalMie = vec3(0.0);
  float opticalDepthRayleigh = 0.0;
  float opticalDepthMie = 0.0;

  vec3 sunDir = normalize(sunPosition);

  for (int i = 0; i < 32; i++) {
    if (i >= numSamples) break;

    vec3 samplePoint = cameraPos + rayDir * (tCurrent + segmentLength * 0.5);
    float height = length(samplePoint) - planetRadius;

    // Density at sample point
    float densityRayleigh = exp(-height / rayleighScaleHeight) * segmentLength;
    float densityMie = exp(-height / mieScaleHeight) * segmentLength;

    opticalDepthRayleigh += densityRayleigh;
    opticalDepthMie += densityMie;

    // Light ray from sample point to sun
    vec2 sunHit = raySphere(samplePoint, sunDir, atmosphereRadius);
    float segmentLengthLight = sunHit.y / float(numSamplesLight);
    float tCurrentLight = 0.0;
    float opticalDepthLightRayleigh = 0.0;
    float opticalDepthLightMie = 0.0;
    bool occluded = false;

    for (int j = 0; j < 16; j++) {
      if (j >= numSamplesLight) break;

      vec3 samplePointLight = samplePoint + sunDir * (tCurrentLight + segmentLengthLight * 0.5);
      float heightLight = length(samplePointLight) - planetRadius;

      if (heightLight < 0.0) {
        occluded = true;
        break;
      }

      opticalDepthLightRayleigh += exp(-heightLight / rayleighScaleHeight) * segmentLengthLight;
      opticalDepthLightMie += exp(-heightLight / mieScaleHeight) * segmentLengthLight;

      tCurrentLight += segmentLengthLight;
    }

    if (!occluded) {
      vec3 tau = rayleighCoefficients * (opticalDepthRayleigh + opticalDepthLightRayleigh)
               + mieCoefficient * 1.1 * (opticalDepthMie + opticalDepthLightMie);
      vec3 attenuation = exp(-tau);

      totalRayleigh += densityRayleigh * attenuation;
      totalMie += densityMie * attenuation;
    }

    tCurrent += segmentLength;
  }

  float cosTheta = dot(rayDir, sunDir);
  vec3 color = sunIntensity * (
    phaseRayleigh(cosTheta) * rayleighCoefficients * totalRayleigh +
    phaseMie(cosTheta, mieG) * mieCoefficient * totalMie
  );

  gl_FragColor = vec4(color, max(max(color.r, color.g), color.b));
}
