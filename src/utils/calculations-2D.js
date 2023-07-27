import { curry, subtract, sum, tryCatch } from "ramda";

export const calculateMGiven2Points = (x1, y1, x2, y2) => {
  return +((y1 - y2) / (x1 - x2)).toFixed(4);
};

export const calculateLineEquationGive2Points = (x1, y1, x2, y2) => {
  const m = calculateMGiven2Points(x1, y1, x2, y2);
  const b = y1 - x1 * m;
  return { m, b };
};
// returns x colission value between two lines
export const calculateColissionBetweenTwoLines = tryCatch(
  ({ m: m1, b: b1 }, { m: m2, b: b2 }) => {
    return (b2 - b1) / (m1 - m2);
  },
  () => {
    return NaN;
  }
);

export const calculateY = (x, { m, b }) => {
  return x * m + b;
};

export const calculateDistance = curry(
  tryCatch(
    ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
      const { pow } = Math;
      return Number(
        pow(
          sum([pow(subtract(x1, x2), 2), pow(subtract(y1, y2), 2)]),
          0.5
        ).toFixed(4)
      );
    },
    () => NaN
  )
);
