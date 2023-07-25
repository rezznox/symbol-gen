import { JustLines, guide } from "./just-lines.js";

export const incrementsMode = {
  linear: (acc, inc) => sum([acc, inc]),
  exp: (x, y) => Math.pow(x, y),
};

export const modes = {
    'only-lines': {mode: JustLines, guide: guide}
}