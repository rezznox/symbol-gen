import { find } from "ramda";
import { getGuide, getInstructions } from "../state.js";
import { incrementsMode } from "./index.js";

export const guide = {
  instructionsRanges: { "0-255": "0x02" },
  lengthRanges: [93, 117, 137, 161, 255],
  lengthIncrementMode: "linear",
  lengthIncrements: 10,
  angleRanges: [93, 117, 137, 161, 255],
  angleIncrementMode: "linear",
  angleIncrements: 15,
  prefilledNodes: [
    { x: 150, y: 100 },
    { x: 150, y: 110 },
    { x: 150, y: 120 },
    { x: 150, y: 130 },
    { x: 150, y: 140 },
    { x: 150, y: 150 },
    { x: 150, y: 160 },
    { x: 150, y: 170 },
    { x: 150, y: 180 },
    { x: 150, y: 190 },
    { x: 150, y: 200 },
  ],
};

export function JustLines() {
  this.getLength = (state, i) => {
    const {
      input: { encoded },
    } = state;
    const { lengthRanges, lengthIncrementMode, lengthIncrements } =
      getGuide(state);
    const byte = encoded[i];
    let increment = lengthIncrements;
    let first = true;
    find((range) => {
      if (!first) {
        increment = incrementsMode[lengthIncrementMode](
          increment,
          lengthIncrements
        );
      }
      first = false;
      return byte < range;
    }, lengthRanges);
    return { value: increment, index: i + 1 };
  };

  this.getAngle = (state, i) => {
    const {
      input: { encoded },
    } = state;
    const { angleRanges, angleIncrementMode, angleIncrements } =
      getGuide(state);
    const byte = encoded[i];
    let increment = 0;
    let first = true;
    find((range) => {
      if (!first) {
        increment = incrementsMode[angleIncrementMode](
          increment,
          angleIncrements
        );
      }
      first = false;
      return byte < range;
    }, angleRanges);
    return { value: increment, index: i + 1 };
  };

  this.getIndex = (state, i) => {
    return {value: i, index: i};
  }
}
