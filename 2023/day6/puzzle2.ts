import { computeRecords } from "./puzzle1";

import type { Race } from "./puzzle1";

const parseRace = (input: string): Race => {
    const lines = input.split("\n");
    const time = Number(lines[0].match(/(\d+)/g)?.join(""));
    const distance = Number(lines[1].match(/(\d+)/g)?.join(""));
    return { time, distance };
};

export const handler = (input: string): number => {
    const race = parseRace(input);
    const records = computeRecords(race);
    return records.length;
};
