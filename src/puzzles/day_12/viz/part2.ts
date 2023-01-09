import type P5 from 'p5';
import { Grid } from '..';
import rawData from '../data.txt?raw';
import { drawGrid, highlightCell } from './utils';


const sketch = (containerWidth: number) => {
    return (p5: P5) => {

        const data: string[] = rawData.split('\n');

        const grid = new Grid(data, true);

        const RECT_SIZE = Math.floor(containerWidth / grid._gridSize.w * 10) / 10

        p5.setup = () => {
            p5.createCanvas(grid._gridSize.w * RECT_SIZE, grid._gridSize.h * RECT_SIZE);

            drawGrid(p5, grid._grid, RECT_SIZE);

        }


        p5.draw = () => {
            if (!grid.hasCellToVisit()) {
                p5.noLoop();
                return;
            }

            highlightCell(p5, grid.visitCell(), RECT_SIZE)

        }

    }
}

export default sketch