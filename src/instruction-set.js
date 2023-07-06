import {
  __,
  assocPath,
  bind,
  curry,
  inc,
  path,
  pipe,
  prop,
  tap
} from "ramda";
import { toRadians } from "./conversions.js";
import { mutationSafeZone } from "./state.js";

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
    pipe(path(["stack", "push"]), bind(__, prop('stack', newState)), tap(__, value))(newState);
    return setNewInstructionIndex(inc(incr), newState);
  }, state);
});

export const createInsertToStack = curry((value, state) => {
  return mutationSafeZone((newState) => {
    pipe(path(["instructions", "list", 'push']), bind(__, path(['instructions', 'list'], newState)), tap(__, 0x01))(newState)
    pipe(path(["instructions", "list", 'push']), bind(__, path(['instructions', 'list'], newState)), tap(__, value))(newState);
    console.log({newState});
    return newState;
  }, state);
});

const drawLinesInAngle = () => {
  const move = {
    angle: stack.pop(),
    l: stack.pop(),
    color: stack.pop(),
  };
  const dy1 = move.l * Math.sin(toRadians(move.angle));
  const dx1 = move.l * Math.cos(toRadians(move.angle));
  const right = {
    y: progress.pencilPosition.y - dy1,
    x: progress.pencilPosition.x + dx1,
  };
  const dy2 = move.l * Math.sin(toRadians(move.angle));
  const dx2 = move.l * Math.cos(toRadians(180 - move.angle));

  const left = {
    y: progress.pencilPosition.y - dy2,
    x: progress.pencilPosition.x + dx2,
  };

  svgDraft.svg += `<line fill="none" stroke="${move.color}" x1="${progress.pencilPosition.x}" y1="${progress.pencilPosition.y}" x2="${right.x}" y2="${right.y}" stroke-width="2"> </line >`;
  svgDraft.svg += `<line fill="none" stroke="${move.color}" x1="${progress.pencilPosition.x}" y1="${progress.pencilPosition.y}" x2="${left.x}" y2="${left.y}" stroke-width="2"> </line >`;
};

const createDrawLinesInAngle = () => {
  //TODO: implement
}

const drawSemiCircle = () => {
  //TODO: implement
};


const createDrawSemiCircle = () => {
  //TODO: implement
}

const drawCircle = () => {
  //TODO: implement
};

const createDrawCircle = () => {
  //TODO: implement
}

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
    return assocPath(['config', 'instructionSet'], instructionsMap)(newState);
  }, state);
};
