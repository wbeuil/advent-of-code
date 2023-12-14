import { memoize, sum } from "../../utils";

export const countAllCombinations = memoize((springs: string, records: number[]): number => {
    const spring = springs[0];
    if (!spring) {
        return records.length === 0 ? 1 : 0;
    }
    if (spring === ".") {
        return countAllCombinations(springs.slice(1), records);
    }
    if (spring === "#") {
        const record = records[0];
        if (!record || record > springs.length || springs[record] === "#" || springs.slice(0, record).includes("."))
            return 0;
        return countAllCombinations(springs.slice(record + 1), records.slice(1));
    }
    return (
        countAllCombinations(`.${springs.slice(1)}`, records) + countAllCombinations(`#${springs.slice(1)}`, records)
    );
});

export const handler = (input: string): number => {
    return sum(
        input
            .split("\n")
            .map((line) => {
                const [springs, conditions] = line.split(" ");
                const unfoldedSprings = Array(5).fill(springs).join("?");
                const unfoldedConditions = Array(5).fill(conditions).join(",");
                return `${unfoldedSprings} ${unfoldedConditions}`;
            })
            .map((line) => {
                const [springs, conditions] = line.split(" ");
                const records = conditions.split(",").map(Number);
                return countAllCombinations(springs, records);
            }),
    );
};
