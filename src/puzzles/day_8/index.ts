import { Coord } from "../utils";

interface Tree extends Coord {
    height: number;
    isVisible?: boolean;
    scenicScore?: number;
}

export class Puzzle {

    private readonly grid: Tree[][];
    private readonly gridSize: number;

    constructor(data: string[]) {
        this.grid = data
            .map((line, y) =>
                line.split('')
                    .map((char, x) => ({ height: Number.parseInt(char), x, y })))

        this.gridSize = data.length;
    }

    private isOnSide({ x, y }: Coord) {
        return x === 0 || x === this.gridSize - 1 || y === 0 || y === this.gridSize - 1
    }

    private isVisible({ x, y, height }: Tree) {

        if (this.isOnSide({ x, y })) {
            return true;
        }

        const curLine = this.grid[y];
        const curCol = this.grid.map(line => line[x]);

        return [
            curLine.slice(undefined, x),
            curLine.slice(x + 1),
            curCol.slice(undefined, y),
            curCol.slice(y + 1)
        ].some(sight => sight.every(tree => tree.height < height))
    }

    private getScenicScore({ x, y, height }: Tree): number {
        if (this.isOnSide({ x, y })) {
            return 0;
        }

        const curLine = this.grid[y];
        const curCol = this.grid.map(line => line[x]);

        return [
            curLine.slice(undefined, x).reverse(),
            curLine.slice(x + 1),
            curCol.slice(undefined, y).reverse(),
            curCol.slice(y + 1)
        ].map(sight => {
            let space = 0;
            for (const neighbor of sight) {
                space++;
                if (neighbor.height >= height) {
                    break;
                }
            }

            return space;
        }).reduce((acc, val) => acc * val, 1)
    }

    part1(): number {
        for (const line of this.grid) {
            for (const tree of line) {
                tree.isVisible = this.isVisible(tree);
            }
        }

        return this.grid.flat().filter(tree => tree.isVisible === true).length
    }

    part2(): number {
        for (const line of this.grid) {
            for (const tree of line) {
                tree.scenicScore = this.getScenicScore(tree);
            }
        }

        return Math.max(...this.grid.flat().map(tree => tree.scenicScore!))
    }
}