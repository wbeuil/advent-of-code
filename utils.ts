import { existsSync, readFileSync, writeFileSync } from "fs";

export const getInput = async (day: string, year: string): Promise<string> => {
    const path = `./${year}/day${day}/input`;
    if (existsSync(path)) {
        return readFileSync(path, "utf-8");
    }
    console.log(`Downloading input for year ${year} day ${day}...`);
    const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            cookie: `session=${process.env.SESSION}`,
        },
    });
    const text = (await res.text()).trim();
    if (res.status !== 200) {
        throw new Error(`Failed to download input:\n${text}`);
    }
    writeFileSync(path, text);
    return text;
};

export const sanitizeInput = (input: string): string => {
    return input.replace(/^\n+|\n+$/g, "");
};

export const sum = (numbers: number[]): number => numbers.reduce((acc, cur) => acc + cur, 0);

export const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

export const lcm = (a: number, b: number): number => a * (b / gcd(a, b));

// biome-ignore lint/suspicious/noExplicitAny: variadic arguments
export type MemoizedFunction<T> = (...args: any[]) => T;

// biome-ignore lint/suspicious/noExplicitAny: variadic arguments
export const memoize = <T>(fn: (...args: any[]) => T): MemoizedFunction<T> => {
    const cache = new Map<string, T>();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key) as T;
        }
        const value = fn(...args);
        cache.set(key, value);
        return value;
    };
};

export const transpose = (lines: string[]): string[] => {
    const transposedLines = Array(lines[0].length).fill("");
    for (const line of lines) {
        for (let i = 0; i < line.length; i++) transposedLines[i] += line[i];
    }
    return transposedLines;
};

export const window = <T>(array: T[], size: number): T[][] => {
    return array.map((_, i) => array.slice(i, i + size)).slice(0, array.length - size + 1);
};

export type Vertex = [number, number];

export const distance = (a: Vertex, b: Vertex): number => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

export const area = (vertices: Vertex[]): number =>
    Math.abs(sum(window(vertices, 2).map(([[x1, y1], [x2, y2]]) => (x1 - x2) * (y2 + y1))) / 2);

export const perimeter = (vertices: Vertex[]): number => sum(window(vertices, 2).map(([a, b]) => distance(a, b)));
