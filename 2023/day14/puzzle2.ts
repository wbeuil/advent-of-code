import { memoize, sum, transpose } from "../../utils";
import { computeLoad, tiltLeverLeft } from "./puzzle1";

const resetTranspose = (lines: string[]): string[] => {
    const transposedLines = Array(lines[0].length).fill("");
    for (let i = lines[0].length - 1, j = 0; i >= 0 && j < lines[0].length; i--, j++) {
        transposedLines[j] += lines[i].split("").reverse().join("");
    }
    return transposedLines;
};

const inverseTranspose = (lines: string[]): string[] => {
    const transposedLines = Array(lines[0].length).fill("");
    for (let i = lines[0].length - 1; i >= 0; i--) {
        for (let j = 0; j < lines[i].length; j++) transposedLines[j] += lines[i][j];
    }
    return transposedLines;
};

const fullCycle = memoize((currentRows: string[]): string[] => {
    const transposed1 = transpose(currentRows);
    const tiltedTransposed1 = transposed1.map(tiltLeverLeft);
    const transposed2 = transpose(tiltedTransposed1);
    const tiltedTransposed2 = transposed2.map(tiltLeverLeft);
    const transposed3 = inverseTranspose(tiltedTransposed2);
    const tiltedTransposed3 = transposed3.map(tiltLeverLeft);
    const transposed4 = inverseTranspose(tiltedTransposed3);
    const tiltedTransposed4 = transposed4.map(tiltLeverLeft);
    return resetTranspose(tiltedTransposed4);
});

export const handler = (input: string): number => {
    const cache = new Set<string>();
    let currentRows = input.split("\n");
    for (let i = 0; i < 1000000000; i++) {
        if (cache.has(currentRows.join("\n"))) break;
        cache.add(currentRows.join("\n"));
        currentRows = fullCycle(currentRows);
    }
    const cycles = [...cache];
    const index = cycles.findIndex((rows) => rows === currentRows.join("\n"));
    const pattern = cycles.length - index;
    const lastCycle = cycles[index + ((1000000000 - cycles.length) % pattern)];
    return sum(lastCycle.split("\n").map((row, i) => computeLoad(row, currentRows.length - i)));
};
