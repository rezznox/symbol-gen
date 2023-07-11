import { assocPath, pipe } from "ramda";
import { create300x300EmptyCanvas } from "./canvas.js";
import { initializeInstructionSet } from "./instruction-set.js";
import {
  create256Hash,
  determineDesicionGuide,
  stringToBytes,
} from "./sha256/index.js";
import state, { setConfig } from "./state.js";
/* 
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
}; */

export const executeV2 = (input, mode) => {
  //Transform the string input to other string...
  const inputTransformed = stringToBytes(create256Hash(input));
  const guide = determineDesicionGuide(inputTransformed)();
  const initState = pipe(
    initializeInstructionSet,
    setConfig(guide),
    create300x300EmptyCanvas,
    assocPath(["input", "encoded"], inputTransformed),
    assocPath(["input", "value"], input)
  )({ ...state });
  console.log(initState);
  /**
   * Transform that string to instructions
   *    -   set Mode Of Interpreting String
   *    -   set state
   *    -   fill array instructions
   *    -   When creating instructions decide from what vertices to start drawing depending on what had been done so far (state of the graph and interpreted substring)
   * Pop instruction by instruction stop when finding a draw instruction, execute it to draw something and repeat until instructions list is empty
   * Return svg
   *  */
};

executeV2("Fabio Alejandro Toscano Mariño", 1);
