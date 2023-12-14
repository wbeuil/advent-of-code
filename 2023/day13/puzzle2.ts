import { transpose } from "../../utils";
import { findReflectionLine } from "./puzzle1";

const countSmudges = (lineA: string, lineB: string): number => {
    let smudges = 0;
    for (let i = 0; i < lineA.length; i++) {
        if (lineA[i] !== lineB[i]) smudges++;
    }
    return smudges;
};

const checkReflectionLine = (lines: string[], index: number): boolean => {
    let smudges = 0;
    for (let i = index - 1, j = index; i >= 0 && j < lines.length; i--, j++) {
        smudges += countSmudges(lines[i], lines[j]);
        if (smudges > 1) return false;
    }
    return smudges === 1;
};

export const handler = (input: string): number => {
    let total = 0;
    const patterns = input.split("\n\n");
    for (const pattern of patterns) {
        const rows = pattern.split("\n");
        const horizontalLine = findReflectionLine(rows, checkReflectionLine);
        if (horizontalLine) {
            total += 100 * horizontalLine;
            continue;
        }
        const columns = transpose(rows);
        const verticalLine = findReflectionLine(columns, checkReflectionLine);
        total += verticalLine;
    }
    return total;
};
