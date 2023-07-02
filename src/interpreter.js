import { create300x300EmptyCanvas } from "./canvas.js";
import { InstructionHub } from "./instruction-set.js";

const stack = [];

export const execute = (instructions) => {
  const progress = { i: 0, pencilPosition: { x: 150, y: 150 } };
  const svgDraft = { svg: "" };
  for (; progress.i < instructions.length; progress.i++) {
    InstructionHub(
      progress,
      stack,
      instructions,
      svgDraft,
      instructions[progress.i]
    )();
  }
  const svgCanvas = create300x300EmptyCanvas(svgDraft.svg);
  if (stack.length > 0) {
    throw Error("Stack ended with values in it");
  }
  return { stack, svgCanvas };
};
