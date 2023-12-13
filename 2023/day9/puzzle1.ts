import { sum } from "../../utils";

const findSequence = (numbers: number[]): number[] => {
    const differences = [];
    for (let i = 1; i < numbers.length; i++) {
        differences.push(numbers[i] - numbers[i - 1]);
    }
    return differences;
};

export const listAllSequences = (history: number[]): number[][] => {
    const sequences = [history];
    let currentSequence = history;
    while (!currentSequence.every((number) => number === 0)) {
        currentSequence = findSequence(currentSequence);
        sequences.push(currentSequence);
    }
    return sequences;
};

export const handler = (input: string): number => {
    return sum(
        input.split("\n").map((line) => {
            const history = line.split(" ").map(Number);
            const sequences = listAllSequences(history);
            for (let i = sequences.length - 1; i >= 0; i--) {
                if (i === sequences.length - 1) sequences[i].push(0);
                else {
                    const lastCurrentIndex = sequences[i][sequences[i].length - 1];
                    const lastPreviousIndex = sequences[i + 1][sequences[i + 1].length - 1];
                    sequences[i].push(lastCurrentIndex + lastPreviousIndex);
                }
            }
            return sequences[0][sequences[0].length - 1];
        }),
    );
};
