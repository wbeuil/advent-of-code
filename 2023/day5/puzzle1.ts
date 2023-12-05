type Almanac = {
    seeds: number[];
    seedToSoil: Map[];
    soilToFertilizer: Map[];
    fertilizerToWater: Map[];
    waterToLight: Map[];
    lightToTemperature: Map[];
    temperatureToHumidity: Map[];
    humidityToLocation: Map[];
};

type Map = {
    destinationStart: number;
    sourceStart: number;
    rangeLength: number;
};

const parseMap = (map: string): Map[] => {
    const maps = [];
    const lines = map.split("\n");
    for (const line of lines) {
        const matches = line.match(/\d+/g);
        if (!matches) continue;
        const [dest, source, range] = matches.map(Number);
        maps.push({ destinationStart: dest, sourceStart: source, rangeLength: range });
    }
    return maps;
};

const parseSeeds = (line: string): number[] => {
    const matches = line.match(/\d+/g);
    if (!matches) throw new Error(`Invalid line: ${line}`);
    return matches.map(Number);
};

export const parseAlmanac = (input: string): Almanac => {
    const [
        seedsLine,
        seedToSoilMap,
        soilToFertilizerMap,
        fertilizerToWaterMap,
        waterToLightMap,
        lightToTemperatureMap,
        temperatureToHumidityMap,
        humidityToLocationMap,
    ] = input.split("\n\n");
    return {
        seeds: parseSeeds(seedsLine),
        seedToSoil: parseMap(seedToSoilMap),
        soilToFertilizer: parseMap(soilToFertilizerMap),
        fertilizerToWater: parseMap(fertilizerToWaterMap),
        waterToLight: parseMap(waterToLightMap),
        lightToTemperature: parseMap(lightToTemperatureMap),
        temperatureToHumidity: parseMap(temperatureToHumidityMap),
        humidityToLocation: parseMap(humidityToLocationMap),
    };
};

const convert = (value: number, maps: Map[]): number => {
    for (const map of maps) {
        if (value >= map.sourceStart && value < map.sourceStart + map.rangeLength) {
            return map.destinationStart + (value - map.sourceStart);
        }
    }
    return value;
};

export const findLocation = (seed: number, almanac: Almanac): number => {
    const soil = convert(seed, almanac.seedToSoil);
    const fertilizer = convert(soil, almanac.soilToFertilizer);
    const water = convert(fertilizer, almanac.fertilizerToWater);
    const light = convert(water, almanac.waterToLight);
    const temperature = convert(light, almanac.lightToTemperature);
    const humidity = convert(temperature, almanac.temperatureToHumidity);
    const location = convert(humidity, almanac.humidityToLocation);
    return location;
};

export const handler = (input: string): number => {
    const locations = [];
    const almanac = parseAlmanac(input);
    for (const seed of almanac.seeds) {
        locations.push(findLocation(seed, almanac));
    }
    return Math.min(...locations);
};
