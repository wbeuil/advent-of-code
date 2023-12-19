import { sum } from "../../utils";

const execute = (parts: Record<string, number>, workflows: Record<string, string>, name: string): boolean => {
    if (name === "A") return true;
    if (name === "R") return false;
    const workflow = workflows[name];
    const steps = workflow.split(",");
    for (let i = 0; i < steps.length; i++) {
        if (i === steps.length - 1) return execute(parts, workflows, steps[i]);
        const [condition, nextName] = steps[i].split(":");
        const [variable, operator, value] = condition.split(/([<>])/g);
        const variableValue = parts[variable];
        const conditionValue = Number(value);
        if (operator === "<") {
            if (variableValue < conditionValue) return execute(parts, workflows, nextName);
        }
        if (operator === ">") {
            if (variableValue > conditionValue) return execute(parts, workflows, nextName);
        }
    }
    return false;
};

export const parseWorkflows = (input: string): Record<string, string> => {
    const workflows: Record<string, string> = {};
    const lines = input.split("\n");
    for (const line of lines) {
        const matches = line.matchAll(/([a-z]+){(.*)}/g);
        for (const match of matches) {
            const key = match[1];
            const value = match[2];
            workflows[key] = value;
        }
    }
    return workflows;
};

export const handler = (input: string): number => {
    const [w, r] = input.split("\n\n");
    const workflows = parseWorkflows(w);
    return sum(
        r.split("\n").map((rating) => {
            const matches = rating.match(/\d+/g);
            if (!matches) throw new Error("Could not find rating");
            const [x, m, a, s] = matches.map(Number);
            if (execute({ x, m, a, s }, workflows, "in")) return x + m + a + s;
            return 0;
        }),
    );
};
