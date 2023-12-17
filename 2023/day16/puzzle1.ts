export enum Direction {
    Right = 0,
    Down = 1,
    Left = 2,
    Up = 3,
}

const draw = (rows: string[], set: Set<string>): void => {
    for (let i = 0; i < rows.length; i++) {
        let row = "";
        for (let j = 0; j < rows[i].length; j++) {
            if (set.has(`${j}-${i}`)) row += "#";
            else row += ".";
        }
        console.log(row);
    }
};

const traverse = (rows: string[], x: number, y: number, direction: Direction, set: Set<string>): void => {
    if (!rows[y] || !rows[y][x]) return;
    const char = rows[y][x];
    if (set.has(`${x}-${y}`) && (char === "-" || char === "|")) return;
    if (!set.has(`${x}-${y}`)) set.add(`${x}-${y}`);
    if (char === ".") {
        if (direction === Direction.Right) traverse(rows, x + 1, y, direction, set);
        if (direction === Direction.Left) traverse(rows, x - 1, y, direction, set);
        if (direction === Direction.Up) traverse(rows, x, y - 1, direction, set);
        if (direction === Direction.Down) traverse(rows, x, y + 1, direction, set);
    }
    if (char === "/") {
        if (direction === Direction.Right) traverse(rows, x, y - 1, Direction.Up, set);
        if (direction === Direction.Left) traverse(rows, x, y + 1, Direction.Down, set);
        if (direction === Direction.Up) traverse(rows, x + 1, y, Direction.Right, set);
        if (direction === Direction.Down) traverse(rows, x - 1, y, Direction.Left, set);
    }
    if (char === "\\") {
        if (direction === Direction.Right) traverse(rows, x, y + 1, Direction.Down, set);
        if (direction === Direction.Left) traverse(rows, x, y - 1, Direction.Up, set);
        if (direction === Direction.Up) traverse(rows, x - 1, y, Direction.Left, set);
        if (direction === Direction.Down) traverse(rows, x + 1, y, Direction.Right, set);
    }
    if (char === "|") {
        if (direction === Direction.Right || direction === Direction.Left) {
            traverse(rows, x, y - 1, Direction.Up, set);
            traverse(rows, x, y + 1, Direction.Down, set);
        }
        if (direction === Direction.Up) traverse(rows, x, y - 1, direction, set);
        if (direction === Direction.Down) traverse(rows, x, y + 1, direction, set);
    }
    if (char === "-") {
        if (direction === Direction.Up || direction === Direction.Down) {
            traverse(rows, x - 1, y, Direction.Left, set);
            traverse(rows, x + 1, y, Direction.Right, set);
        }
        if (direction === Direction.Right) traverse(rows, x + 1, y, direction, set);
        if (direction === Direction.Left) traverse(rows, x - 1, y, direction, set);
    }
};

export const computeSize = (rows: string[], x: number, y: number, direction: Direction, visualize = false): number => {
    const set = new Set<string>();
    traverse(rows, x, y, direction, set);
    if (visualize) {
        console.log(x, y, direction, set.size);
        draw(rows, set);
    }
    return set.size;
};

export const handler = (input: string): number => {
    const rows = input.split("\n");
    return computeSize(rows, 0, 0, Direction.Right);
};
