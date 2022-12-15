import { Coord, coordEq, getPointsFromLine } from "../utils";

type Cell = null | "#" | "+";
type Grid = Cell[][];

// 10:54 - Openning puzzle
// 11:18 - Start dev
// Food break ~1h30
// 14:43 - Part1
// 15:14 - Part2
export function process(data: string[], hasFloor = false) {
    // Parse data
    const re = /(\d+),(\d+)/g;
    let rocks = data.map((line) => {
        const coords: Coord[] = [];
        let match;
        do {
            match = re.exec(line);
            if (match !== null) {
                coords.push({
                    x: Number.parseInt(match[1]),
                    y: Number.parseInt(match[2]),
                });
            }
        } while (match != null);
        return coords;
    });

    const flatPoints = rocks.flat();
    // Find min/max
    // MinX est décalé de un pour authorisé l'abyss
    const preshiftMinX = Math.min(...flatPoints.map((coord) => coord.x)) - 1;
    if (preshiftMinX > 500) {
        throw new Error("minX > SAND_ORIGIN");
    }
    let SAND_ORIGIN: Coord = { y: 0, x: 500 - preshiftMinX };

    const maxX =
        Math.max(...flatPoints.map((coord) => coord.x)) - preshiftMinX + 1;
    // Find maxY
    const maxY = Math.max(...flatPoints.map((coord) => coord.y));

    // Move X origin to minX (new origin at X:1,Y:0)
    rocks = rocks.map((line) =>
        line.map((coord) => ({ y: coord.y, x: coord.x - preshiftMinX }))
    );

    // Fill grid with rockes
    const grid: Grid = drawGrid(rocks, maxX, maxY);

    let currentGrain: Coord = { ...SAND_ORIGIN };
    let nbGrain = 0;
    do {
        let isAtRest: boolean = false;
        currentGrain = { ...SAND_ORIGIN };
        grid[currentGrain.y][currentGrain.x] = "+";

        // 1 grain folling
        // eslint-disable-next-line no-unmodified-loop-condition
        while (!isAtRest && (hasFloor || !isIntoAbyss(currentGrain, maxY))) {
            let floorY: number | null = null;
            if (hasFloor) {
                floorY = maxY + 2;
            }
            const nextMove = getNextMove(grid, currentGrain, floorY);

            if (nextMove === null) {
                isAtRest = true;
                nbGrain++;
            } else {
                grid[currentGrain.y][currentGrain.x] = null;
                grid[nextMove.y][nextMove.x] = "+";
                currentGrain = nextMove;
            }
        }

        // Increase windows size @todo
        if (currentGrain.x === 0) {
            grid.forEach((line) => {
                line.unshift(null);
            });
            SAND_ORIGIN = { y: 0, x: SAND_ORIGIN.x + 1 };
        } else if (currentGrain.x + 1 === grid[0].length) {
            // shift left
            grid.forEach((line) => {
                line.push(null);
            });
        }

        // eslint-disable-next-line no-unmodified-loop-condition
    } while (
        !coordEq(currentGrain, SAND_ORIGIN) &&
        (hasFloor || !isIntoAbyss(currentGrain, maxY))
    );

    return nbGrain;
}

function drawGrid(rocks: Coord[][], maxX: number, maxY: number): Grid {
    const grid: Grid = Array.from({ length: maxY + 2 }, () =>
        Array.from({ length: maxX + 1 }, () => null)
    );

    rocks.forEach((line) => {
        for (let i = 1; i < line.length; i++) {
            getPointsFromLine(line[i - 1], line[i]).forEach((point) => {
                grid[point.y][point.x] = "#";
            });
        }
    });

    return grid;
}

function getNextMove(
    grid: Grid,
    currentCoord: Coord,
    floorY: number | null
): Coord | null {
    // detect floor
    if (floorY !== null && currentCoord.y + 1 === floorY) {
        return null;
    }

    if (grid[currentCoord.y + 1][currentCoord.x] === null) {
        // down is available
        return { y: currentCoord.y + 1, x: currentCoord.x };
    } else if (grid[currentCoord.y + 1][currentCoord.x - 1] === null) {
        // down left
        return { y: currentCoord.y + 1, x: currentCoord.x - 1 };
    } else if (grid[currentCoord.y + 1][currentCoord.x + 1] === null) {
        // down right
        return { y: currentCoord.y + 1, x: currentCoord.x + 1 };
    }

    return null;
}

function isIntoAbyss(currentCoord: Coord, maxY: number): boolean {
    return currentCoord.y > maxY;
}
