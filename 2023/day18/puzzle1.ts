import { Vertex, area, perimeter } from "../../utils";

const directions: Record<string, number[]> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1],
};

export const handler = (input: string): number => {
    const lines = input.split("\n").map((line) => line.split(" "));
    const points: Vertex[] = [[0, 0]];
    for (const [direction, meters] of lines) {
        const position = points[points.length - 1];
        const [x, y] = directions[direction];
        points.push([position[0] + Number(meters) * x, position[1] + Number(meters) * y]);
    }
    return area(points) + perimeter(points) * 0.5 + 1;
};
