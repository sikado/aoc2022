import { readFileSync } from "fs";

export function getData(fileName = "data.txt"): string[] {
    return Buffer.from(readFileSync(fileName)).toString().split("\n");
}
