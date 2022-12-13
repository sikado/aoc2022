import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_11", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 20);

            expect(output).toEqual("10605");
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 20);

            expect(output).toEqual("55944");
        });
    });

    describe("Part 2", () => {

        test("Pre-test case, 1 round", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 1, false);

            expect(output).toEqual("24");
        });

        test("Pre-test case, 20 round", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 20, false);

            expect(output).toEqual("10197");
        });

        test("Pre-test case, 1000 round", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 1000, false);

            expect(output).toEqual("27019168");
        });

        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 10000, false);

            expect(output).toEqual("2713310158");
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 10000, false);

            expect(output).toEqual("15117269860");
        });
    });
});
