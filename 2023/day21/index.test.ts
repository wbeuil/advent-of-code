import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";

describe("day21", () => {
    test("puzzle1", () => {
        const input = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`;
        expect(p1(sanitizeInput(input), 6)).toBe(16);
    });
});
