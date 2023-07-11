import { assoc, prop } from "ramda";

export const create300x300EmptyCanvas = (
  state
) => assoc('svg', `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    ${prop('svg', state) || ''}
    </svg>`, state);
