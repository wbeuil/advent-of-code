import { sum } from "../../utils";

export const getHash = (step: string): number => {
    let value = 0;
    for (let i = 0; i < step.length; i++) {
        value += step.charCodeAt(i);
        value *= 17;
        value %= 256;
    }
    return value;
};

export const handler = (input: string): number => {
    return sum(
        input.split(",").map((step) => {
            return getHash(step);
        }),
    );
};
