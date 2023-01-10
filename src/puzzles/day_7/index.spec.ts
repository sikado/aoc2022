import { join } from "path";
import { getData } from "../utils";
import { FS } from "./index";

describe("Day_7", () => {
    describe("Part 1", () => {
        test("Test case", () => {
            const fs = new FS(getData(join(__dirname, "tcase.txt")));

            expect(fs.getToBeDeletedSize()).toEqual(95437);
        });

        test("Puzzle", () => {
            const fs = new FS(getData(join(__dirname, "data.txt")));

            expect(fs.getToBeDeletedSize()).toEqual(1886043);
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const fs = new FS(getData(join(__dirname, "tcase.txt")));

            expect(fs.getMinToDeleteDirectory()).toEqual(24933642);
        });

        test("Puzzle", () => {
            const fs = new FS(getData(join(__dirname, "data.txt")));

            expect(fs.getMinToDeleteDirectory()).toEqual(3842121);
        });
    });
});
