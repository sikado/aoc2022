export function part1(data: string[]): number {
    return (
        data
            // Remove empty lines
            .filter((item) => item !== "")
            .map((rucksack) => {
                // Split pockets
                // Convert pocket1 in unique array
                const pocket1 = [
                    ...new Set(
                        rucksack.slice(0, rucksack.length / 2).split("")
                    ),
                ];
                const pocket2 = rucksack.slice(rucksack.length / 2);

                const duplicates = pocket1
                    // Find duplicates
                    .filter((char) => pocket2.includes(char))
                    // Convert to priority
                    .map(getPriority)
                    // Sum bags
                    .reduce((acc, val) => acc + val, 0);

                return duplicates;
            })
            // Sum rucksack duplicates
            .reduce((acc, val) => acc + val, 0)
    );
}

export function part2(data: string[]): number {
    return (
        data
            // Remove empty lines
            .filter((item) => item !== "")
            // group by group of 3
            .reduce<string[][]>(
                (acc, val) => {
                    const lastTuple = acc[acc.length - 1];
                    if (lastTuple.length < 3) {
                        lastTuple.push(val);
                    } else {
                        acc.push([val]);
                    }
                    return acc;
                },
                [[]]
            )
            .map(([rucksack1, rucksack2, rucksack3]) => {
                // Array of unique item in rucksack 1
                const uniqueRuck1 = [...new Set(rucksack1.split(""))];

                const duplicates = uniqueRuck1
                    // Duplicates between rucksack 1 & 2
                    .filter((char) => rucksack2.includes(char))
                    // Duplicates between rucksack 1+2 & 3
                    .filter((char) => rucksack3.includes(char));

                if (duplicates.length !== 1) {
                    throw new Error("Non unique badge !");
                }

                return getPriority(duplicates[0]);
            })
            // Sum badges
            .reduce((acc, val) => acc + val, 0)
    );
}

/**
 * Convert bag in priority
 */
function getPriority(char: string): number {
    const charCode = char.charCodeAt(0);

    if (charCode > 96) {
        return charCode - 96; // Lowercase
    } else {
        return charCode - 65 + 27; // Uppercase (start charcode + offset)
    }
}
