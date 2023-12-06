export type Race = {
    time: number;
    distance: number;
};

export const computeRecords = (race: Race): number[] => {
    const records = [];
    for (let i = 0; i <= race.time; i++) {
        const totalDistance = i * (race.time - i);
        if (totalDistance > race.distance) {
            records.push(totalDistance);
        }
    }
    return records;
};

const parseRaces = (input: string): Race[] => {
    const races = [];
    const lines = input.split("\n");
    const times = lines[0].match(/(\d+)/g)?.map(Number) || [];
    const distances = lines[1].match(/(\d+)/g)?.map(Number) || [];
    for (let i = 0; i < times.length; i++) {
        races.push({ time: times[i], distance: distances[i] });
    }
    return races;
};

export const handler = (input: string): number => {
    const recordsPerRace = [];
    const races = parseRaces(input);
    for (const race of races) {
        const records = computeRecords(race);
        recordsPerRace.push(records.length);
    }
    return recordsPerRace.reduce((acc, curr) => acc * curr, 1);
};
