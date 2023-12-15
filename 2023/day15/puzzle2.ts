import { getHash } from "./puzzle1";

type HashMap = Map<number, Map<string, number>>;

const computeHashMapFocusingPower = (hashMap: HashMap): number => {
    let total = 0;
    for (const [box, lensesMap] of hashMap) {
        const lenses = Array.from(lensesMap.entries());
        for (let i = 0; i < lenses.length; i++) {
            total += (box + 1) * (i + 1) * lenses[i][1];
        }
    }
    return total;
};

const getHashMap = (steps: string[]): HashMap => {
    const map = new Map<number, Map<string, number>>();
    for (const step of steps) {
        const [label, focalLength] = step.split(/(?:=|-)/);
        const hash = getHash(label);
        if (focalLength !== "") {
            if (map.has(hash)) {
                const box = map.get(hash);
                box?.set(label, Number(focalLength));
            } else {
                const box = new Map<string, number>();
                box.set(label, Number(focalLength));
                map.set(hash, box);
            }
        } else {
            if (map.has(hash)) {
                const box = map.get(hash);
                box?.delete(label);
                box?.size === 0 && map.delete(hash);
            }
        }
    }
    return map;
};

export const handler = (input: string): number => {
    const steps = input.split(",");
    const hashMap = getHashMap(steps);
    return computeHashMapFocusingPower(hashMap);
};
