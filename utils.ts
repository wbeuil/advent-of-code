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
