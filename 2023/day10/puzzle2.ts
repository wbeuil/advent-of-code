import { parseMap } from "./puzzle1";

import type { Node } from "./puzzle1";

const openers = ["|", "L", "J"];

const floodFill = (map: Record<string, Node>, loop: Record<string, Node>, visualize = false): number => {
    let enclosedTiles = 0;
    let openedLoop = false;
    let currentRow = 0;
    for (const node in map) {
        const [row] = node.split(",");
        if (Number(row) !== currentRow) {
            currentRow = Number(row);
            openedLoop = false;
            if (visualize) process.stdout.write("\n");
        }
        if (!loop[node]) {
            if (openedLoop) {
                enclosedTiles++;
                if (visualize) process.stdout.write("\x1b[32mI\x1b[0m");
            } else {
                if (visualize) process.stdout.write(" ");
            }
        }
        if (loop[node]) {
            if (openers.includes(loop[node].pipe)) {
                openedLoop = !openedLoop;
            }
            if (visualize) process.stdout.write(loop[node].pipe);
        }
    }
    if (visualize) process.stdout.write("\n");
    return enclosedTiles;
};

const translateStartNode = (map: Record<string, Node>, startNode: string): void => {
    const [row, column] = startNode.split(",").map(Number);
    const nextNode = map[startNode].next;
    if (!nextNode) throw new Error("Failed to find next node");
    const [nextRow, nextColumn] = nextNode.split(",").map(Number);
    const previousNode = map[startNode].previous;
    if (!previousNode) throw new Error("Failed to find previous node");
    const [previousRow, previousColumn] = previousNode.split(",").map(Number);
    if (column === nextColumn && column === previousColumn) map[startNode].pipe = "|";
    if (row === nextRow && row === previousRow) map[startNode].pipe = "-";
    if (
        (row === nextRow + 1 && column === previousColumn - 1) ||
        (row === previousRow + 1 && column === nextColumn - 1)
    )
        map[startNode].pipe = "L";
    if (
        (row === nextRow + 1 && column === previousColumn + 1) ||
        (row === previousRow + 1 && column === nextColumn + 1)
    )
        map[startNode].pipe = "J";
    if (
        (row === nextRow - 1 && column === previousColumn + 1) ||
        (row === previousRow - 1 && column === nextColumn + 1)
    )
        map[startNode].pipe = "7";
    if (
        (row === nextRow - 1 && column === previousColumn - 1) ||
        (row === previousRow - 1 && column === nextColumn - 1)
    )
        map[startNode].pipe = "F";
};

const getLoop = (map: Record<string, Node>, startNode: string): Record<string, Node> => {
    const loop: Record<string, Node> = {};
    loop[startNode] = map[startNode];
    let nextNode = map[startNode].next;
    let previousNode = map[startNode].previous;
    while (nextNode && previousNode && nextNode !== previousNode) {
        loop[nextNode] = map[nextNode];
        loop[previousNode] = map[previousNode];
        const tmpNextNode = map[nextNode].next;
        nextNode = tmpNextNode && !loop[tmpNextNode] ? tmpNextNode : map[nextNode].previous;
        const tmpPreviousNode = map[previousNode].previous;
        previousNode = tmpPreviousNode && !loop[tmpPreviousNode] ? tmpPreviousNode : map[previousNode].next;
    }
    if (nextNode && previousNode && nextNode === previousNode) {
        loop[nextNode] = map[nextNode];
    }
    return loop;
};

export const handler = (input: string): number => {
    const [map, startNode] = parseMap(input);
    const loop = getLoop(map, startNode);
    translateStartNode(map, startNode);
    return floodFill(map, loop);
};
