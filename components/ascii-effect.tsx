"use client";

import { forwardRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Effect, BlendFunction } from "postprocessing";
import { Uniform, Vector2, type WebGLRenderer, type WebGLRenderTarget } from "three";

// Based on the user's Efecto export, with the standard glyphs updated to the
// live app's 5x7 set. The React wrapper uses typed, per-instance state.
const fragmentShader = `
uniform float cellSize;
uniform bool invert;
uniform bool colorMode;
uniform int asciiStyle;
uniform float time;
uniform vec2 resolution;
uniform vec2 mousePos;
uniform float scanlineIntensity;
uniform float scanlineCount;
uniform float targetFPS;
uniform float jitterIntensity;
uniform float jitterSpeed;
uniform bool mouseGlowEnabled;
uniform float mouseGlowRadius;
uniform float mouseGlowIntensity;
uniform float vignetteIntensity;
uniform float vignetteRadius;
uniform int colorPalette;
uniform float curvature;
uniform float aberrationStrength;
uniform float noiseIntensity;
uniform float noiseScale;
uniform float noiseSpeed;
uniform float waveAmplitude;
uniform float waveFrequency;
uniform float waveSpeed;
uniform float glitchIntensity;
uniform float glitchFrequency;
uniform float brightnessAdjust;
uniform float contrastAdjust;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
vec3 rgb2hsl(vec3 color) {
  float maxC = max(max(color.r, color.g), color.b);
  float minC = min(min(color.r, color.g), color.b);
  float delta = maxC - minC;
  float h = 0.0, s = 0.0, l = (maxC + minC) / 2.0;
  if (delta > 0.0) {
    s = l < 0.5 ? delta / (maxC + minC) : delta / (2.0 - maxC - minC);
    if (maxC == color.r) h = ((color.g - color.b) / delta) + (color.g < color.b ? 6.0 : 0.0);
    else if (maxC == color.g) h = ((color.b - color.r) / delta) + 2.0;
    else h = ((color.r - color.g) / delta) + 4.0;
    h /= 6.0;
  }
  return vec3(h, s, l);
}
vec3 hsl2rgb(vec3 hsl) {
  float h = hsl.x, s = hsl.y, l = hsl.z;
  float c = (1.0 - abs(2.0 * l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
  float m = l - c / 2.0;
  vec3 rgb;
  if (h < 1.0/6.0) rgb = vec3(c, x, 0.0);
  else if (h < 2.0/6.0) rgb = vec3(x, c, 0.0);
  else if (h < 3.0/6.0) rgb = vec3(0.0, c, x);
  else if (h < 4.0/6.0) rgb = vec3(0.0, x, c);
  else if (h < 5.0/6.0) rgb = vec3(x, 0.0, c);
  else rgb = vec3(c, 0.0, x);
  return rgb + m;
}
vec3 applyColorPalette(vec3 color, int palette) {
  if (palette == 1) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, lum * 0.9, 0.1);
  } else if (palette == 2) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(lum * 1.0, lum * 0.6, lum * 0.2);
  } else if (palette == 3) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.0, lum * 0.8, lum);
  } else if (palette == 4) {
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    return vec3(0.1, 0.2, lum);
  }
  return color;
}
float getChar(float brightness, vec2 p, int style) {
  if (style != 0 || brightness < 0.1) return 0.0;
  vec2 g = floor(p * vec2(5.0, 7.0));
  bool middleColumns = g.x >= 1.0 && g.x <= 3.0;
  bool middleRows = g.y >= 2.0 && g.y <= 4.0;
  bool sides = g.x == 1.0 || g.x == 3.0;
  bool pixel;
  if (brightness < 0.2) pixel = g.x == 2.0 && g.y == 5.0;
  else if (brightness < 0.3) pixel = g.x == 2.0 && (g.y == 2.0 || g.y == 4.0);
  else if (brightness < 0.4) pixel = middleColumns && (g.y == 2.0 || g.y == 4.0);
  else if (brightness < 0.5) pixel = middleColumns && middleRows;
  else if (brightness < 0.6) pixel = (middleColumns && (g.y == 2.0 || g.y == 4.0)) || (sides && g.y == 3.0);
  else if (brightness < 0.8) {
    pixel = (middleColumns && (g.y == 1.0 || g.y == 5.0)) ||
      ((g.x == 0.0 || g.x == 4.0) && middleRows) ||
      (sides && g.y >= 1.0 && g.y <= 5.0);
    if (brightness >= 0.7) pixel = pixel || (middleColumns && abs(g.x - 2.0) == abs(g.y - 3.0));
  } else if (brightness < 0.9) {
    pixel = (middleColumns && (g.y == 1.0 || g.y == 3.0 || g.y == 5.0)) ||
      (sides && (g.y == 2.0 || g.y == 4.0));
  } else return 1.0;
  return pixel ? 1.0 : 0.0;
}
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 workUV = uv;
  if (curvature > 0.0) {
    vec2 centered = workUV * 2.0 - 1.0;
    centered *= 1.0 + curvature * dot(centered, centered);
    workUV = centered * 0.5 + 0.5;
    if (workUV.x < 0.0 || workUV.x > 1.0 || workUV.y < 0.0 || workUV.y > 1.0) {
      outputColor = vec4(0.0);
      return;
    }
  }
  if (waveAmplitude > 0.0) {
    workUV.x += sin(workUV.y * waveFrequency + time * waveSpeed) * waveAmplitude;
    workUV.y += cos(workUV.x * waveFrequency + time * waveSpeed) * waveAmplitude;
  }
  float currentTime = targetFPS > 0.0 ? floor(time * targetFPS) / targetFPS : time;
  vec4 sampledColor;
  if (aberrationStrength > 0.0) {
    float offset = aberrationStrength;
    vec2 uvR = workUV + vec2(offset, 0.0);
    vec2 uvG = workUV;
    vec2 uvB = workUV - vec2(offset, 0.0);
    float r = texture(inputBuffer, uvR).r;
    float g = texture(inputBuffer, uvG).g;
    float b = texture(inputBuffer, uvB).b;
    sampledColor = vec4(r, g, b, 1.0);
  } else {
    sampledColor = texture(inputBuffer, workUV);
  }
  sampledColor.rgb = (sampledColor.rgb - 0.5) * contrastAdjust + 0.5 + brightnessAdjust;
  if (noiseIntensity > 0.0) {
    float noiseVal = noise(workUV * noiseScale + time * noiseSpeed);
    sampledColor.rgb += (noiseVal - 0.5) * noiseIntensity;
  }
  vec2 cellCount = resolution / cellSize;
  vec2 cellCoord = floor(uv * cellCount);
  if (jitterIntensity > 0.0) {
    float jitterTime = time * jitterSpeed;
    float jitterX = (random(vec2(cellCoord.y, floor(jitterTime))) - 0.5) * jitterIntensity * 2.0;
    float jitterY = (random(vec2(cellCoord.x, floor(jitterTime + 1000.0))) - 0.5) * jitterIntensity * 2.0;
    cellCoord += vec2(jitterX, jitterY);
  }
  if (glitchIntensity > 0.0 && glitchFrequency > 0.0) {
    float glitchTime = floor(time * glitchFrequency);
    float glitchRand = random(vec2(glitchTime, cellCoord.y));
    if (glitchRand < glitchIntensity) {
      float shift = (random(vec2(glitchTime + 1.0, cellCoord.y)) - 0.5) * 20.0;
      cellCoord.x += shift;
    }
  }
  vec2 cellUV = (cellCoord + 0.5) / cellCount;
  vec4 cellColor = texture(inputBuffer, cellUV);
  float brightness = dot(cellColor.rgb, vec3(0.299, 0.587, 0.114));
  if (invert) brightness = 1.0 - brightness;
  vec2 localUV = fract(uv * cellCount);
  float charValue = getChar(brightness, localUV, asciiStyle);
  vec3 finalColor;
  if (colorMode) {
    finalColor = cellColor.rgb * charValue;
  } else {
    finalColor = vec3(brightness * charValue);
  }
  finalColor = applyColorPalette(finalColor, colorPalette);
  if (mouseGlowEnabled) {
    vec2 pixelPos = uv * resolution;
    float dist = length(pixelPos - mousePos);
    float glow = exp(-dist / mouseGlowRadius) * mouseGlowIntensity;
    finalColor += glow;
  }
  if (scanlineIntensity > 0.0) {
    float scanline = sin(uv.y * scanlineCount * 3.14159) * 0.5 + 0.5;
    finalColor *= 1.0 - (scanline * scanlineIntensity);
  }
  if (vignetteIntensity > 0.0) {
    vec2 centered = uv * 2.0 - 1.0;
    float vignette = 1.0 - dot(centered, centered) / vignetteRadius;
    finalColor *= mix(1.0, vignette, vignetteIntensity);
  }
  outputColor = vec4(finalColor, cellColor.a);
}
`;

