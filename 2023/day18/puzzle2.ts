import { Vertex, area, perimeter } from "../../utils";

const directions: number[][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

export const handler = (input: string): number => {
    const lines = input.split("\n");
    const points: Vertex[] = [[0, 0]];
    for (const line of lines) {
        const match = line.match(/([a-fA-F0-9]{6})/g);
        if (!match) throw new Error("Could not find hexadecimal");
        const direction = Number(match[0].slice(5));
        const meters = parseInt(match[0].slice(0, 5), 16);
        const position = points[points.length - 1];
        const [x, y] = directions[direction];
        points.push([position[0] + Number(meters) * x, position[1] + Number(meters) * y]);
    }
    return area(points) + perimeter(points) * 0.5 + 1;
};
