import { process } from "./index";
import { getData } from "../utils";

describe("Day_5", () => {
    test("Test case 1", () => {
        const movesData = getData(__dirname + "/tcase.txt");
        const stackData = [" D ", "NC ", "ZMP"];

        const output = process(stackData, movesData, "9000");

        expect(output).toEqual("CMZ");
    });

    test("Puzzle 1", () => {
        const movesData = getData(__dirname + "/data.txt");
        const stackData = [
            "N   R   C",
            "TJ  SJ  N",
            "BZ HMZ  D",
            "SP GLHZ T",
            "QD FDVLSM",
            "HFVJCWPWL",
            "GSHZZTFVH",
            "RHZMTMTQW",
        ];

        const output = process(stackData, movesData, "9000");

        expect(output).toEqual("PTWLTDSJV");
    });

    test("Test case 2", () => {
        const movesData = getData(__dirname + "/tcase.txt");
        const stackData = [" D ", "NC ", "ZMP"];

        const output = process(stackData, movesData, "9001");

        expect(output).toEqual("MCD");
    });

    test("Puzzle 2", () => {
        const movesData = getData(__dirname + "/data.txt");
        const stackData = [
            "N   R   C",
            "TJ  SJ  N",
            "BZ HMZ  D",
            "SP GLHZ T",
            "QD FDVLSM",
            "HFVJCWPWL",
            "GSHZZTFVH",
            "RHZMTMTQW",
        ];

        const output = process(stackData, movesData, "9001");

        expect(output).toEqual("");
    });
});