const defaults = {
  scanlineIntensity: 0, scanlineCount: 200, targetFPS: 0,
  jitterIntensity: 0, jitterSpeed: 1, mouseGlowEnabled: false,
  mouseGlowRadius: 200, mouseGlowIntensity: 1.5, vignetteIntensity: 0,
  vignetteRadius: 0.8, colorPalette: 0, curvature: 0, aberrationStrength: 0,
  noiseIntensity: 0, noiseScale: 1, noiseSpeed: 1, waveAmplitude: 0,
  waveFrequency: 10, waveSpeed: 1, glitchIntensity: 0, glitchFrequency: 0,
  brightnessAdjust: 0, contrastAdjust: 1
};
type Palette = "original" | "green" | "amber" | "cyan" | "blue";
type PostFX = Partial<Omit<typeof defaults, "colorPalette">> & { colorPalette?: number | Palette };
type AsciiEffectProps = {
  // The supplied shader implements only the standard character set.
  style?: "standard";
  cellSize?: number;
  invert?: boolean;
  color?: boolean;
  postfx?: PostFX;
  resolution?: Vector2;
  mousePos?: Vector2;
};

class AsciiEffectImpl extends Effect {
  private elapsed = 0;

  constructor() {
    const uniforms = new Map<string, Uniform>([
      ["cellSize", new Uniform(10)], ["invert", new Uniform(false)],
      ["colorMode", new Uniform(true)], ["asciiStyle", new Uniform(0)],
      ["time", new Uniform(0)], ["resolution", new Uniform(new Vector2(1920, 1080))],
      ["mousePos", new Uniform(new Vector2())],
      ...Object.entries(defaults).map(([key, value]): [string, Uniform] => [key, new Uniform(value)])
    ]);
    super("AsciiEffect", fragmentShader, { blendFunction: BlendFunction.NORMAL, uniforms });
  }

