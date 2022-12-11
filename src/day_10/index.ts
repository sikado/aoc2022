export function process(data: string[], part: 1 | 2) {
    const checkedCycles = [20, 60, 100, 140, 180, 220]; // Starts at 1
    let cycle = 1;
    let registerVal = 1;
    let sigStrengthSum = 0;

    const screen: string[] = [];

    data.forEach((input) => {
        const parsedInput = /^(\w+)(?: )?(-?\d+)?$/.exec(input);

        if (parsedInput === null) {
            throw new Error("Invalid input");
        }

        const instruction = parsedInput[1];
        const args: string | undefined = parsedInput[2];
        let pendingCycles = 0;
        let addedValue = 0;

        switch (instruction) {
            case "noop":
                pendingCycles = 1;
                break;
            case "addx":
                pendingCycles = 2;
                addedValue = Number.parseInt(args, 10);
                break;
        }

        for (let i = 0; i < pendingCycles; i++) {
            // Part 1
            if (checkedCycles.includes(cycle)) {
                const sigStrength = cycle * registerVal;
                sigStrengthSum += sigStrength;
            }

            // Part 2
            const CRTpos = (cycle - 1) % 40;
            if (CRTpos >= registerVal - 1 && CRTpos <= registerVal + 1) {
                screen.push("#");
            } else {
                screen.push(".");
            }
            cycle++;
        }

        registerVal += addedValue;
    });

    if (part === 1) {
        return sigStrengthSum;
    } else {
        return screen.join("").match(/.{40}/g);
    }
}
