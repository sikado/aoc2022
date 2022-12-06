const { part1, part2 } = require("./index");
const getData = require("../utils");

describe("Day_3", () => {
    test("Test case 1", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = part1(data);

        expect(output).toEqual(157);
    });

    test("Puzzle 1", () => {
        const data = getData(__dirname + "/data.txt");

        const output = part1(data);

        expect(output).toEqual(7821);
    });

    test("Test case 2", () => {
        const data = getData(__dirname + "/tcase.txt");

        const output = part2(data);

        expect(output).toEqual(70);
    });

    test("Puzzle 2", () => {
        const data = getData(__dirname + "/data.txt");

        const output = part2(data);

        expect(output).toEqual(null);
    });
});
