export class GridPoint {
    x: number;
    y: number;
    char: string;
    obstacle: boolean;
    neighbors: GridPoint[];
    constructor(x: number, y: number, char: string) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.obstacle = char === "#";
        this.neighbors = [];
    }
    updateNeighbors(grid: GridPoint[][]) {
        const i = this.x;
        const j = this.y;
        if (grid[i][j].obstacle) return;
        if (i > 0 && !grid[i - 1][j].obstacle) this.neighbors.push(grid[i - 1][j]);
        if (j > 0 && !grid[i][j - 1].obstacle) this.neighbors.push(grid[i][j - 1]);
        if (i < grid.length - 1 && !grid[i + 1][j].obstacle) this.neighbors.push(grid[i + 1][j]);
        if (j < grid[i].length - 1 && !grid[i][j + 1].obstacle) this.neighbors.push(grid[i][j + 1]);
    }
}

export const initGrid = (input: string): [GridPoint[][], GridPoint | null] => {
    const rows = input.split("\n");
    let start: GridPoint | null = null;
    const grid: GridPoint[][] = new Array(rows.length);
    for (let i = 0; i < rows.length; i++) {
        grid[i] = new Array(rows[i].length);
    }
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            grid[i][j] = new GridPoint(i, j, rows[i][j]);
            if (rows[i][j] === "S") start = grid[i][j];
        }
    }
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            grid[i][j].updateNeighbors(grid);
        }
    }
    return [grid, start];
};

const walk = (start: GridPoint, steps: number): number => {
    const currentSteps = [start];
    let i = steps;
    while (i-- > 0) {
        const nextSteps = new Set<GridPoint>();
        while (currentSteps.length) {
            const current = currentSteps.shift();
            if (!current) continue;
            for (const neighbor of current.neighbors) nextSteps.add(neighbor);
        }
        currentSteps.push(...nextSteps);
    }
    return currentSteps.length;
};

export const handler = (input: string, steps = 64): number => {
    const [, start] = initGrid(input);
    if (!start) throw new Error("No starting point found");
    return walk(start, steps);
};
