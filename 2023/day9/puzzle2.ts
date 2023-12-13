import { sum } from "../../utils";
import { listAllSequences } from "./puzzle1";

export const handler = (input: string): number => {
    return sum(
        input.split("\n").map((line) => {
            const history = line.split(" ").map(Number);
            const sequences = listAllSequences(history);
            for (let i = sequences.length - 1; i >= 0; i--) {
                if (i === sequences.length - 1) sequences[i].unshift(0);
                else {
                    const firstCurrentIndex = sequences[i][0];
                    const firstPreviousIndex = sequences[i + 1][0];
                    sequences[i].unshift(firstCurrentIndex - firstPreviousIndex);
                }
            }
            return sequences[0][0];
        }),
    );
};
