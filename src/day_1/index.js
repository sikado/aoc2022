/**
 * @param {string[]} data input data
 * @param {number} topElfs number of elfs to sum
 * @returns {number}
 */
function process(data, topElfs = 1) {
    const groupedElfs = data
        .map((item) => {
            // cast string to number. Elf separator: `null`
            if (item === "") {
                return null;
            } else {
                return Number.parseInt(item, 10);
            }
        })
        .reduce((acc, val) => {
            // Sum by elfs
            if (acc.length === 0 || val === null) {
                return [...acc, val ?? 0];
            } else {
                const currElf = acc.pop() ?? 0;
                return [...acc, currElf + val];
            }
        }, []);

    // Sort Elfs
    groupedElfs.sort((a, b) => a - b);

    return (
        groupedElfs
            // Slice topElfs
            .slice(groupedElfs.length - topElfs, groupedElfs.length)
            // Sum top elfs
            .reduce((acc, val) => acc + val, 0)
    );
}

module.exports = process;
