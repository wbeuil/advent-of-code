import { init } from "z3-solver";

import { sum } from "../../utils";
import { parseHailstones } from "./puzzle1";

const solve = async (input: string): Promise<number> => {
    const { Context } = await init();
    const { Real, Solver } = Context("main");
    const x = Real.const("x");
    const y = Real.const("y");
    const z = Real.const("z");
    const vx = Real.const("vx");
    const vy = Real.const("vy");
    const vz = Real.const("vz");
    const solver = new Solver();
    const hailstones = parseHailstones(input);
    for (let i = 0; i < 3; i++) {
        const h = hailstones[i];
        const t = Real.const(`t${i}`);
        solver.add(t.ge(0));
        solver.add(x.add(vx.mul(t)).eq(t.mul(h.vx).add(h.px)));
        solver.add(y.add(vy.mul(t)).eq(t.mul(h.vy).add(h.py)));
        solver.add(z.add(vz.mul(t)).eq(t.mul(h.vz).add(h.pz)));
    }
    const satisfied = await solver.check();
    if (satisfied !== "sat") throw new Error("Z3 solver unsatisfied");
    const model = solver.model();
    return sum([model.eval(x), model.eval(y), model.eval(z)].map(Number));
};

export const handler = async (input: string): Promise<number> => {
    return solve(input);
};
