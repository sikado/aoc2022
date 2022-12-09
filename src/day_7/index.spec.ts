import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_X", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual(95437);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual(0);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual([""]);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual([""]);
        });
    });
});
