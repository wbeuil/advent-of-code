import { writeFileSync } from "fs";

import { lcm } from "../../utils";
import { parseConfiguration, run } from "./puzzle1";

import type { ConjuctionModule, FinalModule, Module } from "./puzzle1";

// Install graphviz first with brew install graphviz
export const graph = (input: string): void => {
    let output = "digraph {\n{\nbroadcaster [shape=invtrapezium]\n";
    const lines = input.split("\n");
    const modules: string[][] = [[], []];
    const edges: string[] = [];
    for (const line of lines) {
        const [name, destinations] = line.split(" -> ");
        if (name.startsWith("%")) modules[0].push(name.substring(1));
        if (name.startsWith("&")) modules[1].push(name.substring(1));
        edges.push(`${name === "broadcaster" ? name : name.substring(1)} -> ${destinations}`);
    }
    output += `${modules[0].join(", ")} [shape=diamond]\n`;
    output += `${modules[1].join(", ")} [shape=invhouse]\n`;
    output += "rx [shape=trapezium]\n}\n";
    output += `${edges.join("\n")}\n}\n`;
    writeFileSync("graph.dot", output);
};

export const handler = (input: string): number => {
    const configuration = parseConfiguration(input, true);
    const finale = configuration.get("rx") as FinalModule;
    const source = configuration.get(finale.source) as ConjuctionModule;
    const array = Object.keys(source.rememberedPulses).map((key) => {
        const clone: Map<string, Module> = new Map(JSON.parse(JSON.stringify([...configuration])));
        return run(clone, key);
    });
    return array.reduce(lcm);
};
