import { process, getRoundScore, getScoreByOutcome } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_2", () => {
    test("Test case 1", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data, getRoundScore);

        expect(output).toEqual(15);
    });

    test("Puzzle 1", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data, getRoundScore);

        expect(output).toEqual(13675);
    });

    test("Test case 2", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data, getScoreByOutcome);

        expect(output).toEqual(12);
    });

    test("Puzzle 2", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data, getScoreByOutcome);

        expect(output).toEqual(14184);
    });
});
