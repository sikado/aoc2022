import { join } from "path";
import { getData } from "../utils";
import { Puzzle } from "./index";

describe("Day_8", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const puzzle = new Puzzle(data);

            expect(puzzle.part1()).toEqual(21);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const puzzle = new Puzzle(data);

            const nbVisibleTrees = puzzle.part1();

            expect(nbVisibleTrees).toEqual(1698);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const puzzle = new Puzzle(data);

            expect(puzzle.part2()).toEqual(8);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const puzzle = new Puzzle(data);

            expect(puzzle.part2()).toEqual(672280);
        });
    });
});
