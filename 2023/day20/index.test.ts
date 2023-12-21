import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";

describe("day20", () => {
    test("puzzle1", () => {
        const input = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`;
        expect(p1(sanitizeInput(input))).toBe(32000000);
        const input2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`;
        expect(p1(sanitizeInput(input2))).toBe(11687500);
    });
});
