enum Direction {
    Right = "R",
    Down = "D",
    Left = "L",
    Up = "U",
}

const findMinMax = (plan: string[]): { minX: number; maxX: number; minY: number; maxY: number } => ({
    minX: plan.map((p) => Number(p.split(":")[1])).reduce((a, b) => Math.min(a, b), Infinity),
    maxX: plan.map((p) => Number(p.split(":")[1])).reduce((a, b) => Math.max(a, b), -Infinity) + 1,
    minY: plan.map((p) => Number(p.split(":")[0])).reduce((a, b) => Math.min(a, b), Infinity),
    maxY: plan.map((p) => Number(p.split(":")[0])).reduce((a, b) => Math.max(a, b), -Infinity) + 1,
});

export const fillInterior = (plan: string[], visualize = false): number => {
    let interior = 0;
    const { minX, maxX, minY, maxY } = findMinMax(plan);
    for (let i = minY; i < maxY; i++) {
        let open = false;
        for (let j = minX; j < maxX; j++) {
            if (!open && plan.includes(`${i}:${j}`) && plan.includes(`${i + 1}:${j}`)) open = true;
            else if (open && plan.includes(`${i}:${j}`) && plan.includes(`${i + 1}:${j}`)) open = false;
            else if (open && !plan.includes(`${i}:${j}`)) interior++;
            if (plan.includes(`${i}:${j}`) && visualize) process.stdout.write("#");
            else if (open && !plan.includes(`${i}:${j}`) && visualize) process.stdout.write("#");
            else if (visualize) process.stdout.write(".");
        }
        if (visualize) process.stdout.write("\n");
    }
    return interior;
};

const parsePlan = (input: string): string[] => {
    const plan = [];
    let x = 0;
    let y = 0;
    const lines = input.split("\n");
    for (const line of lines) {
        const [direction, meters] = line.split(" ");
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
