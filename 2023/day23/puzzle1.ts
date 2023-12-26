export type Point = {
    x: number;
    y: number;
    dir: number;
    dist: number;
};

export class GridPoint {
    x: number;
    y: number;
    obstacle: boolean;
    char: string;
    constructor(x: number, y: number, char: string) {
        this.x = x;
        this.y = y;
        this.obstacle = char === "#";
        this.char = char;
    }
}

export const initGrid = (input: string): [GridPoint[][], GridPoint | null, GridPoint | null] => {
    const rows = input.split("\n");
    let start: GridPoint | null = null;
    let end: GridPoint | null = null;
    const grid: GridPoint[][] = new Array(rows.length);
    for (let i = 0; i < rows.length; i++) {
        grid[i] = new Array(rows[i].length);
    }
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            grid[i][j] = new GridPoint(i, j, rows[i][j]);
            if (i === 0 && rows[i][j] === ".") start = grid[i][j];
            if (i === grid.length - 1 && rows[i][j] === ".") end = grid[i][j];
        }
    }
    return [grid, start, end];
};

export const traverse = (grid: GridPoint[][], start: GridPoint, end: GridPoint): number => {
    let maxDist = 0;
    const todo: Point[] = [{ x: start.x, y: start.y, dir: -1, dist: 0 }];
    const distances = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    while (todo.length > 0) {
        const cur = todo.shift();
        if (!cur) continue;
        if (cur.x === end.x && cur.y === end.y) {
            if (cur.dist > maxDist) maxDist = cur.dist;
            continue;
        }
        for (let i = 0; i < 4; i++) {
            if (cur.dir === (i + 2) % 4) continue;
            const x = cur.x + distances[i][0];
            const y = cur.y + distances[i][1];
            if (x < 0 || y < 0 || x > grid[0].length - 1 || y > grid.length - 1) continue;
            if (grid[x][y].obstacle) continue;
            const dir = i;
            const dist = cur.dist + 1;
            if (dir === 2 && grid[x][y].char === ">") continue;
            if (dir === 3 && grid[x][y].char === "v") continue;
            todo.push({ x, y, dir, dist });
        }
    }
    return maxDist;
};

export const handler = (input: string): number => {
    const [grid, start, end] = initGrid(input);
    if (!start) throw new Error("No start point found");
    if (!end) throw new Error("No end point found");
    return traverse(grid, start, end);
};
