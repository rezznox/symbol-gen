import {
  __,
  apply,
  assocPath,
  bind,
  curry,
  path,
  pipe,
  prop,
  tap,
} from "ramda";

export default {
  graph: undefined,
  config: {
    instructionSet: {},
    guide: {},
  },
  svg: "",
  input: {
    value: undefined,
    encoded: undefined,
  },
  coordinates: undefined,
  instructions: {
    list: [],
    index: 0,
  },
  stack: [],
};

export const mutationSafeZone = curry((modify, state) => {
  const graph = state.graph;
  const instructionSet = state.config.instructionSet;
  const newState = JSON.parse(JSON.stringify(state));
  newState.graph = graph;
  newState.config.instructionSet = instructionSet;
  return (modify && modify(newState)) || newState;
});

export const popStack = (newState) =>
  pipe(
    path(["stack", "pop"]),
    bind(__, prop("stack", newState)),
    apply(__, [])
  )(newState);

export const pushStack = (value, newState) =>
  pipe(
    path(["stack", "push"]),
    bind(__, prop("stack", newState)),
    tap(__, value)
  )(newState);

export const pushInstruction = curry((instruction, newState) =>
  pipe(
    path(["instructions", "list", "push"]),
    bind(__, path(["instructions", "list"], newState)),
    tap(__, instruction)
  )(newState)
);

export const setConfig = assocPath(["config", "guide"], __, __);
