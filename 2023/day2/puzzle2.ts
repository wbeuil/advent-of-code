import { findMaxByColor } from "./puzzle1";

export const handler = (input: string): number => {
    return input
        .split("\n")
        .map((t) => {
            const maxRed = findMaxByColor(t, "red");
            const maxGreen = findMaxByColor(t, "green");
            const maxBlue = findMaxByColor(t, "blue");
            return maxRed * maxGreen * maxBlue;
        })
        .reduce((acc, cur) => acc + cur, 0);
};
