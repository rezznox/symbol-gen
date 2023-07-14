import { __, assocPath, curry, pipe } from "ramda";
import state from "./state.js";
import { createInstructions, initializeInstructionSet } from "./instruction-set.js";
import { create300x300EmptyCanvas } from "./canvas.js";
import { transformToSha256 } from "./sha256/index.js";
import { draw } from "./graph.js";

const immutableState = { ...state };
const conejilloDeIndias = "Fabio Alejandro Toscano Mariño";

const encodeInput = curry((input, state) => {
  return pipe(
    transformToSha256,
    assocPath(["input", "encoded"], __, state),
    assocPath(["input", "value"], input, __)
  )(input);
});

const configure = curry(function (input, immutableState) {
  return pipe(
    initializeInstructionSet,
    encodeInput(input),
    createInstructions,
    draw,
    create300x300EmptyCanvas
  )(immutableState);
});

const run = configure(conejilloDeIndias);

console.log(run(immutableState));
