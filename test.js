import { __, applyTo, pipe, tap } from "ramda";
import { createInsertToStack, drawLinesInAngle, initializeInstructionSet, insertToStack } from "./src/instruction-set.js";
import state from "./src/state.js";
import { toRadians } from "./src/conversions.js";

const newState = {...state};

/* console.log(pipe(initializeInstructionSet, )(newState));
 */
/* console.log(pipe(initializeInstructionSet, insertToStack)(newState)); */

/* console.log(pipe(initializeInstructionSet, createInsertToStack(10))(newState)) */
//console.log(pipe(initializeInstructionSet, drawLinesInAngle)(newState))

/* console.log(pipe(initializeInstructionSet, )); */
const { cos } = Math;
console.log(applyTo(toRadians(45))(cos))