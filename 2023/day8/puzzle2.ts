import { parseNodes } from "./puzzle1";

import type { Node } from "./puzzle1";

const gcd = (a: number, b: number): number => {
    return !b ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
    return a * (b / gcd(a, b));
};

const traverseNodes = (instructions: string, nodes: Record<string, Node>): number => {
    const startNodes = Object.keys(nodes).filter((key) => key.endsWith("A"));
    const stepsPerCycle = startNodes.map((startNode) => {
        let i = 0;
        let steps = 0;
        let currentNode = startNode;
        while (!currentNode.endsWith("Z")) {
            if (i === instructions.length) {
                i = 0;
            }
            const instruction = instructions[i];
            const nextNode = nodes[currentNode][instruction === "L" ? "leftElement" : "rightElement"];
            currentNode = nextNode;
            i++;
            steps++;
        }
        return steps;
    });
    return stepsPerCycle.reduce(lcm);
};

export const handler = (input: string): number => {
    const [instructions, network] = input.split("\n\n");
    const nodes = parseNodes(network);
    return traverseNodes(instructions, nodes);
};
