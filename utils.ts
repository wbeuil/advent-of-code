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
type MemoizedFunction<T> = (...args: any[]) => T;

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

export const transpose = (rows: string[]): string[] => {
    const columns = Array(rows[0].length).fill("");
    for (const row of rows) {
        for (let i = 0; i < row.length; i++) columns[i] += row[i];
    }
    return columns;
};
