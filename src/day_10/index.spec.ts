import { process } from "./index";
import { getData } from "../utils";
import { join } from "path";

describe("Day_10", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 1);

            expect(output).toEqual(13140);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 1);

            expect(output).toEqual(12740);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data, 2);

            expect(output).toEqual([
                "##..##..##..##..##..##..##..##..##..##..",
                "###...###...###...###...###...###...###.",
                "####....####....####....####....####....",
                "#####.....#####.....#####.....#####.....",
                "######......######......######......####",
                "#######.......#######.......#######.....",
            ]);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data, 2);

            expect(output).toEqual([
                "###..###..###...##..###...##...##..####.",
                "#..#.#..#.#..#.#..#.#..#.#..#.#..#.#....",
                "#..#.###..#..#.#..#.#..#.#..#.#....###..",
                "###..#..#.###..####.###..####.#.##.#....",
                "#.#..#..#.#....#..#.#.#..#..#.#..#.#....",
                "#..#.###..#....#..#.#..#.#..#..###.#....",
            ]);
        });
    });
});
