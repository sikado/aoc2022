import { getPointsFromLine, range, zip } from "./utils";

describe('Zip', () => {
    test('Should merge two arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        expect(zip(arr1, arr2)).toEqual([[1, 4], [2, 5], [3, 6]]);
    });
    test('Should fill missing right array item with null', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5];
        expect(zip(arr1, arr2)).toEqual([[1, 4], [2, 5], [3, null]]);
    });
    test('Should fill missing left array item with null', () => {
        const arr1 = [1, 2];
        const arr2 = [4, 5, 6];
        expect(zip(arr1, arr2)).toEqual([[1, 4], [2, 5], [null, 6]]);
    });
    test('Should fill emtpy right array with null', () => {
        const arr1 = [1, 2, 3];
        const arr2: number[] = [];
        expect(zip(arr1, arr2)).toEqual([[1, null], [2, null], [3, null]]);
    });
    test('Should fill emtpy left array with null', () => {
        const arr1: number[] = [];
        const arr2 = [4, 5, 6];
        expect(zip(arr1, arr2)).toEqual([[null, 4], [null, 5], [null, 6]]);
    });
    test('Should handle emtpy arrays', () => {
        const arr1: number[] = [];
        const arr2: number[] = [];
        expect(zip(arr1, arr2)).toEqual([]);
    });
});

describe('range', () => {
    test('return range from 1 to 5', () => {
        expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });
    test('return range from 1 to 5 with reverse param', () => {
        expect(range(5, 1)).toEqual([1, 2, 3, 4, 5]);
    });
    test('return single value if a=b', () => {
        expect(range(5, 5)).toEqual([5]);
    });
    test('return range on negative value', () => {
        expect(range(-3, 2)).toEqual([-3, -2, -1, 0, 1, 2]);
    });
});

describe('getPointsFromLine', () => {
    test('should return points in a horizontal line', () => {
        expect(getPointsFromLine({ x: 0, y: 0 }, { x: 0, y: 4 })).toEqual([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 }
        ]);
    });
    test('should return points in a vertical line', () => {
        expect(getPointsFromLine({ x: 3, y: 2 }, { x: 5, y: 2 })).toEqual([
            { x: 3, y: 2 },
            { x: 4, y: 2 },
            { x: 5, y: 2 },
        ]);
    });
    test('should throw on diagonal line', () => {
        expect(() => getPointsFromLine({ x: 0, y: 2 }, { x: 5, y: 1 })).toThrowError();
    });
    test('should return only one point on a=b', () => {
        expect(getPointsFromLine({ x: 0, y: 2 }, { x: 0, y: 2 })).toEqual([{ x: 0, y: 2 }])
    });
    test('should return points on revese line', () => {
        expect(getPointsFromLine({ x: 0, y: 5 }, { x: 0, y: 2 })).toEqual([
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
        ])
    });
});