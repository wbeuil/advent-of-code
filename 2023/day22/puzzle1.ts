import { incrementLetter, max, min } from "../../utils";

export type Brick = [ax: number, ay: number, az: number, bx: number, by: number, bz: number, letter: string];

const draw = (bricks: Brick[]): void => {
    const minX = min(bricks.map(([sx, , , ex]) => min([sx, ex])));
    const maxX = max(bricks.map(([sx, , , ex]) => max([sx, ex])));
    const minY = min(bricks.map(([, sy, , , ey]) => min([sy, ey])));
    const maxY = max(bricks.map(([, sy, , , ey]) => max([sy, ey])));
    const maxZ = max(bricks.map(([, , sz, , , ez]) => max([sz, ez])));
    for (let z = maxZ; z >= 0; z--) {
        let line = "";
        for (let x = minX; x < maxX + 1; x++) {
            const bricksAtX = bricks.filter(([sx, , sz, ex, , ez]) => sx <= x && x <= ex && sz <= z && z <= ez);
            if (z === 0) line += "-";
            else if (bricksAtX.length === 0) line += ".";
            else if (bricksAtX.length === 1) line += bricksAtX[0][6];
            else line += "?";
        }
        line += "\t";
        for (let y = minY; y < maxY + 1; y++) {
            const bricksAtY = bricks.filter(([, sy, sz, , ey, ez]) => sy <= y && y <= ey && sz <= z && z <= ez);
            if (z === 0) line += "-";
            else if (bricksAtY.length === 0) line += ".";
            else if (bricksAtY.length === 1) line += bricksAtY[0][6];
            else line += "?";
        }
        console.log(line);
    }
};

export const parseBricks = (input: string): Brick[] => {
    let currentLetter = "A";
    return input
        .split("\n")
        .map((line) => line.replace("~", ",").split(",").map(Number) as Brick)
        .map((b) => {
            b.push(currentLetter);
            currentLetter = incrementLetter(currentLetter);
            return b;
        })
        .sort(sortBricks);
};

export const sortBricks = (a: Brick, b: Brick): number => a[2] - b[2];

const overlaps = (a: Brick, b: Brick): boolean =>
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4]);

export const fall = (bricks: Brick[], visualize = false): Brick[] => {
    if (visualize) draw(bricks);
    for (let i = 0; i < bricks.length; i++) {
        let maxZ = 1;
        const brick = bricks[i];
        for (const check of bricks.slice(0, i)) {
            if (overlaps(brick, check)) maxZ = Math.max(maxZ, check[5] + 1);
        }
        brick[5] -= brick[2] - maxZ;
        brick[2] = maxZ;
    }
    bricks.sort(sortBricks);
    if (visualize) draw(bricks);
    return bricks;
};

export const supports = (bricks: Brick[]): { [k: string]: Set<number> }[] => {
    const lSupportsU = Object.fromEntries(Array.from({ length: bricks.length }, (_) => new Set<number>()).entries());
    const uSupportsL = Object.fromEntries(Array.from({ length: bricks.length }, (_) => new Set<number>()).entries());
    for (const [j, upper] of bricks.entries()) {
        for (const [i, lower] of bricks.slice(0, j).entries()) {
            if (overlaps(lower, upper) && upper[2] === lower[5] + 1) {
                lSupportsU[i].add(j);
                uSupportsL[j].add(i);
            }
        }
    }
    return [lSupportsU, uSupportsL];
};

const bricksSafeToDisintegrate = (bricks: Brick[]): number => {
    const [lSupportsU, uSupportsL] = supports(bricks);
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
        if ([...lSupportsU[i]].every((j) => uSupportsL[j].size >= 2)) total++;
    }
    return total;
};

export const handler = (input: string): number => {
    const bricks = parseBricks(input).sort(sortBricks);
    return bricksSafeToDisintegrate(fall(bricks));
};
