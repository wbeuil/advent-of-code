export const findMaxByColor = (input: string, color: string): number => {
    const numbers = [];
    const regexp = new RegExp(`(\\d+) ${color}`, "g");
    for (const match of input.matchAll(regexp)) {
        numbers.push(parseInt(match[1], 10));
    }
    return Math.max(...numbers);
};

export const handler = (input: string): number => {
    const bag = { red: 12, green: 13, blue: 14 };
    return input
        .split("\n")
        .map((t, i) => {
            for (const color of Object.keys(bag)) {
                const max = findMaxByColor(t, color);
                if (max > bag[color]) return 0;
            }
            return i + 1;
        })
        .reduce((acc, cur) => acc + cur, 0);
};
