interface Directory {
    name: string;
    size: number | undefined;
    parent: Directory | undefined;
    type: "dir";
    files: File[];
    directories: Directory[];
}

interface File {
    name: string;
    size: number;
    parent: Directory;
    type: "file";
}

function isFile(obj: any): obj is File {
    return (obj as File)?.type === "file";
}

function isDirectory(obj: any): obj is Directory {
    return (obj as Directory)?.type === "dir";
}

const fs: Directory = {
    name: "/",
    size: undefined,
    type: "dir",
    files: [],
    directories: [],
    parent: undefined,
};

export function process(data: string[]): number {
    const cdCMD = /^\$ cd ([\w+/.])$/;
    const lsCMD = /^\$ ls$/;
    const dirPRT = /^dir (\w+)$/;
    const filePRT = /^(\d+) ([\w.]+)$/;

    let cur: Directory;

    // Create graph
    for (let i = 0; i < data.length; i++) {
        if (cdCMD.test(data[i])) {
            const foo = cdCMD.exec(data[i]);
            if (foo) {
            }
        } else if (data[i].match(lsCMD)) {
        }
        // If `cd`, move cursor
        // If `ls`, fill Directory
    }

    // Sum Dir with only files or with all dir with size

    // If Dir > Threshold Add to cound

    return -1;
}

function displayNode(item: File | Directory, deepth = 0): string[] {
    if (isFile(item)) {
        return [
            Array(deepth * 2)
                .fill(" ")
                .join("") + `- ${item.name} (file, size=${item.size})`,
        ];
    }

    // If directory
    return [
        Array(deepth * 2)
            .fill(" ")
            .join("") + `- ${item.name} (dir)`,
        ...item.directories.map((dir) => displayNode(dir, deepth + 1)).flat(),
        ...item.files.map((file) => displayNode(file, deepth)).flat(),
    ];

    /* return [
        "- / (dir)",
        "  - a (dir)",
        "  - e (dir)",
        "    - i (file, size=584)",
        "    - f (file, size=29116)",
        "    - g (file, size=2557)",
        "    - h.lst (file, size=62596)",
        "    - b.txt (file, size=14848514)",
        "    - c.dat (file, size=8504156)",
        "  - d (dir)",
        "    - j (file, size=4060174)",
        "    - d.log (file, size=8033020)",
        "    - d.ext (file, size=5626152)",
        "    - k (file, size=7214296)",
    ]; */
}
