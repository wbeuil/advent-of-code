import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { argv } from "process";

import { sanitizeInput } from "./utils";

if (argv.length < 3) {
    console.log("Usage: bun create <day> <year>");
    process.exit(1);
}

const day = argv[2];
const year = argv[3];

for (let i = 1; i < 3; i++) {
    console.log(`Creating puzzle${i} for year ${year} day ${day}`);
    const puzzle = `./${year}/day${day}/puzzle${i}.ts`;
    if (existsSync(puzzle)) {
        console.log(`File ${puzzle} does already exist`);
        continue;
    }
    if (!existsSync(dirname(puzzle))) {
        mkdirSync(dirname(puzzle), { recursive: true })
    }
    writeFileSync(puzzle, sanitizeInput(`
export const handler = (input: string): number => {
    return 1
}
`))
    console.log(`File ${puzzle} created`);
}

const test = `./${year}/day${day}/index.test.ts`;
if (!existsSync(test)) {
    writeFileSync(test, sanitizeInput(`
import { describe, expect, test } from "bun:test";

import { sanitizeInput } from "../../utils";
import { handler as p1 } from "./puzzle1";
import { handler as p2 } from "./puzzle2";

describe("day1", () => {
    test("puzzle1", () => {
        const input = \`\`
        expect(p1(sanitizeInput(input))).toBe(1);
    });
    test("puzzle2", () => {
        const input = \`\`
        expect(p2(sanitizeInput(input))).toBe(1);
    });
});
`))
    console.log(`Test file created`);
}
