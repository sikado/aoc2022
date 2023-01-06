interface Move {
    qte: number;
    from: number;
    to: number;
}

export function process(
    stackData: string[],
    movesData: string[],
    craneModel: "9000" | "9001"
): string {
    const stacks = [] as string[][];
    // Read stacks
    stackData.reverse().map((line) =>
        line.split("").forEach((item, index) => {
            if (item !== " ") {
                if (stacks[index] !== undefined) {
                    stacks[index].push(item);
                } else {
                    stacks[index] = [item];
                }
            }
        })
    );

    // Parse moves
    const moves: Move[] = movesData.map((line) => {
        const [qte, from, to] = line
            .match(/\d+/g)!
            .map((val) => parseInt(val, 10));
        return { qte, from, to };
    });

    // Make moves
    if (craneModel === "9000") {
        moves.forEach((move) => makeMove9000(move, stacks));
    } else {
        moves.forEach((move) => makeMove9001(move, stacks));
    }

    // Return the top item per stack
    return getTopItems(stacks);
}

function makeMove9001(move: Move, stacks: string[][]): void {
    const fromStack = stacks[move.from - 1];
    const toStack = stacks[move.to - 1];
    const items = fromStack.splice(fromStack.length - move.qte, move.qte);
    toStack.push(...items);
}

function makeMove9000(move: Move, stacks: string[][]): void {
    for (let i = 0; i < move.qte; i++) {
        const item = stacks[move.from - 1].pop()!;
        stacks[move.to - 1].push(item);
    }
}

function getTopItems(stacks: string[][]): string {
    return stacks.map((stack) => stack[stack.length - 1]).join("");
}
