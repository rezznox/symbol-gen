import { path } from "ramda";
import {
  createDrawLinesInAngle,
  drawLinesInAngle,
  initializeInstructionSet,
} from "../src/instruction-set";
import state from "../src/state";

it("creates draw in line angle instruction", () => {
  const newState = { ...state };
  const stateInit = initializeInstructionSet(newState);
  const result = createDrawLinesInAngle(20, 50, "red", 150, 160, stateInit);
  expect(JSON.stringify(path(["instructions", "list"], result))).toBe(
    JSON.stringify([
      '0x01',
      150,
      '0x01',
      160,
      '0x01',
      "red",
      '0x01',
      50,
      '0x01',
      20,
      '0x02',
    ])
  );
});

it("draws line in 20 degrees angle", () => {
  const newState = { ...state };
  console.log({ newState });
  const stateInit = initializeInstructionSet(newState);
  stateInit.stack = [20, 50, "red", 150, 150].reverse();
  stateInit.svg = "";
  expect(drawLinesInAngle(stateInit).svg).toBe(
    '<line fill="none" stroke="red" x1="150" y1="150" x2="196.98" y2="132.90" stroke-width="2"></line>'
  );
});

it("draws line in 120 degrees angle", () => {
  const newState = { ...state };
  const stateInit = initializeInstructionSet(newState);
  stateInit.stack = [120, 50, "red", 150, 150].reverse();
  stateInit.svg = "";
  expect(drawLinesInAngle(stateInit).svg).toBe(
    '<line fill="none" stroke="red" x1="150" y1="150" x2="125.00" y2="106.70" stroke-width="2"></line>'
  );
});
