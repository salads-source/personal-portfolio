// Reconstructed from the Abyss scene in the user's Efecto reference (efecto.app).
// Its defaults are scale 1, disk .8, warp .7, color shift .5, glow .6, speed .5.
// Keep the source image separate from the ASCII and screen-space postprocessing.
export const blackHoleShader = `
  uniform float uTime;
  uniform vec2 uSize;
  uniform float uFraming;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 cell = floor(p), f = fract(p);
    vec2 blend = f * f * (3.0 - 2.0 * f);
    return 0.25 + 0.5 * mix(
      mix(hash(cell), hash(cell + vec2(1, 0)), blend.x),
      mix(hash(cell + vec2(0, 1)), hash(cell + vec2(1, 1)), blend.x), blend.y);
  }
  mat2 orbit(float radius, float time) {
    float angle = time * 173.0 / pow(radius + 0.5, 2.0);
    return mat2(cos(angle), sin(angle + 11.0), sin(angle + 33.0), cos(angle));
  }
  void main() {
    float time = uTime * 0.5;
    vec2 p = (vUv * 2.0 - 1.0) * uSize / sqrt(uSize.x * uSize.y) * 16.0 * uFraming;
    float lens = tanh(p.y * 0.7 + sqrt(p.x * p.x * 7.0 + 1.0) * 0.15 - 0.6) + 1.0;
    p -= p / max(dot(p, p) / max(lens, 0.00001) * 0.14, 1.0);
    p.y *= 4.5;
    float perspective = 1.0 - p.y * 0.04;
    // The perspective pole is outside the disk. Avoid undefined GPU arithmetic.
    if (abs(perspective) < 0.00001) { gl_FragColor = vec4(0, 0, 0, 1); return; }
    p /= perspective;
    float radius = max(length(p), 0.0001);
    vec2 inner = orbit(floor(radius), time) * p;
    vec2 outer = orbit(ceil(radius), time) * p;
    float blend = fract(radius);
    blend = blend * blend * (3.0 - 2.0 * blend);
    float light = mix(noise(inner * (0.7 / 1.5) + time * 0.5), noise(outer * (0.7 / 1.5) + time * 0.5), blend);
    light += 0.4 * mix(noise(inner * (1.7 / 1.5) + time * 0.5), noise(outer * (1.7 / 1.5) + time * 0.5), blend);
    light = (light * 0.8 / 0.03 - 0.11 * radius * radius - 14.0 / pow(radius, 3.0)) / 13.0;
    vec3 tint = vec3(0.45, 0.4, 0.45);
    vec3 color = max(vec3(light) - tint * 0.75 + exp(-radius / 2.0) * 0.3 * tint, 0.0);
    color *= clamp(color.r + color.g + color.b, 0.0, 1.0);
    color *= pow(smoothstep(0.5, 1.5, radius), 2.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;
