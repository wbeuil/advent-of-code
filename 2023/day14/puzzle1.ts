import { sum, transpose } from "../../utils";

export const computeLoad = (row: string, n: number): number => {
    let load = 0;
    for (let i = 0; i < row.length; i++) {
        load += row[i] === "O" ? n : 0;
    }
    return load;
};

const appendRow = (row: string, startIndex: number, endIndex?: number): string => {
    let str = "";
    const part = row.slice(startIndex, endIndex);
    let roundedRocks = part.match(/O/g)?.length || 0;
    while (roundedRocks-- > 0) str += "O";
    for (let i = str.length; i < part.length; i++) str += ".";
    return str;
};

export const tiltLeverLeft = (row: string): string => {
    let tiltedRow = "";
    let currentIndex = 0;
    let cubeIndex = -1;
    while ((cubeIndex = row.indexOf("#", currentIndex)) !== -1) {
        tiltedRow += appendRow(row, currentIndex, cubeIndex);
        tiltedRow += "#";
        currentIndex = cubeIndex + 1;
    }
    tiltedRow += appendRow(row, currentIndex);
    return tiltedRow;
};

export const handler = (input: string): number => {
    let rows = input.split("\n");
    const transposed = transpose(rows);
    const tiltedTransposed = transposed.map(tiltLeverLeft);
    rows = transpose(tiltedTransposed);
    return sum(rows.map((row, i) => computeLoad(row, rows.length - i)));
};
