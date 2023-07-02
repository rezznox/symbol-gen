import { curry, pipe } from "ramda";
import state from "./state";
import { initializeInstructionSet } from "./instruction-set";

const immutableState = { ...state };
const conejilloDeIndias = "Fabio Alejandro Toscano Mariño";

const initProcedure = curry(function (input, immutableState) {
  return pipe(
    initializeInstructionSet,
    encodeInput(input),
    createListOfInstructions,
    draw
  )(immutableState);
});

const run = initProcedure(conejilloDeIndias);

run(immutableState);
