import { fillInterior } from "./puzzle1";

enum Direction {
    Right = 0,
    Down = 1,
    Left = 2,
    Up = 3,
}

const parsePlan = (input: string): string[] => {
    const plan = [];
    let x = 0;
    let y = 0;
    const lines = input.split("\n");
    for (const line of lines) {
        const match = line.match(/([a-fA-F0-9]{6})/g);
        if (!match) throw new Error("Could not find hexadecimal");
        const meters = parseInt(match[0].slice(0, 5), 16);
        const direction = Number(match[0].slice(5));
        if (direction === Direction.Right) {
            for (let i = 0; i < Number(meters); i++, x++) plan.push(`${y}:${x}`);
        }
        if (direction === Direction.Left) {
            for (let i = 0; i < Number(meters); i++, x--) plan.push(`${y}:${x}`);
        }
        if (direction === Direction.Down) {
            for (let i = 0; i < Number(meters); i++, y++) plan.push(`${y}:${x}`);
        }
        if (direction === Direction.Up) {
            for (let i = 0; i < Number(meters); i++, y--) plan.push(`${y}:${x}`);
        }
    }
    return plan;
};

export const handler = (input: string): number => {
    const plan = parsePlan(input);
    const interior = fillInterior(plan);
    return plan.length + interior;
};
