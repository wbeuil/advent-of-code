import { sum } from "../../utils";
import { getWinningAndPlayerNumbers } from "./puzzle1";

export const handler = (input: string): number => {
    const cards: Record<number, number> = {};
    return sum(
        input.split("\n").map((line, i) => {
            cards[i + 1] = cards[i + 1] ? cards[i + 1] : 1;
            let copies = 0;
            const [winningNumbers, playerNumbers] = getWinningAndPlayerNumbers(line);
            for (const playerNumber of playerNumbers) {
                if (winningNumbers.includes(playerNumber)) {
                    copies++;
                }
            }
            for (let j = copies; j > 0; j--) {
                cards[i + j + 1] = cards[i + j + 1] ? cards[i + j + 1] + cards[i + 1] : 1 + cards[i + 1];
            }
            return cards[i + 1];
        }),
    );
};
