import { mincut } from "@graph-algorithm/minimum-cut";

export const handler = (input: string): number => {
    let wires = input.split("\n").flatMap((line) => {
        const [start, ...ends] = line.split(/\W+/);
        return ends.map((end) => [start, end]);
    });
    const wiresToCut = [...mincut(wires)];
    wires = wires.filter((wire) => wiresToCut.every((wireToCut) => new Set([...wire, ...wireToCut]).size > 2));
    const allComponents = new Set(wires.flat());
    const groupedComponents = new Set<string>();
    const dfs = (vertex: string, visited: Set<string>) => {
        visited.add(vertex);
        for (const [v1, v2] of wires) {
            if (vertex === v1 && !visited.has(v2)) dfs(v2, visited);
            else if (vertex === v2 && !visited.has(v1)) dfs(v1, visited);
        }
    };
    dfs(wires[0][0], groupedComponents);
    return groupedComponents.size * (allComponents.size - groupedComponents.size);
};
