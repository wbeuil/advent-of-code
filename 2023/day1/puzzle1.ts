export const handler = (input: string): number => {
    return input
        .split("\n")
        .map((t) => {
            const numbers = t.match(/\d/g);
            if (!numbers) throw new Error("Could not find number"); // should never happen
            return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`, 10);
        })
        .reduce((acc, cur) => acc + cur, 0);
};
