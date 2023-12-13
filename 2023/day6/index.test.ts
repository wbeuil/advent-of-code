import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day6", () => {
    test("puzzle1", () => {
        const input = `
Time:      7  15   30
Distance:  9  40  200
`;
        expect(p1(sanitizeInput(input))).toBe(288);
    });
    test("puzzle2", () => {
        const input = `
Time:      7  15   30
Distance:  9  40  200
`;
        expect(p2(sanitizeInput(input))).toBe(71503);
    });
});
