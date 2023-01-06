import { Coord, Size } from "../utils";
import { Cell } from "./Cell";

export class Grid {

    public readonly _grid: Cell[][];
    public readonly _shortestPath: boolean;
    public _cellsToVisit: Cell[];
    public readonly _gridSize: Size;

    constructor(data: string[], shortestPath?: boolean) {
        this._shortestPath = shortestPath ?? false;
        this._cellsToVisit = [];

        this._gridSize = {
            w: data[0].length,
            h: data.length,
        };

        this._grid = data.map((line, Yindex) =>
            line.split("").map<Cell>((letter, Xindex) => {
                const isStart: boolean = letter === "S";
                const isEnd: boolean = letter === "E";
                let score: number | null;
                if (this._shortestPath) {
                    score = isEnd ? 0 : null;
                } else {
                    score = isStart ? 0 : null;
                }

                let elevation = letter;
                if (isStart) {
                    elevation = "a";
                } else if (isEnd) {
                    elevation = "z";
                }

                const cell: Cell = {
                    elevation,
                    isEnd,
                    isStart,
                    score,
                    coord: {
                        x: Xindex,
                        y: Yindex,
                    },
                };

                // Saving the starting cell
                if (this._shortestPath) {
                    if (isEnd) {
                        this._cellsToVisit.push(cell);
                    }
                } else {
                    if (isStart) {
                        this._cellsToVisit.push(cell);
                    }
                }

                return cell;
            })
        );
    }

    hasCellToVisit(): boolean {
        return this._cellsToVisit.length > 0
    }

    visitCell(): Cell {
        const cell = this._cellsToVisit.pop()!;
        const nextScore = (cell.score ?? 0) + 1;

        // Find all reachable cells
        getAdjCoord(cell.coord, this._gridSize).forEach((adjCoord) => {
            const adjCell = this._grid[adjCoord.y][adjCoord.x];

            // Check if cell was visited earlier and if so, does the current path is more optimal
            if (adjCell.score === null || adjCell.score > nextScore) {
                // Only 1 elevation up allowed
                let elevationDiff: number;
                if (this._shortestPath) {
                    elevationDiff =
                        cell.elevation.charCodeAt(0) -
                        adjCell.elevation.charCodeAt(0);
                } else {
                    elevationDiff =
                        adjCell.elevation.charCodeAt(0) -
                        cell.elevation.charCodeAt(0);
                }

                if (elevationDiff <= 1) {
                    adjCell.score = nextScore;

                    // Insert cell on top of the heap
                    this._cellsToVisit = [adjCell, ...this._cellsToVisit];
                }
            }
        });

        return cell;
    }

    getPathLength(): number {
        const pathLength = this._grid.flat().find((cell) => cell.isEnd)?.score;

        if (pathLength == null) {
            throw new Error("Unable to find path");
        }

        return pathLength
    }

    getMinScore(): number {
        const minScore = this._grid
            .flat()
            .filter((cell) => cell.elevation === "a" && cell.score !== null)
            .sort((a, b) => a.score! - b.score!)[0]?.score;

        if (minScore == null) {
            throw new Error("Unable to find path");
        }

        return minScore;
    }

}

export function process(data: string[], shortestPath = false): number {
    const grid = new Grid(data, shortestPath);

    while (grid.hasCellToVisit()) {
        grid.visitCell()
    }

    if (shortestPath) {
        return grid.getMinScore();
    } else {
        return grid.getPathLength()
    }
}

function getAdjCoord(
    coord: Coord,
    gridSize: Size
): Coord[] {
    const adjCoord: Coord[] = [
        { x: coord.x, y: coord.y - 1 },
        { x: coord.x, y: coord.y + 1 },
        { x: coord.x - 1, y: coord.y },
        { x: coord.x + 1, y: coord.y },
    ];

    return adjCoord.filter(
        (item) =>
            item.x >= 0 &&
            item.x < gridSize.w &&
            item.y >= 0 &&
            item.y < gridSize.h
    );
}
