import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day16", () => {
    test("puzzle1", () => {
        const input = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;
        expect(p1(sanitizeInput(input))).toBe(46);
    });
    test("puzzle2", () => {
        const input = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;
        expect(p2(sanitizeInput(input))).toBe(51);
    });
});
