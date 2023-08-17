import { assoc, prop } from "ramda";
import { calculateDistance } from "./utils/calculations-2D.js";

export const calcDistanceToCenter = calculateDistance({x:150, y:150});

export const create300x300EmptyCanvas = (
  state
) => assoc('svg', `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    ${prop('svg', state) || ''}
    </svg>`, state);
