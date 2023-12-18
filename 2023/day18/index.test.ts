import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day18", () => {
    test("puzzle1", () => {
        const input = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`;
        expect(p1(sanitizeInput(input))).toBe(62);
    });
    test("puzzle2", () => {
        const input = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`;
        expect(p2(sanitizeInput(input))).toBe(952408144115);
    });
});
