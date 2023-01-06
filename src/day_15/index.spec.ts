import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_15", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 10);

            expect(output).toEqual(26);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 2000000);

            expect(output).toEqual([""]);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 0);

            expect(output).toEqual([""]);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 0);

            expect(output).toEqual([""]);
        });
    });
});
