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
