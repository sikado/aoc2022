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

function getSize(cur: Directory) {
    if (cur.directories.some(dir => dir.size === undefined)) {
        throw new Error('Leaving dir with children unexplored')
    }
    return cur.files.reduce((acc, val) => acc + val.size, 0) + cur.directories.reduce((acc, val) => acc + val.size!, 0)

}

export function process(data: string[]): number {
    const cdCMD = /^\$ cd (\w+|\.{2})$/;
    const lsCMD = /^\$ ls$/;
    const dirPRT = /^dir (\w+)$/;
    const filePRT = /^(\d+) ([\w.]+)$/;

    let toBeDeletedSize: number = 0;
    const MAX_SIZE = 100000;

    let cur = fs;

    // const dirList: Directory[] = []

    // Create graph
    for (let i = 1; i < data.length; i++) {
        const parsedCdCmd = cdCMD.exec(data[i]);
        if (parsedCdCmd != null) {
            if (parsedCdCmd[1] === '..') {
                cur.size = getSize(cur);

                // dirList.push(cur);

                if (cur.size < MAX_SIZE) {
                    toBeDeletedSize += cur.size;
                }

                if (cur.parent === undefined) {
                    throw new Error('/ has no parent :\'(');
                }

                cur = cur.parent;
            } else {
                const targetDir = cur.directories.find(dir => dir.name === parsedCdCmd[1])
                if (targetDir === undefined) {
                    throw new Error('Directory doesn\'t exists');
                }
                cur = targetDir;
            }
        }

        if (lsCMD.test(data[i])) {
            let parsedDir;
            let parsedFile

            do {
                i++;
                if (i > data.length) {
                    break;
                }
                parsedDir = dirPRT.exec(data[i]);
                parsedFile = filePRT.exec(data[i]);

                if (parsedDir != null) {
                    cur.directories.push({
                        name: parsedDir[1],
                        size: undefined,
                        type: "dir",
                        files: [],
                        directories: [],
                        parent: cur,
                    });
                } else if (parsedFile != null) {
                    cur.files.push({
                        name: parsedFile[2],
                        size: Number.parseInt(parsedFile[1], 10),
                        type: "file",
                        parent: cur,
                    });
                }
            } while (parsedDir != null || parsedFile != null)
            i--;
        }
    }

    while (cur.parent != null) {
        cur.size = getSize(cur);
        // dirList.push(cur);
        if (cur.size < MAX_SIZE) {
            toBeDeletedSize += cur.size;
        }
        cur = cur.parent;
    }

    return toBeDeletedSize;


    // PART 2
    /* const missingSpace = 30000000 - (70000000 - fs.size);

    const delta = dirList.map(dir => dir.size! - missingSpace);
    const minDelta = Math.min(...delta.filter(val => val > 0))
    const index = delta.indexOf(minDelta);

    return dirList[index].size! */

}
