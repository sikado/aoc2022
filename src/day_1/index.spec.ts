import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_1", () => {
    test("Case 1", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data);

        expect(output).toEqual(24000);
    });

    test("Puzzle 1", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data);

        expect(output).toEqual(72240);
    });

    test("Case 2", () => {
        const data = getData(join(__dirname, "tcase.txt"));

        const output = process(data, 3);

        expect(output).toEqual(45000);
    });

    test("Puzzle 2", () => {
        const data = getData(join(__dirname, "data.txt"));

        const output = process(data, 3);

        expect(output).toEqual(210957);
    });
});
