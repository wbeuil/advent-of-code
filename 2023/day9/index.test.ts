import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day1", () => {
    test("puzzle1", () => {
        const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;
        expect(p1(sanitizeInput(input))).toBe(114);
    });
    test("puzzle2", () => {
        const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;
        expect(p2(sanitizeInput(input))).toBe(2);
    });
});
