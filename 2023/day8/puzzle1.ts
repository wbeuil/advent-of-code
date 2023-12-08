export type Node = {
    leftElement: string;
    rightElement: string;
};

const traverseNodes = (instructions: string, nodes: Record<string, Node>): number => {
    let i = 0;
    let steps = 0;
    let currentNode = "AAA";
    while (currentNode !== "ZZZ") {
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
};

export const parseNodes = (network: string): Record<string, Node> => {
    const nodes: Record<string, Node> = {};
    for (const node of network.split("\n")) {
        const [element, connections] = node.split(" = ");
        const matches = connections.matchAll(/\(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/g);
        const [, leftElement, rightElement] = matches.next().value;
        nodes[element] = { leftElement, rightElement };
    }
    return nodes;
};

export const handler = (input: string): number => {
    const [instructions, network] = input.split("\n\n");
    const nodes = parseNodes(network);
    return traverseNodes(instructions, nodes);
};
