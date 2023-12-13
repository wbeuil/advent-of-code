import { sum } from "../../utils";
import { findCoordinates, isAdjacent } from "./puzzle1";

export const handler = (input: string): number => {
    const candidates: number[] = [];
    const [numbers, symbols] = findCoordinates(input);
    for (const symbol of symbols) {
        if (symbol.char !== "*") continue;
        const adjacentNumbers = [];
        for (const number of numbers) {
            if (isAdjacent(number, symbol)) {
                adjacentNumbers.push(number.int);
            }
        }
        if (adjacentNumbers.length === 2) {
            candidates.push(adjacentNumbers[0] * adjacentNumbers[1]);
        }
    }
    return sum(candidates);
};
