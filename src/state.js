import { curry } from "ramda";

export default {
    graph: undefined,
    config: {
        instructionSet: {}
    },
    svg: undefined,
    input: {
        value: undefined,
        encoded: undefined
    },
    coordinates: undefined,
    instructions: {
        list: [],
        index: 0,
    },
    stack: [],
}

export const mutationSafeZone = curry((modify, state) => {
    const graph = state.graph;
    const instructionSet = state.config.instructionSet;
    const newState = JSON.parse(JSON.stringify(state));
    newState.graph = graph;
    newState.config.instructionSet = instructionSet;
    return (modify && modify(newState)) || newState;
})