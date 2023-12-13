import { sum } from "../../utils";
import { computeShortestPath, parseGalaxies } from "./puzzle1";

export const handler = (input: string): number => {
    const shortestPaths = [];
    const galaxies = parseGalaxies(input, 1000000);
    for (let i = 0; i < galaxies.length; i++) {
        const galaxyA = galaxies[i];
        for (const galaxyB of galaxies.slice(i + 1)) {
            shortestPaths.push(computeShortestPath(galaxyA, galaxyB));
        }
    }
    return sum(shortestPaths);
};
