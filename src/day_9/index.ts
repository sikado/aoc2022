type Coord = [number, number];
type Direction = "R" | "L" | "U" | "D";

const Transfo: Record<Direction, Coord> = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
};

export function process(data: string[], NB_KNOTS = 2): number {
    const visitedPos = new Set<string>();

    const knots: Coord[] = new Array(NB_KNOTS).fill([0, 0]);

    data.forEach((move) => {
        const splittedMove = move.split(" ");

        const direction = splittedMove[0] as Direction;
        const step = Number.parseInt(splittedMove[1], 10);

        // ForEach step
        for (let i = 0; i < step; i++) {
            // Move head
            knots[0] = applyTranfo(Transfo[direction], knots[0]);

            for (let j = 1; j < knots.length; j++) {
                // If tail isn't adjacent
                if (!isAdjacent(knots[j - 1], knots[j])) {
                    // move tail
                    knots[j] = applyTranfo(
                        findTailDirection(knots[j - 1], knots[j]),
                        knots[j]
                    );
                }
            }

            // Add head pos to Set<>
            visitedPos.add(knots[knots.length - 1].join(","));
        }
    });

    return visitedPos.size;
}

export function applyTranfo(tranfo: Coord, coord: Coord): Coord {
    return [coord[0] + tranfo[0], coord[1] + tranfo[1]];
}

export function isAdjacent(head: Coord, tail: Coord): boolean {
    return (
        tail[0] <= head[0] + 1 &&
        tail[0] >= head[0] - 1 &&
        tail[1] <= head[1] + 1 &&
        tail[1] >= head[1] - 1
    );
}

function findTailDirection(head: Coord, tail: Coord): Coord {
    let x = 0;
    let y = 0;

    if (tail[0] - head[0] > 0) {
        x = -1;
    } else if (tail[0] - head[0] < 0) {
        x = 1;
    }

    if (tail[1] - head[1] > 0) {
        y = -1;
    } else if (tail[1] - head[1] < 0) {
        y = 1;
    }

    return [x, y];
}
