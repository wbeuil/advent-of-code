import { GridPoint, initGrid } from "./puzzle1";

const mod = (x: number, n: number) => ((x % n) + n) % n;

const walk = (grid: GridPoint[][], start: GridPoint, steps: number, height: number, width: number): number => {
    const todo = [{ x: start.x, y: start.y }];
    const done = new Set<string>();
    const distances = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const points = [];
    for (let i = 0; i <= steps; i++) {
        for (const current of todo.splice(0)) {
            const key = `${current.x},${current.y}`;
            if (done.has(key)) continue;
            done.add(key);
            for (let j = 0; j < 4; j++) {
                const x = current.x + distances[j][0];
                const y = current.y + distances[j][1];
                if (grid[mod(x, height)][mod(y, width)].char === ".") todo.push({ x, y });
            }
        }
        if (i % width === Math.floor(width / 2)) {
            points.push(
                [...done].map((p) => p.split(",").map(Number)).filter(([x, y]) => mod(x + y, 2) === i % 2).length,
            );
            if (points.length === 3) break;
        }
    }
    const [p1, p2, p3] = points;
    const c = p1;
    const b = (4 * p2 - p3 - 3 * c) / 2;
    const a = p2 - c - b;
    const x = (steps - 65) / 131;
    return a * x ** 2 + b * x + c;
};

export const handler = (input: string, steps = 26501365): number => {
    const rows = input.split("\n");
    const height = rows.length;
    const width = rows[0].length;
    const [grid, start] = initGrid(input);
    if (!start) throw new Error("No starting point found");
    grid[start.x][start.y].char = ".";
    return walk(grid, start, steps, height, width);
};
