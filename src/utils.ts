import { readFileSync } from "fs";

export function getData(fileName = "data.txt"): string[] {
    return Buffer.from(readFileSync(fileName)).toString().split("\n");
}

/**
 * Merge two array into 2-tuples of their items. 
 * Set item to null if lenght not equal
 */
export function zip<T, U>(a: T[], b: U[]): Array<[(T | U | null), (T | U | null)]> {
    const maxLength = a.length > b.length ? a.length : b.length;

    const output: Array<[(T | U | null), (T | U | null)]> = [];

    for (let i = 0; i < maxLength; i++) {
        output.push([a[i] ?? null, b[i] ?? null])
    }

    return output;
}