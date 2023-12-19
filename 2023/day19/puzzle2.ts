import { parseWorkflows } from "./puzzle1";

const difference = (range: number[]): number => range[1] - range[0] + 1;

const execute = (
    parts: Record<string, number[]>,
    workflows: Record<string, string>,
    name: string,
    currentTotal: number,
): number => {
    let total = currentTotal;
    if (name === "A")
        return total + difference(parts.x) * difference(parts.m) * difference(parts.a) * difference(parts.s);
    if (name === "R") return total;
    const workflow = workflows[name];
    const steps = workflow.split(",");
    let currentParts = { ...parts };
    for (let i = 0; i < steps.length; i++) {
        if (i === steps.length - 1) {
            total = execute(currentParts, workflows, steps[i], total);
        } else {
            const [condition, nextName] = steps[i].split(":");
            const [variable, operator, value] = condition.split(/([<>])/g);
            const variableValue = currentParts[variable];
            const conditionValue = Number(value);
            if (operator === "<") {
                const left = variableValue[0];
                const right = Math.min(variableValue[1], conditionValue - 1);
                if (left < right)
                    total = execute({ ...currentParts, [variable]: [left, right] }, workflows, nextName, total);
                currentParts = { ...currentParts, [variable]: [conditionValue, variableValue[1]] };
            }
            if (operator === ">") {
                const left = Math.max(variableValue[0], conditionValue + 1);
                const right = variableValue[1];
                if (left < right)
                    total = execute({ ...currentParts, [variable]: [left, right] }, workflows, nextName, total);
                currentParts = { ...currentParts, [variable]: [variableValue[0], conditionValue] };
            }
        }
    }
    return total;
};

export const handler = (input: string): number => {
    const [w] = input.split("\n\n");
    const workflows = parseWorkflows(w);
    const range = [1, 4000];
    const parts = { x: range, m: range, a: range, s: range };
    return execute(parts, workflows, "in", 0);
};
