export type Node = {
    pipe: string;
    next?: string;
    previous?: string;
};

const countDistanceFromStart = (map: Record<string, Node>, startNode: string): number => {
    let distance = 1;
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
        distance++;
    }
    return distance;
};

const getPipes = (pipe: string, i: number, j: number): Node => {
    if (pipe === "." || pipe === "S") return { pipe };
    if (pipe === "|") return { pipe, next: `${i - 1},${j}`, previous: `${i + 1},${j}` };
    if (pipe === "-") return { pipe, next: `${i},${j + 1}`, previous: `${i},${j - 1}` };
    if (pipe === "L") return { pipe, next: `${i - 1},${j}`, previous: `${i},${j + 1}` };
    if (pipe === "J") return { pipe, next: `${i - 1},${j}`, previous: `${i},${j - 1}` };
    if (pipe === "7") return { pipe, next: `${i + 1},${j}`, previous: `${i},${j - 1}` };
    if (pipe === "F") return { pipe, next: `${i + 1},${j}`, previous: `${i},${j + 1}` };
    throw new Error(`Unknown pipe ${pipe}`);
};

export const parseMap = (input: string): [Record<string, Node>, string] => {
    let startNode: string | undefined;
    const map: Record<string, Node> = {};
    const lines = input.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            map[`${i},${j}`] = getPipes(char, i, j);
            if (char === "S") startNode = `${i},${j}`;
        }
    }
    if (!startNode) throw new Error("Failed to find start node");
    const [row, column] = startNode.split(",");
    const startAdjacentNodes: Record<string, Node> = {};
    startAdjacentNodes[`${Number(row) - 1},${column}`] = map[`${Number(row) - 1},${column}`];
    startAdjacentNodes[`${row},${Number(column) + 1}`] = map[`${row},${Number(column) + 1}`];
    startAdjacentNodes[`${Number(row) + 1},${column}`] = map[`${Number(row) + 1},${column}`];
    startAdjacentNodes[`${row},${Number(column) - 1}`] = map[`${row},${Number(column) - 1}`];
    const connectedNodes = Object.keys(startAdjacentNodes).filter(
        (node) => startAdjacentNodes[node]?.next === startNode || startAdjacentNodes[node]?.previous === startNode,
    );
    if (connectedNodes.length !== 2) throw new Error("Found more than 2 connected nodes from start node");
    map[startNode].next = connectedNodes[0];
    map[startNode].previous = connectedNodes[1];
    return [map, startNode];
};

export const handler = (input: string): number => {
    const [map, startNode] = parseMap(input);
    return countDistanceFromStart(map, startNode);
};
