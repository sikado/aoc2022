// import { writeFileSync } from 'fs';

interface Coord {
    x: number;
    y: number;
}

interface Cell {
    elevation: string;
    isStart: boolean;
    isEnd: boolean;
    score: null | number;
    coord: Coord;
}

export function process(data: string[], shortestPath = false): number {
    let cellsToVisit: Cell[] = [];

    /**
     * Cell grid where grid[Y][X]
     */
    const grid = data.map((line, Yindex) => line.split('').map<Cell>((letter, Xindex) => {
        const isStart: boolean = letter === 'S';
        const isEnd: boolean = letter === 'E';
        let score: number | null;
        if (shortestPath) {
            score = isEnd ? 0 : null;
        } else {
            score = isStart ? 0 : null;
        }

        let elevation = letter;
        if (isStart) {
            elevation = 'a';
        } else if (isEnd) {
            elevation = 'z';
        }

        const cell: Cell = {
            elevation,
            isEnd,
            isStart,
            score,
            coord: {
                x: Xindex,
                y: Yindex
            }
        }

        // Saving the starting cell
        if (shortestPath) {
            if (isEnd) {
                cellsToVisit.push(cell)
            }
        } else {
            if (isStart) {
                cellsToVisit.push(cell)
            }
        }

        return cell
    }))

    const gridSize = {
        x: grid[0].length,
        y: grid.length,
    }

    // While the visit stack isn't empty
    while (cellsToVisit.length > 0) {
        const cell = cellsToVisit.pop()!;
        const nextScore = (cell.score ?? 0) + 1;

        // Find all reachable cells
        getAdjCoord(cell.coord, gridSize).forEach(adjCoord => {
            const adjCell = grid[adjCoord.y][adjCoord.x];

            // Check if cell was visited earlier and if so, does the current path is more optimal
            if (adjCell.score === null || adjCell.score > nextScore) {
                // Only 1 elevation up allowed
                let elevationDiff: number;
                if (shortestPath) {
                    elevationDiff = cell.elevation.charCodeAt(0) - adjCell.elevation.charCodeAt(0);
                } else {
                    elevationDiff = adjCell.elevation.charCodeAt(0) - cell.elevation.charCodeAt(0);
                }

                if (elevationDiff <= 1) {
                    adjCell.score = nextScore;

                    // Insert cell on top of the heap
                    cellsToVisit = [adjCell, ...cellsToVisit];
                }
            }
        });

    }

    // Display Score grid
    // const debugGrid = grid.map((line) => line.map((cell) => String(cell.score ?? 'XXX').padStart(3, '0')).join(','));
    // writeFileSync('debug.txt', debugGrid.join('\n'))

    if (shortestPath) {
        const minScore = grid.flat().filter(cell => cell.elevation === 'a' && cell.score !== null).sort((a, b) => a.score! - b.score!)[0]?.score

        if (minScore == null) {
            throw new Error('Unable to find path')
        }

        return minScore;
    } else {
        const pathLength = grid.flat().find(cell => cell.isEnd)?.score

        if (pathLength == null) {
            throw new Error('Unable to find path')
        }

        return pathLength;
    }

}

function getAdjCoord(coord: Coord, gridSize: { x: number, y: number }): Coord[] {
    const adjCoord: Coord[] = [
        { x: coord.x, y: coord.y - 1 },
        { x: coord.x, y: coord.y + 1 },
        { x: coord.x - 1, y: coord.y },
        { x: coord.x + 1, y: coord.y },
    ];

    return adjCoord.filter(item => item.x >= 0 && item.x < gridSize.x && item.y >= 0 && item.y < gridSize.y)
}
