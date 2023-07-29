import { __, assocPath, curry, path, pipe, prop } from "ramda";
import state from "./state.js";
import { createInstructions, initializeInstructionSet } from "./instruction-set.js";
import { create300x300EmptyCanvas } from "./canvas.js";
import { transformToSha256 } from "./sha256/index.js";
import { draw, initializeGraph } from "./graph.js";
import { mode } from "./parsed-env.js";
import { modes } from "./modes/index.js";

const immutableState = { ...state };
const conejilloDeIndias = "Fabio Alejandro Toscano Mariño";

const encodeInput = curry((input, state) => {
  return pipe(
    transformToSha256,
    assocPath(["input", "encoded"], __, state),
    assocPath(["input", "value"], input, __)
  )(input);
});

const setGuide = (state) => {
  const guideAndMode = modes[mode];
  return assocPath(['config'], guideAndMode, state);
}
 const debugPipe = (state) => {console.log(state); return state};
const configure = curry(function (input, immutableState) {
  return pipe(
    initializeInstructionSet,
    setGuide,
    initializeGraph,
    encodeInput(input),
    createInstructions,
    debugPipe,
    draw,
    create300x300EmptyCanvas
  )(immutableState);
});

const run = configure(conejilloDeIndias);

console.log(run(immutableState));
