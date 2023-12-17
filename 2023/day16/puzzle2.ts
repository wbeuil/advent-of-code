import { Direction, computeSize } from "./puzzle1";

export const handler = (input: string): number => {
    let max = 0;
    const rows = input.split("\n");
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            let size = 0;
            if (i === 0) size = computeSize(rows, j, i, Direction.Down);
            if (size > max) max = size;
            if (i === rows.length - 1) size = computeSize(rows, j, i, Direction.Up);
            if (size > max) max = size;
            if (j === 0) size = computeSize(rows, j, i, Direction.Right);
            if (size > max) max = size;
            if (j === rows[i].length - 1) size = computeSize(rows, j, i, Direction.Left);
            if (size > max) max = size;
        }
    }
    return max;
};
