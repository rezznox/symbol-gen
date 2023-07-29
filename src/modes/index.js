import { sum } from "ramda";
import { JustLines, guide } from "./just-lines.js";

const { pow } = Math;
export const incrementsMode = {
  linear: (acc, inc) => sum([acc, inc]),
  exp: (x, y) => pow(x, y),
};

export const modes = {
  "only-lines": { mode: new JustLines(), guide: guide },
};
