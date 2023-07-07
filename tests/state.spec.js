import { initializeInstructionSet } from "../src/instruction-set";
import state, { popStack, pushInstruction, pushStack } from "../src/state";

it("push to stack", () => {
  const newState = { ...state };
  const stateInit = initializeInstructionSet(newState);
  const value = "x";
  pushStack(value, stateInit);
  expect(stateInit.stack[0]).toBe(value);
});

it("push to instructions list", () => {
  const newState = { ...state };
  const stateInit = initializeInstructionSet(newState);
  const value = "x";
  pushInstruction(value, stateInit);
  expect(stateInit.instructions.list[0]).toBe(value);
});

it("pop stack", () => {
    const newState = { ...state };
    const stateInit = initializeInstructionSet(newState);
    stateInit.stack.push('x');
    stateInit.stack.push('y');
    const y = popStack(stateInit);
    console.log({y})
    expect(stateInit.stack.length).toBe(1);
    expect(y).toBe('y');
    expect(stateInit.stack[0]).toBe('x');
});
