import {
  __,
  assoc,
  assocPath,
  curry,
  inc,
  multiply,
  path,
  pipe,
  prop,
  subtract,
  sum,
} from "ramda";
import { cos, fix, sin } from "./conversions.js";
import { mutationSafeZone, popStack, pushInstruction } from "./state.js";

export const insertToStack = curry((state) => {
  const getIncrementedIndex = (state) => {
    return pipe(path(["instructions", "index"]), inc)(state);
  };

  const setNewInstructionIndex = (index, state) => {
    return assocPath(["instructions", "index"], index, state);
  };

  const getValue = (index, state) => {
    return path(["instructions", "list", index])(state);
  };

  return mutationSafeZone((newState) => {
    const incr = getIncrementedIndex(newState);
    const value = getValue(incr, newState);
    pushInstruction(value, newState);
    return setNewInstructionIndex(inc(incr), newState);
  }, state);
});

export const createInsertToStack = curry((value, state) => {
  return mutationSafeZone((newState) => {
    pushInstruction('0x01', newState);
    pushInstruction(value, newState);
    return newState;
  }, state);
});

export const drawLinesInAngle = (state) => {
  return mutationSafeZone((newState) => {
    let move = {};
    const getMove = (string) => prop(string[0], move);
    move = assoc("angle", popStack(newState), move);
    move = assoc("l", popStack(newState), move);
    move = assoc("color", popStack(newState), move);
    move = assoc("initX", popStack(newState), move);
    move = assoc("initY", popStack(newState), move);
    const dy1 = multiply(getMove`l`, sin(getMove`angle`));
    const dx1 = multiply(getMove`l`, cos(getMove`angle`));

    const end = {
      y: subtract(getMove`initY`, dy1),
      x: sum([getMove`initX`, dx1]),
    };

    let svg = prop("svg", newState);

    svg = `${svg}<line fill="none" stroke="${getMove`color`}" x1="${getMove`initX`}" y1="${getMove`initY`}" x2="${fix(
      end.x,
      2
    )}" y2="${fix(end.y, 2)}" stroke-width="2"></line>`;

    return assoc("svg", svg, newState);
  }, state);
};

export const createDrawLinesInAngle = curry(
  (angle, length, color, initX, initY, state) => {
    return mutationSafeZone((newState) => {
      const transitionState = pipe(
        createInsertToStack(initX),
        createInsertToStack(initY),
        createInsertToStack(color),
        createInsertToStack(length),
        createInsertToStack(angle)
      )(newState);
      pushInstruction('0x02', transitionState);
      return transitionState
    }, state);
  }
);

const drawSemiCircle = () => {
  //TODO: implement
};

const createDrawSemiCircle = () => {
  //TODO: implement
};

const drawCircle = () => {
  //TODO: implement
};

const createDrawCircle = () => {
  //TODO: implement
};

const instructionsMap = {
  0x01: {
    instruction: insertToStack,
    createInstruction: createInsertToStack,
  },
  0x02: {
    instruction: drawLinesInAngle,
    createInstruction: createDrawLinesInAngle,
  },
  0x03: {
    instruction: drawSemiCircle,
    createInstruction: createDrawSemiCircle,
  },
  0x04: {
    instruction: drawCircle,
    createInstruction: createDrawCircle,
  },
  0x05: undefined,
  0x06: undefined,
  0x07: undefined,
  0x08: undefined,
};

export const initializeInstructionSet = (state) => {
  return mutationSafeZone((newState) => {
    return assocPath(["config", "instructionSet"], instructionsMap)(newState);
  }, state);
};
