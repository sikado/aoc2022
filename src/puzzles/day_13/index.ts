import { zip } from "../utils";

export function process(data: any[]): number {
    const list: Array<[any[], any[]]> = [];

    // group by paires
    for (let i = 0; i < data.length; i += 3) {
        list.push([data[i], data[i + 1]]);
    }

    // Sum of ordered packets' indexes (starting at 1)
    // .map((packets) => packets.map(parsePacket) as [Packet[], Packet[]])
    const sumIndexOrdered = list
        .map(comparePackets)
        .reduce((acc, val, index) => (val ? acc + index + 1 : acc), 0);

    return sumIndexOrdered;
}

export function comparePackets([packetA, packetB]: [
    Packet[],
    Packet[]
]): boolean {
    return zip(packetA, packetB).every(([itemA, itemB]) => {
        if (itemA === null && itemB !== null) {
            return true;
        } else if (itemA !== null && itemB === null) {
            return false;
        } else if (itemA === null && itemB === null) {
            throw new Error("What ??");
        }

        if (!Array.isArray(itemA) && !Array.isArray(itemB)) {
            return itemA! <= itemB!;
        } else if (Array.isArray(itemA) && Array.isArray(itemB)) {
            return comparePackets([itemA, itemB]);
        } else if (Array.isArray(itemA) && !Array.isArray(itemB)) {
            return itemA[0] <= itemB!;
        } else if (!Array.isArray(itemA) && Array.isArray(itemB)) {
            return itemA! <= itemB[0];
        }
        throw new Error("Wait... What ?!");
    });
}

type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
type Packet = ValueOrArray<number>;

export function parsePacket(stringPacket: string): Packet[] {
    const [firstChar, ...stripedPacket] = stringPacket;
    const lastChar = stripedPacket.pop();

    if (firstChar !== "[" || lastChar !== "]") {
        throw new Error("malformed packet");
    }

    let i = 0;
    const packet: Packet = [];
    let acc: string = "";
    while (i < stripedPacket.length) {
        if (/\d/.test(stripedPacket[i])) {
            acc += stripedPacket[i];
            i++;
        } else if (stripedPacket[i] === ",") {
            if (acc !== "") {
                packet.push(Number.parseInt(acc));
                acc = "";
            }
            i++;
        } else if (stripedPacket[i] === "[") {
            let subPacket = "[";
            let openningBacket = 1;
            do {
                i++;
                subPacket += stripedPacket[i];

                if (stripedPacket[i] === "[") {
                    openningBacket++;
                } else if (stripedPacket[i] === "]") {
                    openningBacket--;
                }
            } while (!(stripedPacket[i] === "]" && openningBacket === 0));

            packet.push(parsePacket(subPacket));
            i++;
        } else {
            throw new Error("Wait... What ?!");
        }
    }

    if (acc !== "") {
        packet.push(Number.parseInt(acc));
    }

    return packet;
}
