const checkReflectionLine = (lines: string[], index: number): boolean => {
    for (let i = index - 1, j = index; i >= 0 && j < lines.length; i--, j++) {
        if (lines[i] !== lines[j]) return false;
    }
    return true;
};

export const findReflectionLine = (lines: string[], checkFn: (lines: string[], index: number) => boolean): number => {
    for (let i = 1; i < lines.length; i++) {
        if (checkFn(lines, i)) return i;
    }
    return 0;
};

export const transpose = (rows: string[]): string[] => {
    const columns = Array(rows[0].length).fill("");
    for (const row of rows) {
        for (let i = 0; i < row.length; i++) columns[i] += row[i];
    }
    return columns;
};

export const handler = (input: string): number => {
    let total = 0;
    const patterns = input.split("\n\n");
    for (const pattern of patterns) {
        const rows = pattern.split("\n");
        const horizontalLine = findReflectionLine(rows, checkReflectionLine);
        if (horizontalLine) {
            total += 100 * horizontalLine;
            continue;
        }
        const columns = transpose(rows);
        const verticalLine = findReflectionLine(columns, checkReflectionLine);
        total += verticalLine;
    }
    return total;
};
