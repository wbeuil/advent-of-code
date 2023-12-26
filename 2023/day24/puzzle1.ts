import { inRange } from "../../utils";

type Hailstone = {
    px: number;
    py: number;
    pz: number;
    vx: number;
    vy: number;
    vz: number;
};

type Coordinate = {
    x: number;
    y: number;
};

export const parseHailstones = (input: string): Hailstone[] => {
    const hailstones = [];
    for (const line of input.split("\n")) {
        const [position, velocity] = line.split(" @ ");
        const [px, py, pz] = position.split(",").map(Number);
        const [vx, vy, vz] = velocity.split(",").map(Number);
        hailstones.push({ px, py, pz, vx, vy, vz });
    }
    return hailstones;
};

const computeIntersection = (a: Hailstone, b: Hailstone): Coordinate => {
    const am = a.vy / a.vx;
    const bm = b.vy / b.vx;
    const x = (am * a.px - bm * b.px + b.py - a.py) / (am - bm);
    const y = am * (x - a.px) + a.py;
    return { x, y };
};

const isInArea = (p: Coordinate, area: number[]): boolean => {
    return inRange(p.x, area) && inRange(p.y, area);
};

const isInTheFuture = (p: Coordinate, h: Hailstone): boolean => {
    if (h.vx > 0 && p.x > h.px) return true;
    if (h.vx < 0 && p.x < h.px) return true;
    if (h.vy > 0 && p.y > h.py) return true;
    if (h.vy < 0 && p.y < h.py) return true;
    return false;
};

export const handler = (input: string, range = [200000000000000, 400000000000000]): number => {
    let total = 0;
    const hailstones = parseHailstones(input);
    for (let i = 0; i < hailstones.length; i++) {
        const h = hailstones[i];
        for (const h2 of hailstones.slice(i + 1)) {
            const intersection = computeIntersection(h, h2);
            if (!isInTheFuture(intersection, h) || !isInTheFuture(intersection, h2)) continue;
            if (!isInArea(intersection, range)) continue;
            total++;
        }
    }
    return total;
};
