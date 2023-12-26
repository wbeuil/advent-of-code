import { initGrid } from "./puzzle1";

import type { GridPoint, Point } from "./puzzle1";

const getPoints = (grid: GridPoint[][], start: GridPoint, end: GridPoint): Set<string> => {
    const points = new Set<string>();
    points.add(`${start.x},${start.y}`);
    const distances = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (const point of grid.flat()) {
        if (point.obstacle) continue;
        let neighbors = 0;
        for (let i = 0; i < 4; i++) {
            const x = point.x + distances[i][0];
            const y = point.y + distances[i][1];
            if (x < 0 || y < 0 || x > grid[0].length - 1 || y > grid.length - 1) continue;
            if (grid[x][y].obstacle) continue;
            neighbors++;
        }
        if (neighbors > 2) points.add(`${point.x},${point.y}`);
    }
    points.add(`${end.x},${end.y}`);
    return points;
};

const getGraph = (grid: GridPoint[][], start: GridPoint, end: GridPoint): { [k: string]: Record<string, number> } => {
    const points = getPoints(grid, start, end);
    const graph = Object.fromEntries([...points].map((point) => [point, {} as Record<string, number>]));
    const distances = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    for (const point of points) {
        const [x, y] = point.split(",").map(Number);
        const done = new Set<string>();
        const todo: Point[] = [{ x, y, dir: -1, dist: 0 }];
        while (todo.length > 0) {
            const cur = todo.shift();
            if (!cur) continue;
            if (cur.dist && points.has(`${cur.x},${cur.y}`)) {
                graph[point][`${cur.x},${cur.y}`] = cur.dist;
                continue;
            }
            for (let i = 0; i < 4; i++) {
                if (cur.dir === (i + 2) % 4) continue;
                const x = cur.x + distances[i][0];
                const y = cur.y + distances[i][1];
                if (x < 0 || y < 0 || x > grid[0].length - 1 || y > grid.length - 1) continue;
                if (grid[x][y].obstacle) continue;
                if (done.has(`${x},${y}`)) continue;
                const dir = i;
                const dist = cur.dist + 1;
                todo.push({ x, y, dir, dist });
            }
            done.add(`${cur.x},${cur.y}`);
        }
    }
    return graph;
};

const getLongestPath = (grid: GridPoint[][], start: GridPoint, end: GridPoint): number => {
    const graph = getGraph(grid, start, end);
    const seen = new Set<string>();
    const dfs = (point: string): number => {
        if (point === `${end.x},${end.y}`) return 0;
        let max = -Infinity;
        seen.add(point);
        const connections = graph[point];
        for (const [p, dist] of Object.entries(connections)) {
            if (!seen.has(p)) max = Math.max(max, dfs(p) + dist);
        }
        seen.delete(point);
        return max;
    };
    return dfs(`${start.x},${start.y}`);
};

export const handler = (input: string): number => {
    const [grid, start, end] = initGrid(input);
    if (!start) throw new Error("No start point found");
    if (!end) throw new Error("No end point found");
    return getLongestPath(grid, start, end);
};
