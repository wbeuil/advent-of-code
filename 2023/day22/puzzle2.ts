import { fall, parseBricks, sortBricks, supports } from "./puzzle1";

import type { Brick } from "./puzzle1";

const totalFellBricksAfterDisintegration = (bricks: Brick[]): number => {
    const [lSupportsU, uSupportsL] = supports(bricks);
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
        const queue = [...lSupportsU[i]].filter((j) => uSupportsL[j].size === 1);
        const falling = new Set(queue);
        falling.add(i);
        while (queue.length) {
            const j = queue.shift();
            if (!j) continue;
            for (const lower of lSupportsU[j]) {
                if (falling.has(lower)) continue;
                if ([...uSupportsL[lower]].every((u) => falling.has(u))) {
                    queue.push(lower);
                    falling.add(lower);
                }
            }
        }
        total += falling.size - 1;
    }
    return total;
};

export const handler = (input: string): number => {
    const bricks = parseBricks(input).sort(sortBricks);
    return totalFellBricksAfterDisintegration(fall(bricks));
};
