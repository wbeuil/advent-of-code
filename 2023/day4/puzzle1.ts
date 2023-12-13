import { sum } from "../../utils";

export const getWinningAndPlayerNumbers = (line: string): [number[], number[]] => {
    const matches = line.match(/Card (?: *\d+): ( *\d+(?: *\d+)*) \| ( *\d+(?: *\d+)*)/);
    if (!matches) throw new Error(`Invalid line: ${line}`);
    const winningNumbers = matches[1].match(/\d+/g)?.map(Number) || [];
    const playerNumbers = matches[2].match(/\d+/g)?.map(Number) || [];
    return [winningNumbers, playerNumbers];
};

export const handler = (input: string): number => {
    return sum(
        input.split("\n").map((line) => {
            let points = 0;
            const [winningNumbers, playerNumbers] = getWinningAndPlayerNumbers(line);
            for (const playerNumber of playerNumbers) {
                if (winningNumbers.includes(playerNumber)) {
                    points = !points ? 1 : points * 2;
                }
            }
            return points;
        }),
    );
};
