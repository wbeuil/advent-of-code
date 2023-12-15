import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day15", () => {
    test("puzzle1", () => {
        const input = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;
        expect(p1(sanitizeInput(input))).toBe(1320);
    });
    test("puzzle2", () => {
        const input = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;
        expect(p2(sanitizeInput(input))).toBe(145);
    });
});
