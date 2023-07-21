import {
  __,
  append,
  converge,
  curry,
  find,
  head,
  identity,
  keys,
  last,
  map,
  pipe,
  prop,
  split,
  thunkify,
  values,
} from "ramda";
import { findRangeOnObject } from "./src/utils/object-operations.js";
import {
  createDrawLinesInAngle,
  createInsertToStack,
  drawLinesInAngle,
  insertToStack,
} from "./src/instruction-set.js";
import state from "./src/state.js";

const instructionsMap = {
  "0x01": {
    instruction: insertToStack,
    createInstruction: createInsertToStack,
  },
  "0x02": {
    instruction: drawLinesInAngle,
    createInstruction: createDrawLinesInAngle,
  },
  "0x05": undefined,
  "0x06": undefined,
  "0x07": undefined,
  "0x08": undefined,
};
const takeInstruction = (byte) => {
  const findRangeForByte = findRangeOnObject(byte);
  return converge(prop, [pipe(findRangeForByte), identity]);
};

const createDrawLinesInAngleWithPreloadedState = (state) =>
  instructionsMap["0x02"].createInstruction(__, __, __, __, __, state);

const eatCurryUntilSatiated = curry((f, params) => {
  let result = f(params[0]);
  let type = typeof f;
  let i = 1;
  while (type === "function") {
    result = result(params[i]);
    type = typeof result;
    i++;
  }
  return result;
});

const main = () => {
  const newState = JSON.parse(JSON.stringify(state));
  //const drawLine = createDrawLinesInAngleWithPreloadedState(newState);
  /* const eatDrawLine = eatCurryUntilSatiated(drawLine); */
  /* const x = converge((x, y) => [x, y], [
    pipe(createDrawLinesInAngleWithPreloadedState, eatCurryUntilSatiated),
    pipe(createDrawLinesInAngleWithPreloadedState, eatCurryUntilSatiated)
  ])(state); */
  //console.log(pipe(...x)([1,2,3,4,5,6,7]));
  /* const result = pipe(thunkify(eatDrawLine)([1,2,3,4,5,6,7]), thunkify(eatDrawLine)([1,2,3,4,5,6,7]))();
    console.log(thunkify(eatDrawLine)([1,2,3,4,5,6,7])()); */
  
  while(newState.build.encodedIndex < newState.input.encoded.length) {
    const inst = takeInstruction(111)({ "1-255": "0x02" });
    const createInst = instructionsMap[inst].createInstruction
    createInst(newState);
  }
};

main();
/* console.log(takeInstruction(111)({ "1-255": "0x02" })); */
