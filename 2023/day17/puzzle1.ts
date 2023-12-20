type Point = {
    x: number;
    y: number;
    dir: number;
    dist: number;
    cost: number;
    parent: Point | null;
};

class GridPoint {
    x: number;
    y: number;
    heat: number;
    constructor(x: number, y: number, heat: number) {
        this.x = x;
        this.y = y;
        this.heat = heat;
    }
}

const drawGrid = (grid: GridPoint[][], end: Point): void => {
    let temp = end;
    const path = [temp];
    while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
    }
    for (let i = 0; i < grid.length; i++) {
        let row = "";
        for (let j = 0; j < grid[i].length; j++) {
            const current = grid[i][j];
            const found = path.find((p) => p.x === current.x && p.y === current.y);
            if (found?.parent) {
                if (found.parent.x === current.x && found.parent.y < current.y) row += ">";
                if (found.parent.x === current.x && found.parent.y > current.y) row += "<";
                if (found.parent.x > current.x && found.parent.y === current.y) row += "^";
                if (found.parent.x < current.x && found.parent.y === current.y) row += "v";
            } else row += grid[i][j].heat;
        }
        console.log(row);
    }
};

export const initGrid = (input: string): GridPoint[][] => {
    const rows = input.split("\n");
    const grid: GridPoint[][] = new Array(rows.length);
    for (let i = 0; i < rows.length; i++) {
        grid[i] = new Array(rows[i].length);
    }
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            grid[i][j] = new GridPoint(i, j, Number(rows[i][j]));
        }
    }
    return grid;
};

export const traverse = (grid: GridPoint[][], blocks: number[], visualize = false): Point | null => {
    const done = new Set<string>();
    const todo: Point[] = [{ x: 0, y: 0, dir: -1, dist: 0, cost: 0, parent: null }];
    const distances = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    while (todo.length > 0) {
        const cur = todo.shift();
        if (!cur || done.has(`${cur.x},${cur.y},${cur.dir},${cur.dist}`)) continue;
        done.add(`${cur.x},${cur.y},${cur.dir},${cur.dist}`);
        for (let i = 0; i < 4; i++) {
            if (cur.dir === (i + 2) % 4) continue;
            const x = cur.x + distances[i][0];
            const y = cur.y + distances[i][1];
            if (x < 0 || y < 0 || x > grid[0].length - 1 || y > grid.length - 1) continue;
            const dir = i;
            const isSameDirection = dir === cur.dir;
            const dist = isSameDirection ? cur.dist + 1 : 1;
            const [min, max] = blocks;
            if (isSameDirection && dist > max) continue;
            if (min > 1 && cur.cost > 0 && !isSameDirection && cur.dist < min) continue;
            const cost = cur.cost + grid[x][y].heat;
            const parent = cur;
            if (x === grid.length - 1 && y === grid[0].length - 1) {
                const end = { x, y, dir, dist, cost, parent };
                if (visualize) drawGrid(grid, end);
                return end;
            }
            todo.push({ x, y, dir, dist, cost, parent });
        }
        todo.sort((a, b) => a.cost - b.cost);
    }
    return null;
};

export const handler = (input: string): number => {
    const grid = initGrid(input);
    const end = traverse(grid, [1, 3]);
    if (!end) throw new Error("No path found");
    return end.cost;
};
