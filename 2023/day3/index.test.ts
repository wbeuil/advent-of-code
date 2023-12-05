import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day1", () => {
    test("puzzle1", () => {
        const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;
        expect(p1(sanitizeInput(input))).toBe(4361);
    });
    test("puzzle2", () => {
        const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;
        expect(p2(sanitizeInput(input))).toBe(467835);
    });
});
