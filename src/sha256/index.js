import { createHash } from "crypto";
import { __, curry, pipe } from "ramda";

const secret =
  "edocnoewt35y5dtk3tds5ij2qñ52546845k5es34ostgd7754ptrhsdgkvbe-xña";

//Function to create hash SHA-256 from a string as parameter and a secret as parameter
export const create256Hash = (string) => {
  return createHash("shake256", { outputLength: 128 })
    .update(string)
    .digest("hex");
};

//Function to convert a string to bytes binary representation
export const stringToBytes = (string) => {
  const buffer = Buffer.from(string, "hex");
  return [...buffer];
};

const fabioHash = create256Hash("Fabio Alejandro Toscano Mariño");

const bytes = stringToBytes(fabioHash);

/**
 * For now everything is red
 */
const determineColor = (guide) => {
  return { ...guide, color: "red" };
};

/**
 * Precondition: Bytes is always a byte array with at least 2 elements
 * @param {Array} bytes
 */
export const determineDesicionGuide = (bytes) => () => {
  const guides = {
    normalGuide: {
      config: {
        //instructionsRanges: [93, 117, 137, 161, 255],
        instructionsRanges: [],
        lengthRanges: [93, 117, 137, 161, 255],
        angleRanges: [93, 117, 137, 161, 255],
      },
    },
    randomGuide: {
      config: {
        /* instructionsRanges: [50, 75, 137, 205, 255], */
        instructionsRanges: [],
        lengthRanges: [50, 75, 137, 205, 255],
        angleRanges: [50, 75, 137, 205, 255],
      },
    },
  };
  const byte = bytes[1];
  if (byte <= 127) {
    return guides["normalGuide"];
  }
  if (byte > 127) {
    return guides["randomGuide"];
  }
};

const configureGuide = pipe(determineDesicionGuide(bytes), determineColor);
const composeInstructions = pipe(configureGuide);
