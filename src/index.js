import { assocPath, curry, pipe } from "ramda";
import state from "./state";
import { createInstructions, initializeInstructionSet } from "./instruction-set";
import { create300x300EmptyCanvas } from "./canvas";
import { transformToSha256 } from "./sha256";
import { draw } from "./graph";

const immutableState = { ...state };
const conejilloDeIndias = "Fabio Alejandro Toscano Mariño";

const encodeInput = curry((input, state) => {
  return pipe(
    transformToSha256,
    assocPath(["input", "encoded"], __, state),
    assocPath(["input", "value"], input, __)
  )(input);
});

const initProcedure = curry(function (input, immutableState) {
  return pipe(
    initializeInstructionSet,
    encodeInput(input),
    createInstructions,
    draw,
    create300x300EmptyCanvas
  )(immutableState);
});

const run = initProcedure(conejilloDeIndias);

run(immutableState);
