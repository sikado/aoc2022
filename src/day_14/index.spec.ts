import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_14", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual(24);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual(674);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, true);

            expect(output).toEqual(93);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, true);

            expect(output).toEqual(24958);
        });
    });
});
