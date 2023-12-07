import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day1", () => {
    test("puzzle1", () => {
        const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;
        expect(p1(sanitizeInput(input))).toBe(6440);
    });
    test("puzzle2", () => {
        const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;
        expect(p2(sanitizeInput(input))).toBe(5905);
    });
});
