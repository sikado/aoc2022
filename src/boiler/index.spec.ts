import { process } from "./index";
import { getData } from "../utils";

describe("Day_X", () => {
    test("Test case 1", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = process(data);

        expect(output).toEqual([""]);
    });

    test("Puzzle 1", () => {
        const data = getData(__dirname + "/data.txt");

        const output = process(data);

        expect(output).toEqual([""]);
    });

    test("Test case 2", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = process(data);

        expect(output).toEqual([""]);
    });

    test("Puzzle 2", () => {
        const data = getData(__dirname + "/data.txt");

        const output = process(data);

        expect(output).toEqual([""]);
    });
});
