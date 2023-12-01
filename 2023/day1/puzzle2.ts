const findAndReplace = (input: string): string => {
    const digits: Record<string, string> = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };
    const regexp = new RegExp(`(?=(${Object.keys(digits).join("|")}))`, "g");
    return input.replace(regexp, (_, p1) => digits[p1]); // it will only append to the string at the firstIndex, not replace it
};

export const handler = (input: string): number => {
    return input
        .split("\n")
        .map((t) => {
            const replacedT = findAndReplace(t);
            const numbers = replacedT.match(/\d/g);
            return parseInt(`${numbers![0]}${numbers![numbers!.length - 1]}`, 10);
        })
        .reduce((acc, cur) => acc + cur, 0);
};
