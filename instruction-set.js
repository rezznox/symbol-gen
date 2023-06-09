import { curry } from "ramda";
import { toRadians } from "./conversions";

export const InstructionHub = curry(
  (progress, stack, instructions, svgDraft, instruction) => {
    const insertToStack = () => {
      progress.i++;
      stack.push(instructions[progress.i]);
    };

    const drawVerticalLine = () => {
      const move = {
        x: stack.pop(),
        y: stack.pop(),
        v: stack.pop(),
        color: stack.pop(),
      };
      svgDraft.svg += `<path fill="none" stroke="${move.color}" d="M ${move.x} ${move.y} v ${move.v}" stroke-width="2"> </path>`;
    };

    const drawHorizontalLine = () => {
      const move = {
        x: stack.pop(),
        y: stack.pop(),
        v: stack.pop(),
        color: stack.pop(),
      };
      svgDraft.svg += `<path fill="none" stroke="${move.color}" d="M ${move.x} ${move.y} h ${move.v}" stroke-width="2"> </path>`;
    };

    const drawLinesInAngle = () => {
      const move = {
        angle: stack.pop(),
        l: stack.pop(),
        color: stack.pop(),
      };
      const dy1 = move.l * Math.sin(toRadians(move.angle));
      const dx1 = move.l * Math.cos(toRadians(move.angle));
      const right = {
        y: progress.pencilPosition.y - dy1,
        x: progress.pencilPosition.x + dx1,
      }
      const dy2 = move.l * Math.sin(toRadians(move.angle));
      const dx2 = move.l * Math.cos(toRadians(180-move.angle));

      const left = {
        y: progress.pencilPosition.y - dy2,
        x: progress.pencilPosition.x + dx2,
      }

      svgDraft.svg += `<line fill="none" stroke="${move.color}" x1="${progress.pencilPosition.x}" y1="${progress.pencilPosition.y}" x2="${right.x}" y2="${right.y}" stroke-width="2"> </line >`;
      svgDraft.svg += `<line fill="none" stroke="${move.color}" x1="${progress.pencilPosition.x}" y1="${progress.pencilPosition.y}" x2="${left.x}" y2="${left.y}" stroke-width="2"> </line >`;
    };

    const drawSemiCircle = () => {
      //TODO: implement
    }

    const instructionsMap = {
      0x01: insertToStack,
      0x02: drawVerticalLine,
      0x03: drawHorizontalLine,
      0x04: drawLinesInAngle,
      0x05: drawSemiCircle,
      0x06: undefined,
      0x07: undefined,
      0x08: undefined,
      0x09: undefined,
    };

    return instructionsMap[instruction];
  }
);
