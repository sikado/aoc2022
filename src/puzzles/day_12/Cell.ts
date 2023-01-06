import { Coord } from "../utils";


export interface Cell {
    elevation: string;
    isStart: boolean;
    isEnd: boolean;
    score: null | number;
    coord: Coord;
}
