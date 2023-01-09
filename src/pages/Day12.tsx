import Sketch from "../components/Sketch";
import sketchPart1 from "../puzzles/day_12/viz/part1";
import sketchPart2 from "../puzzles/day_12/viz/part2";

export default function Day12() {
    return (
        <>
            <h1>Day 12</h1>
            <h3>Part 1</h3>
            <Sketch sketch={sketchPart1} />

            <h3>Part 2</h3>
            <Sketch sketch={sketchPart2} />
        </>
    );
}
