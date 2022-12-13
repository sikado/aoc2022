import { zip } from "./utils";

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