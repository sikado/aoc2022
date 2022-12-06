import { process } from "./index";
import { getData } from "../utils";

describe("Day_4", () => {
    test("Test case 1", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = process(data);

        expect(output).toEqual(2);
    });

    test("Puzzle 1", () => {
        const data = getData(__dirname + "/data.txt");

        const output = process(data);

        expect(output).toEqual(487);
    });

    test("Test case 2", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = process(data, true);

        expect(output).toEqual(4);
    });

    test("Puzzle 2", () => {
        const data = getData(__dirname + "/data.txt");

        const output = process(data, true);

        expect(output).toEqual(849);
    });
});