  setSize(width: number, height: number) {
    this.uniforms.get("resolution")!.value.set(width, height);
  }

  update(_renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget, deltaTime: number) {
    this.elapsed += deltaTime;
    const fps = this.uniforms.get("targetFPS")!.value as number;
    this.uniforms.get("time")!.value = fps > 0 ? Math.floor(this.elapsed * fps) / fps : this.elapsed;
  }
}

export const AsciiEffect = forwardRef<AsciiEffectImpl, AsciiEffectProps>(function AsciiEffect(
  { cellSize = 10, invert = false, color = true, postfx, resolution, mousePos }, ref
) {
  const effect = useMemo(() => new AsciiEffectImpl(), []);
  useEffect(() => () => effect.dispose(), [effect]);
  useLayoutEffect(() => {
    effect.uniforms.get("cellSize")!.value = Math.max(1, cellSize);
    effect.uniforms.get("invert")!.value = invert;
    effect.uniforms.get("colorMode")!.value = color;
    if (resolution) effect.uniforms.get("resolution")!.value.copy(resolution);
    if (mousePos) effect.uniforms.get("mousePos")!.value = mousePos;
    for (const [key, fallback] of Object.entries(defaults)) {
      let value = postfx?.[key as keyof PostFX] ?? fallback;
      if (key === "colorPalette" && typeof value === "string") {
        value = { original: 0, green: 1, amber: 2, cyan: 3, blue: 4 }[value as Palette];
      }
      effect.uniforms.get(key)!.value = value;
    }
  }, [effect, cellSize, invert, color, postfx, resolution, mousePos]);
  // Primitives require explicit disposal, handled by the effect cleanup above.
  return <primitive ref={ref} object={effect} />;
});
