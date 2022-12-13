import { comparePackets, parsePacket, process } from "./index";
import { getData } from "../utils";
import { join } from "path";
import { data as tcaseData } from "./tcase";
import { data as inputData } from "./data";

describe("Day_13", () => {
    describe("Part 1", () => {

        describe.skip('test parsing', () => {
            test('parse simple packet', () => {
                const packet = "[1,1,3,1,1]";
                expect(parsePacket(packet)).toEqual([1, 1, 3, 1, 1])
            })
            test('parse single item packet', () => {
                const packet = "[1]";
                expect(parsePacket(packet)).toEqual([1])
            })
            test('parse nested packet', () => {
                const packet = "[1,[2,3,4]]";
                expect(parsePacket(packet)).toEqual([1, [2, 3, 4]])
            })
            test('parse adjacent nested packet', () => {
                const packet = "[[1],[2,3,4]]";
                expect(parsePacket(packet)).toEqual([[1], [2, 3, 4]])
            })
            test('parse double nested packet', () => {
                const packet = "[[2,3,4]]";
                expect(parsePacket(packet)).toEqual([[2, 3, 4]])
            })
            test('parse empty packet', () => {
                const packet = "[]";
                expect(parsePacket(packet)).toEqual([])
            })
            test('deeply nested packets', () => {
                const packet = "[1,[2,[3,[4,[5,6,7]]]],8,9]";
                expect(parsePacket(packet)).toEqual([1, [2, [3, [4, [5, 6, 7]]]], 8, 9])
            })
            test('parse nested empty packet', () => {
                const packet = "[[[]]]";
                expect(parsePacket(packet)).toEqual([[[]]])
            })
        })

        describe('partial test', () => {
            test("Compare first pair", () => {
                const packetA = [1, 1, 3, 1, 1];
                const packetB = [1, 1, 5, 1, 1];

                expect(comparePackets([packetA, packetB])).toBeTruthy()
            });
            test("Compare second pair", () => {
                const packetA = [[1], [2, 3, 4]];
                const packetB = [[1], 4];

                expect(comparePackets([packetA, packetB])).toBeTruthy()
            });
            test("Compare third pair", () => {
                const packetA = [9];
                const packetB = [[8, 7, 6]];

                expect(comparePackets([packetA, packetB])).toBeFalsy()
            });
            test("Compare forth pair", () => {
                const packetA = [[4, 4], 4, 4];
                const packetB = [[4, 4], 4, 4, 4];

                expect(comparePackets([packetA, packetB])).toBeTruthy()
            });
            test("Compare fith pair", () => {
                const packetA = [7, 7, 7, 7];
                const packetB = [7, 7, 7];

                expect(comparePackets([packetA, packetB])).toBeFalsy()
            });
            test("Compare sixth pair", () => {
                const packetA: number[] = [];
                const packetB = [3];

                expect(comparePackets([packetA, packetB])).toBeTruthy()
            });
            test("Compare seventh pair", () => {
                const packetA = [[[]]];
                const packetB = [[]];

                expect(comparePackets([packetA, packetB])).toBeFalsy()
            });
            test("Compare eigth pair", () => {
                const packetA = [1, [2, [3, [4, [5, 6, 7]]]], 8, 9];
                const packetB = [1, [2, [3, [4, [5, 6, 0]]]], 8, 9];

                expect(comparePackets([packetA, packetB])).toBeFalsy()
            });
        })

        test("Test case", () => {
            // const data = getData(join(__dirname, "tcase.txt"));

            const output = process(tcaseData);

            expect(output).toEqual(13);
        });

        test("Puzzle", () => {
            // const data = getData(join(__dirname, "data.txt"));

            const output = process(inputData);

            expect(output).toBeGreaterThan(491);
            // 491 too low
            // 408 too low
        });
    });

    describe("Part 2", () => {
        test("Test case", () => {
            const data = getData(join(__dirname, "tcase.txt"));

            const output = process(data);

            expect(output).toEqual([""]);
        });

        test("Puzzle", () => {
            const data = getData(join(__dirname, "data.txt"));

            const output = process(data);

            expect(output).toEqual([""]);
        });
    });
});
