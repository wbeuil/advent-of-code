export const handler = (input: string): number => {
    return input
        .split("\n")
        .map((t) => {
            const numbers = t.match(/\d/g);
            return parseInt(`${numbers![0]}${numbers![numbers!.length - 1]}`, 10);
        })
        .reduce((acc, cur) => acc + cur, 0);
};
