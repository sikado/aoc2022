import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_12", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual(31);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual(447);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, true);

            expect(output).toEqual(29);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, true);

            expect(output).toEqual(446);
        });
    });
});
