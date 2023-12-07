export enum Type {
    FiveOfAKind = 0,
    FourOfAKind = 1,
    FullHouse = 2,
    ThreeOfAKind = 3,
    TwoPairs = 4,
    OnePair = 5,
    HighCard = 6,
}

type Hand = {
    cards: string;
    type: Type;
    bid: number;
};

const getCardValue = (card: string): number => {
    switch (card) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        case "T":
            return 10;
        default:
            return Number(card);
    }
};

export const compareCards = (aCards: string, bCards: string, getCardValueFn: (card: string) => number): number => {
    for (let i = 0; i < 5; i++) {
        const aCard = getCardValueFn(aCards[i]);
        const bCard = getCardValueFn(bCards[i]);
        if (aCard > bCard) return 1;
        if (aCard < bCard) return -1;
    }
    return 0;
};

export const getHandType = (cardsMap: Map<string, number>): Type => {
    if (cardsMap.size === 1) return Type.FiveOfAKind;
    if (cardsMap.size === 2) {
        for (const value of cardsMap.values()) {
            if (value === 4) return Type.FourOfAKind;
            if (value === 3) return Type.FullHouse;
        }
    }
    if (cardsMap.size === 3) {
        for (const value of cardsMap.values()) {
            if (value === 3) return Type.ThreeOfAKind;
            if (value === 2) return Type.TwoPairs;
        }
    }
    if (cardsMap.size === 4) return Type.OnePair;
    return Type.HighCard;
};

export const parseHand = ([cards, bid]: string[], getHandTypeFn: (cardsMap: Map<string, number>) => Type): Hand => {
    const cardsMap = new Map<string, number>();
    for (const card of cards) {
        if (cardsMap.has(card)) {
            cardsMap.set(card, (cardsMap.get(card) || 0) + 1);
        } else {
            cardsMap.set(card, 1);
        }
    }
    return { cards, type: getHandTypeFn(cardsMap), bid: Number(bid) };
};

export const handler = (input: string): number => {
    const lines = input.split("\n");
    const hands = lines.map((line) => parseHand(line.split(" "), getHandType));
    return hands
        .sort((a, b) => {
            if (a.type < b.type) return 1;
            if (a.type > b.type) return -1;
            return compareCards(a.cards, b.cards, getCardValue);
        })
        .reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);
};
