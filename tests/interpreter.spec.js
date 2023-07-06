import { execute } from "../src/interpreter.js";
import { writeFile } from "node:fs";

const performInterpreterTest = (instructions, name) => {
  const { stack, svgCanvas } = execute(instructions);
  writeFile(
    `./tests/imgs/${name}.svg`,
    svgCanvas,
    { encoding: "utf-8" },
    () => {}
  );
  return stack;
};

const test1 = "red-line-downward-from-center";
it(test1, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, 150, 0x01, 150, 0x02],
      test1
    ).length
  ).toBe(0);
});

const test2 = "red-line-upward-from-center";
it(test2, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, -50, 0x01, 150, 0x01, 150, 0x02],
      test2
    ).length
  ).toBe(0);
});

const test3 = "red-line-left-from-center";
it(test3, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, -50, 0x01, 150, 0x01, 150, 0x03],
      test3
    ).length
  ).toBe(0);
});

const test4 = "red-line-right-from-center";
it(test4, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, 150, 0x01, 150, 0x03],
      test4
    ).length
  ).toBe(0);
});

const test5 = "red-centered-cross";
it(test5, () => {
  expect(
    performInterpreterTest(
      [
        0x01,
        "red",
        0x01,
        50,
        0x01,
        150,
        0x01,
        150,
        0x02,
        0x01,
        "red",
        0x01,
        -50,
        0x01,
        150,
        0x01,
        150,
        0x02,
        0x01,
        "red",
        0x01,
        -50,
        0x01,
        150,
        0x01,
        150,
        0x03,
        0x01,
        "red",
        0x01,
        50,
        0x01,
        150,
        0x01,
        150,
        0x03,
      ],
      test5
    ).length
  ).toBe(0);
});

const test6 = "red-line-20-degrees-from-center";
it(test6, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, 20, 0x04],
      test6
    ).length
  ).toBe(0);
});

const test7 = "red-line-60-degrees-from-center";
it(test7, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, 60, 0x04],
      test7
    ).length
  ).toBe(0);
});

const test8 = "red-line-minus-20-degrees-from-center";
it(test8, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, -20, 0x04],
      test8
    ).length
  ).toBe(0);
});

const test9 = "red-line-minus-80-degrees-from-center";
it(test9, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, -80, 0x04],
      test9
    ).length
  ).toBe(0);
});


const test10 = "red-line-minus-85-degrees-from-center";
it(test10, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, -85, 0x04],
      test10
    ).length
  ).toBe(0);
});


const test11 = "red-line-5-degrees-from-center";
it(test11, () => {
  expect(
    performInterpreterTest(
      [0x01, "red", 0x01, 50, 0x01, 5, 0x04],
      test11
    ).length
  ).toBe(0);
});
