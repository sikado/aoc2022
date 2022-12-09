import { isAdjacent, process } from "./index";
import { getData } from "../utils";

describe("Day_9", () => {
    describe("TDD", () => {
        it("Should unvalidate diferente points", () => {
            expect(isAdjacent([17, 15], [-5, 2])).toBeFalsy();
        });
        it("Should validate same point 1", () => {
            expect(isAdjacent([0, 0], [0, 0])).toBeTruthy();
        });
        it("Should validate same point 2", () => {
            expect(isAdjacent([8, 12], [8, 12])).toBeTruthy();
        });
        it("Should validate same point 3", () => {
            expect(isAdjacent([2, -4], [2, -4])).toBeTruthy();
        });
        it("Should validate close point 1", () => {
            expect(isAdjacent([0, 0], [0, 1])).toBeTruthy();
        });
        it("Should validate close point 2", () => {
            expect(isAdjacent([0, 0], [1, 0])).toBeTruthy();
        });
        it("Should validate close point 3", () => {
            expect(isAdjacent([0, 0], [-1, 0])).toBeTruthy();
        });
        it("Should validate close point 4", () => {
            expect(isAdjacent([0, 0], [0, -1])).toBeTruthy();
        });
    });
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(__dirname + "/tcase.txt");

            const output = process(data);

            expect(output).toEqual(13);
        });

        test("Puzzle", () => {
            const data = getData(__dirname + "/data.txt");

            const output = process(data);

            expect(output).toEqual(5513);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(__dirname + "/tcase2.txt");

            const output = process(data, 10);

            expect(output).toEqual(36);
        });

        test("Puzzle", () => {
            const data = getData(__dirname + "/data.txt");

            const output = process(data, 10);

            expect(output).toEqual(2427);
        });
    });
});
