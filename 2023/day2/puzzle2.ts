import { sum } from "../../utils";
import { findMaxByColor } from "./puzzle1";

export const handler = (input: string): number => {
    return sum(
        input.split("\n").map((t) => {
            const maxRed = findMaxByColor(t, "red");
            const maxGreen = findMaxByColor(t, "green");
            const maxBlue = findMaxByColor(t, "blue");
            return maxRed * maxGreen * maxBlue;
        }),
    );
};
