import { initGrid, traverse } from "./puzzle1";

export const handler = (input: string): number => {
    const grid = initGrid(input);
    const end = traverse(grid, [4, 10]);
    if (!end) throw new Error("No path found");
    return end.cost;
};
