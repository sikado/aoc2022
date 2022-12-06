import { readFileSync } from "fs";

export function getData(fileName = "data.txt") {
    return Buffer.from(readFileSync(fileName)).toString().split("\n");
}
