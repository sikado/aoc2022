import { process } from "./index";
import { getData } from "../utils";

describe("Day_6", () => {
    describe("Part 1", () => {
        test("Test case 1", () => {
            const data = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

            const output = process(data);

            expect(output).toEqual(7);
        });
        test("Test case 2", () => {
            const data = "bvwbjplbgvbhsrlpgdmjqwftvncz";

            const output = process(data);

            expect(output).toEqual(5);
        });
        test("Test case 3", () => {
            const data = "nppdvjthqldpwncqszvftbrmjlhg";

            const output = process(data);

            expect(output).toEqual(6);
        });
        test("Test case 4", () => {
            const data = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

            const output = process(data);

            expect(output).toEqual(10);
        });
        test("Test case 5", () => {
            const data = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

            const output = process(data);

            expect(output).toEqual(11);
        });

        test("Puzzle 1", () => {
            const data = getData(__dirname + "/data.txt")[0];

            const output = process(data);

            expect(output).toEqual(1210);
        });
    });

    describe("Part 2", () => {
        const WINDOW_SIZE = 14;
        test("Test case 1", () => {
            const data = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(19);
        });
        test("Test case 2", () => {
            const data = "bvwbjplbgvbhsrlpgdmjqwftvncz";

            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(23);
        });
        test("Test case 3", () => {
            const data = "nppdvjthqldpwncqszvftbrmjlhg";
            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(23);
        });
        test("Test case 4", () => {
            const data = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(29);
        });
        test("Test case 5", () => {
            const data = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(26);
        });

        test("Puzzle 2", () => {
            const data = getData(__dirname + "/data.txt")[0];

            const output = process(data, WINDOW_SIZE);

            expect(output).toEqual(3476);
        });
    });
});
