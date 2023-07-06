import { generateLsh } from "./lsh/index.js";

export function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function textToByteCode(input) {
  generateLsh(2, 10, 3)(input);
}
