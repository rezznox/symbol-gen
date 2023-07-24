export const incrementsMode = {
  linear: (acc, inc) => sum([acc, inc]),
  exp: (x, y) => Math.pow(x, y),
};
