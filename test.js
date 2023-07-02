import { pipe } from "ramda";
import { initializeInstructionSet } from "./src/instruction-set.js";
import state from "./src/state.js";

const newState = {...state};

console.log(pipe(initializeInstructionSet)(newState));