import { join } from "path";
import { getData } from "../utils";
import { process } from "./index";

describe("Day_7", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual(95437);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual(1886043);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual(24933642);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual([""]);
        });
    });
});
