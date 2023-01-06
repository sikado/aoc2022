import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_4", () => {
    test("Test case 1", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data);

        expect(output).toEqual(2);
    });

    test("Puzzle 1", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data);

        expect(output).toEqual(487);
    });

    test("Test case 2", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data, true);

        expect(output).toEqual(4);
    });

    test("Puzzle 2", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data, true);

        expect(output).toEqual(849);
    });
});
