import { compareCards, getHandType, parseHand, Type } from "./puzzle1";

const getCardValue = (card: string): number => {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 1;
        case "T":
            return 10;
        default:
            return Number(card);
    }
};

const getHandTypeWithJoker = (cardsMap: Map<string, number>): Type => {
    if (cardsMap.has("J")) {
        let keyToChange = "";
        for (const [key, value] of cardsMap.entries()) {
            if (key !== "J" && value > (cardsMap.get(keyToChange) || 0)) {
                keyToChange = key;
            }
        }
        if (keyToChange) {
            cardsMap.set(keyToChange, (cardsMap.get(keyToChange) || 0) + (cardsMap.get("J") || 0));
            cardsMap.delete("J");
        }
    }
    return getHandType(cardsMap);
};

export const handler = (input: string): number => {
    const lines = input.split("\n");
    const hands = lines.map((line) => parseHand(line.split(" "), getHandTypeWithJoker));
    return hands
        .sort((a, b) => {
            if (a.type < b.type) return 1;
            if (a.type > b.type) return -1;
            return compareCards(a.cards, b.cards, getCardValue);
        })
        .reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);
};
