import { __, applyTo, compose, curry, tap } from "ramda";
import { generateLsh } from "./lsh/index.js";

const { cos: MathCos, sin: MathSin } = Math;

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function textToByteCode(input) {
  return generateLsh(2, 10, 3)(input);
}

export const sin = applyTo(__, compose(MathSin, toRadians))

export const cos = applyTo(__, compose(MathCos, toRadians))

export const fix = curry((number, decimals) => number.toFixed(decimals)); 