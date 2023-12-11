type Galaxy = {
    x: number;
    y: number;
};

export const computeShortestPath = (galaxyA: Galaxy, galaxyB: Galaxy): number => {
    return Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y);
};

export const parseGalaxies = (input: string, n: number): Galaxy[] => {
    const galaxies = [];
    const emptyRows = [];
    const emptyColumns = [];
    const rows = input.split("\n");
    for (let i = 0; i < rows.length; i++) {
        const match = rows[i].match(/[^.]/g);
        if (!match) emptyRows.push(i);
    }
    for (let j = 0; j < rows[0].length; j++) {
        let isEmpty = true;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] === "#") {
                isEmpty = false;
                break;
            }
        }
        if (isEmpty) emptyColumns.push(j);
    }
    for (let i = 0; i < rows.length; i++) {
        const matches = [...rows[i].matchAll(/#/g)];
        for (const match of matches) {
            const index = match.index || 0;
            const row = emptyRows.filter((r) => i > r).length * (n - 1) + i;
            const column = emptyColumns.filter((c) => index > c).length * (n - 1) + index;
            galaxies.push({
                x: row,
                y: column,
            });
        }
    }
    return galaxies;
};

export const handler = (input: string): number => {
    const shortestPaths = [];
    const galaxies = parseGalaxies(input, 2);
    for (let i = 0; i < galaxies.length; i++) {
        const galaxyA = galaxies[i];
        for (const galaxyB of galaxies.slice(i + 1)) {
            shortestPaths.push(computeShortestPath(galaxyA, galaxyB));
        }
    }
    return shortestPaths.reduce((acc, cur) => acc + cur, 0);
};
