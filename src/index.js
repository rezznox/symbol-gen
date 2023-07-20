import { __, assocPath, curry, path, pipe, prop } from "ramda";
import state from "./state.js";
import { createInstructions, initializeInstructionSet } from "./instruction-set.js";
import { create300x300EmptyCanvas } from "./canvas.js";
import { determineDesicionGuide, transformToSha256 } from "./sha256/index.js";
import { draw } from "./graph.js";
import onlyLines from "./guides/only-lines.js";

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
  const {guide} = onlyLines;
  return assocPath(['config', 'guide'], guide, state);
}

const configure = curry(function (input, immutableState) {
  return pipe(
    initializeInstructionSet,
    encodeInput(input),
    setGuide,
    createInstructions,
    draw,
    create300x300EmptyCanvas
  )(immutableState);
});

const run = configure(conejilloDeIndias);

console.log(run(immutableState));
