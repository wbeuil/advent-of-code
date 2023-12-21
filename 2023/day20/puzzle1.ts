enum PulseType {
    Low = "Low",
    High = "High",
}

enum ModuleType {
    FlipFlop = "FlipFlop",
    Conjuction = "Conjuction",
    Broadcast = "Broadcast",
    Button = "Button",
    Final = "Final",
}

interface BaseModule {
    type: ModuleType;
    destinations: string[];
}

interface ButtonModule extends BaseModule {
    type: ModuleType.Button;
}

interface BroadcastModule extends BaseModule {
    type: ModuleType.Broadcast;
    receivedPulse?: PulseType;
}

interface FlipFlopModule extends BaseModule {
    type: ModuleType.FlipFlop;
    on: boolean;
}

export interface ConjuctionModule extends BaseModule {
    type: ModuleType.Conjuction;
    rememberedPulses: Record<string, PulseType>;
}

export interface FinalModule extends BaseModule {
    type: ModuleType.Final;
    source: string;
    on: boolean;
}

export type Module = ButtonModule | BroadcastModule | FlipFlopModule | ConjuctionModule | FinalModule;

export const parseConfiguration = (input: string, withFinal = false): Map<string, Module> => {
    const conjunctionsModules = [];
    const modules = new Map<string, Module>();
    modules.set("aptly", { type: ModuleType.Button, destinations: ["broadcaster"] });
    const lines = input.split("\n");
    for (const line of lines) {
        const [name, rest] = line.split(" -> ");
        const destinations = rest.split(", ");
        if (name === "broadcaster") modules.set(name, { type: ModuleType.Broadcast, destinations });
        if (name.startsWith("%"))
            modules.set(name.substring(1), { type: ModuleType.FlipFlop, destinations, on: false });
        if (name.startsWith("&")) {
            modules.set(name.substring(1), { type: ModuleType.Conjuction, destinations, rememberedPulses: {} });
            conjunctionsModules.push(name.substring(1));
        }
        if (withFinal && destinations.includes("rx"))
            modules.set("rx", { type: ModuleType.Final, destinations: [], source: name.substring(1), on: false });
    }
    for (const conjunction of conjunctionsModules) {
        for (const [key, value] of modules.entries()) {
            if (value.destinations.includes(conjunction)) {
                const mod = modules.get(conjunction) as ConjuctionModule;
                mod.rememberedPulses[key] = PulseType.Low;
            }
        }
    }
    return modules;
};

const sendPulse = (sender: Module): PulseType | null => {
    if (sender.type === ModuleType.Button) return PulseType.Low;
    if (sender.type === ModuleType.Broadcast) return sender.receivedPulse as PulseType;
    if (sender.type === ModuleType.FlipFlop) return sender.on ? PulseType.High : PulseType.Low;
    if (sender.type === ModuleType.Conjuction)
        return Object.values(sender.rememberedPulses).every((pulse) => pulse === PulseType.High)
            ? PulseType.Low
            : PulseType.High;
    return null;
};

export const run = (configuration: Map<string, Module>, moduleToCheck = ""): number => {
    let lowPulses = 0;
    let highPulses = 0;
    const maxButtonPressed = moduleToCheck ? Infinity : 1000;
    for (let i = 0; i < maxButtonPressed; i++) {
        const queue = ["aptly"];
        while (queue.length > 0) {
            const current = queue.shift() as string;
            const sender = configuration.get(current) as Module;
            for (const destination of sender.destinations) {
                const receiver = configuration.get(destination) as Module;
                const pulse = sendPulse(sender);
                if (pulse) {
                    pulse === PulseType.High ? highPulses++ : lowPulses++;
                    if (!receiver) continue;
                    if (receiver.type === ModuleType.Broadcast) receiver.receivedPulse = pulse;
                    if (receiver.type === ModuleType.FlipFlop) {
                        if (pulse === PulseType.High) continue;
                        receiver.on = !receiver.on;
                    }
                    if (receiver.type === ModuleType.Conjuction) receiver.rememberedPulses[current] = pulse;
                    if (receiver.type === ModuleType.Final) {
                        const source = configuration.get(receiver.source) as ConjuctionModule;
                        if (source.rememberedPulses[moduleToCheck] === PulseType.High) return i + 1;
                    }
                    queue.push(destination);
                }
            }
        }
    }
    return lowPulses * highPulses;
};

export const handler = (input: string): number => {
    const configuration = parseConfiguration(input);
    return run(configuration);
};
