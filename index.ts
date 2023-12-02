import { existsSync } from "fs";
import { argv } from "process";

import { getInput } from "./utils.ts";

if (argv.length < 3) {
    console.log("Usage: bun solve <day> <year>");
    process.exit(1);
}

const day = argv[2];
const year = argv[3];

for (let i = 1; i < 3; i++) {
    console.log(`Resolving puzzle${i} for year ${year} day ${day}`);
    const puzzle = `./${year}/day${day}/puzzle${i}.ts`;
    if (!existsSync(puzzle)) {
        console.log(`File ${puzzle} does not exist`);
        continue;
    }
    const input = await getInput(day, year);
    const { handler } = await import(puzzle);
    const output = handler(input);
    console.log(`Output: ${output}`);
}
