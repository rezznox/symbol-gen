import { __, pipe, tap } from "ramda";
import { createInsertToStack, initializeInstructionSet, insertToStack } from "./src/instruction-set.js";
import state from "./src/state.js";

const newState = {...state};

/* console.log(pipe(initializeInstructionSet, )(newState));
 */
/* console.log(pipe(initializeInstructionSet, insertToStack)(newState)); */

console.log(pipe(initializeInstructionSet, createInsertToStack(10))(newState))

/* console.log(pipe(initializeInstructionSet, )); */