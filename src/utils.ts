import { readFileSync } from "fs";

export function getData(fileName = "data.txt"): string[] {
    return Buffer.from(readFileSync(fileName)).toString().split("\n");
}

/**
 * Merge two array into 2-tuples of their items.
 * Set item to null if lenght not equal
 */
export function zip<T, U>(a: T[], b: U[]): Array<[T | U | null, T | U | null]> {
    const maxLength = a.length > b.length ? a.length : b.length;

    const output: Array<[T | U | null, T | U | null]> = [];

    for (let i = 0; i < maxLength; i++) {
        output.push([a[i] ?? null, b[i] ?? null]);
    }

    return output;
}

export interface Coord {
    x: number;
    y: number;
}

/**
 * Return every points from a straight line
 */
export function getPointsFromLine(a: Coord, b: Coord): Coord[] {
    if (a.x === b.x) {
        const yCoord = range(a.y, b.y);
        return yCoord.map((y) => ({ x: a.x, y }));
    } else if (a.y === b.y) {
        const xCoord = range(a.x, b.x);
        return xCoord.map((x) => ({ x, y: a.y }));
    } else {
        throw new Error("Line isn't straight");
    }
}

/**
 * Return an array filled with value between a & b (inclusive, in asc order)
 */
export function range(a: number, b: number) {
    return Array.from<number, number>(
        { length: Math.abs(a - b) + 1 },
        (_, index) => Math.min(a, b) + index
    );
}

export function coordEq(a: Coord, b: Coord): boolean {
    return a.x === b.x && a.y === b.y;
}
