import { Coord, dManhattan, Range } from "../utils";

export function process(data: string[], rowToCheck: number): number {
    const collisions = data.map<{ sensor: Coord, beacon: Coord }>(
        (line) => {
            const re = /x=(-?\d+), y=(-?\d+)/g;
            const [_, sensorX, sensorY] = re.exec(line)!;
            const [__, beaconX, beaconY] = re.exec(line)!;

            return {
                sensor: {
                    x: Number.parseInt(sensorX),
                    y: Number.parseInt(sensorY),
                },
                beacon: {
                    x: Number.parseInt(beaconX),
                    y: Number.parseInt(beaconY),
                },
            };
        }
    )
        // Get distance to beacon && shortest distance to Y line
        .map((reading) => ({
            ...reading,
            mDistance: dManhattan(reading.beacon, reading.sensor),
            yDistance: Math.abs(reading.sensor.y - rowToCheck)
        }))
        .reduce<Range[]>((acc, reading) => {
            // if Db > Dy
            if (reading.mDistance > reading.yDistance) {
                // Y union Bzone => range [Sx - (mD - yD); Sx + (mD - yD)]
                const mDMinYD = reading.mDistance - reading.yDistance;
                acc.push([reading.sensor.x - mDMinYD, reading.sensor.x + mDMinYD])
            }
            return acc;
        }, [])
        .reduce<Range[]>((acc, val) => {
            return acc;
        }, [])



    // Count unique collisions
    return new Set(collisions).size
}
