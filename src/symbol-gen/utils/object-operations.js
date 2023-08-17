import { converge, find, head, keys, last, map, pipe, split } from "ramda";
import { isBetweeen } from "./comparisons.js";

export const findRangeOnObject = (byte) => {
  return pipe(
    keys,
    find((key) =>
      converge(isBetweeen, [head, last, () => byte])(
        map(Number, split("-", key))
      )
    )
  );
};
