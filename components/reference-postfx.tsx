"use client";

import { useEffect, useMemo } from "react";
import { BlendFunction, Effect, EffectAttribute } from "postprocessing";
import { DataTexture, LinearFilter, RGBAFormat, Uniform } from "three";

// The ordered Post Process stack in the user's Efecto share URL. These are
// separate from the legacy ASCII export's (disabled) embedded postfx controls.
const paletteShader = `
  uniform sampler2D gradient;
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float luminance = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(inputColor.rgb, texture2D(gradient, vec2(luminance, 0.5)).rgb, 0.7);
    float scanline = sin(uv.y * 300.0 * 3.14159) * 0.5 + 0.5;
    outputColor = vec4(color * (1.0 - 0.3 * (1.0 - scanline)), inputColor.a);
  }
`;
const curvatureShader = `
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 p = uv * 2.0 - 1.0;
    vec2 warped = p * (1.0 + 0.5 * dot(p, p)) * 0.5 + 0.5;
    if (any(lessThan(warped, vec2(0.0))) || any(greaterThan(warped, vec2(1.0)))) {
      outputColor = vec4(0, 0, 0, 1);
    } else {
      outputColor = texture2D(inputBuffer, warped);
    }
  }
`;
const finishShader = `
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float distanceToCenter = length(uv - 0.5) / 0.707;
    float vignette = 1.0 - smoothstep(0.2, 0.7, distanceToCenter);
    vec3 color = inputColor.rgb * mix(1.0, vignette, 0.4);
    outputColor = vec4(clamp((color - 0.5) * 1.2 + 0.6, 0.0, 1.0), inputColor.a);
  }
`;

function createGradient() {
  const stops = [[0, 0, 0], [181, 49, 32], [107, 107, 107], [252, 252, 252]];
  const pixels = new Uint8Array(256 * 4);
  for (let x = 0; x < 256; x++) {
    const position = (x / 255) * (stops.length - 1);
    const index = Math.min(Math.floor(position), stops.length - 2);
    for (let channel = 0; channel < 3; channel++) {
      pixels[x * 4 + channel] = Math.round(stops[index][channel] +
        (stops[index + 1][channel] - stops[index][channel]) * (position - index));
    }
    pixels[x * 4 + 3] = 255;
  }
  const texture = new DataTexture(pixels, 256, 1, RGBAFormat);
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function ReferencePostFX() {
  const resources = useMemo(() => {
    const gradient = createGradient();
    const options = { blendFunction: BlendFunction.NORMAL };
    return {
      gradient,
      palette: new Effect("ReferencePaletteScanlines", paletteShader, {
        ...options, uniforms: new Map([["gradient", new Uniform(gradient)]])
      }),
      // Convolution forces its own pass: curvature must warp the rendered glyphs,
      // not resample the original, unfiltered source or silently discard the palette.
      curvature: new Effect("ReferenceCurvature", curvatureShader, {
        ...options, attributes: EffectAttribute.CONVOLUTION
      }),
      finish: new Effect("ReferenceVignetteColor", finishShader, options)
    };
  }, []);
  useEffect(() => () => {
    resources.palette.dispose();
    resources.curvature.dispose();
    resources.finish.dispose();
    resources.gradient.dispose();
  }, [resources]);
  return <>
    <primitive object={resources.palette} dispose={null} />
    <primitive object={resources.curvature} dispose={null} />
    <primitive object={resources.finish} dispose={null} />
  </>;
}
