import type P5 from "p5";
import { Cell } from "../Cell";

export function drawGrid(p5: P5, grid: Cell[][], RECT_SIZE: number): void {
    grid.flat().forEach(cell => {
        const alpha = Math.floor((cell.elevation.charCodeAt(0) - "a".charCodeAt(0)) * 100 / 26) / 100
        const color = p5.color(`rgba(63,80,181,${alpha})`)
        if (cell.isStart || cell.isEnd) {
            p5.fill("red");
        } else {
            p5.fill(color)
        }
        p5.rect(cell.coord.x * RECT_SIZE, cell.coord.y * RECT_SIZE, RECT_SIZE)
    })
}

export function highlightCell(p5: P5, cell: Cell, RECT_SIZE: number): void {
    const VISITED_COLOR = "orange"

    p5.fill(VISITED_COLOR);
    p5.rect(cell.coord.x * RECT_SIZE, cell.coord.y * RECT_SIZE, RECT_SIZE)
}