import { findLocation, parseAlmanac } from "./puzzle1";

export const handler = (input: string): number => {
    let minLocation = Infinity;
    const almanac = parseAlmanac(input);
    for (let i = 0; i < almanac.seeds.length; i += 2) {
        for (let j = 0; j < almanac.seeds[i + 1]; j++) {
            const location = findLocation(almanac.seeds[i] + j, almanac);
            if (location < minLocation) {
                minLocation = location;
            }
        }
    }
    return minLocation;
};
