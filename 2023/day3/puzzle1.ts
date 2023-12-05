type NumberCoordinate = {
    int: number;
    startIndex: number;
    endIndex: number;
    line: number;
}

type SymbolCoordinate = {
    char: string;
    index: number;
    line: number;
}

export const isAdjacent = (number: NumberCoordinate, symbol: SymbolCoordinate): boolean => {
    if (Math.abs(symbol.line - number.line) < 2) {
        const distanceStartIndex = Math.abs(symbol.index - number.startIndex)
        const distanceEndIndex = Math.abs(symbol.index - number.endIndex)
        const minDistance = Math.min(distanceStartIndex, distanceEndIndex)
        if (minDistance < 2) return true
    }
    return false
}

export const findCoordinates = (input: string): [NumberCoordinate[], SymbolCoordinate[]] => {
    const lines = input.split("\n")
    const numbers: NumberCoordinate[] = []
    for (let i = 0; i < lines.length; i++) {
        const matches = [...lines[i].matchAll(/(\d+)/g)];
        matches.forEach((match) => {
            if (match.index !== undefined) {
                numbers.push({
                    int: parseInt(match[0], 10),
                    startIndex: match.index,
                    endIndex: match.index + match[0].length - 1,
                    line: i
                })
            }
        });
    }
    const symbols: SymbolCoordinate[] = []
    for (let i = 0; i < lines.length; i++) {
        const matches = [...lines[i].matchAll(/[^.\d\s]/g)]
        matches.forEach((match) => {
            if (match.index !== undefined) {
                symbols.push({
                    char: match[0],
                    index: match.index,
                    line: i
                })
            }
        })
    }
    return [numbers, symbols]
}

export const handler = (input: string): number => {
    const candidates = []
    const [numbers, symbols] = findCoordinates(input)
    for (const number of numbers) {
        for (const symbol of symbols) {
            if (isAdjacent(number, symbol)) {
                candidates.push(number.int)
            }
        }
    }
    return candidates.reduce((acc, cur) => acc + cur, 0)
}
