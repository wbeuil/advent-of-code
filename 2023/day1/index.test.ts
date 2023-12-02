import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day1", () => {
    test("puzzle1", () => {
        const input = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;
        expect(p1(sanitizeInput(input))).toBe(142);
    });
    test("puzzle2", () => {
        const input = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;
        expect(p2(sanitizeInput(input))).toBe(281);
        const input2 = "nineight";
        expect(p2(sanitizeInput(input2))).toBe(98);
    });
});
