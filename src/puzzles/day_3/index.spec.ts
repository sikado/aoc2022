import { part1, part2 } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_3", () => {
    test("Test case 1", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = part1(data);

        expect(output).toEqual(157);
    });

    test("Puzzle 1", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = part1(data);

        expect(output).toEqual(7821);
    });

    test("Test case 2", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = part2(data);

        expect(output).toEqual(70);
    });

    test("Puzzle 2", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = part2(data);

        expect(output).toEqual(2752);
    });
});
