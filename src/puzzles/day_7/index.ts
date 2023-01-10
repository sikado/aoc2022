interface Directory {
    name: string;
    size: number | undefined;
    parent: Directory | undefined;
    type: "dir";
    children: Array<File | Directory>;
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

export class FS {
    private readonly fs: Directory = {
        name: "/",
        size: undefined,
        type: "dir",
        children: [],
        parent: undefined,
    };

    private readonly cur: Directory = this.fs;


    private readonly dirListSizes: number[] = []

    private getCurrentDirSize() {
        if (this.cur.children.some(child => child.size === undefined)) {
            throw new Error('Leaving dir with children unexplored')
        }
        return this.cur.children.reduce((acc, val) => acc + val.size!, 0)
    }

    constructor(data: string[]) {
        const cdCMD = /^\$ cd (\w+|\.{2})$/;
        const lsCMD = /^\$ ls$/;
        const dirPRT = /^dir (\w+)$/;
        const filePRT = /^(\d+) ([\w.]+)$/;

        // Create graph
        for (let i = 1; i < data.length; i++) {
            const parsedCdCmd = cdCMD.exec(data[i]);
            if (parsedCdCmd != null) {
                if (parsedCdCmd[1] === '..') {
                    this.cur.size = this.getCurrentDirSize();
                    this.dirListSizes.push(this.cur.size);

                    if (this.cur.parent === undefined) {
                        throw new Error('/ has no parent :\'(');
                    }

                    this.cur = this.cur.parent;
                } else {
                    const targetDir = this.cur.children.find(dir => dir.name === parsedCdCmd[1])
                    if (!isDirectory(targetDir)) {
                        throw new Error('Directory doesn\'t exists');
                    }
                    this.cur = targetDir;
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
                        this.cur.children.push({
                            name: parsedDir[1],
                            size: undefined,
                            type: "dir",
                            children: [],
                            parent: this.cur,
                        });
                    } else if (parsedFile != null) {
                        this.cur.children.push({
                            name: parsedFile[2],
                            size: Number.parseInt(parsedFile[1], 10),
                            type: "file",
                            parent: this.cur,
                        });
                    }
                } while (parsedDir != null || parsedFile != null)
                i--;
            }
        }

        do {
            this.cur.size = this.getCurrentDirSize();
            this.dirListSizes.push(this.cur.size);
            if (this.cur.parent == null) {
                break;
            }
            this.cur = this.cur.parent;
        } while (true)
    }

    getToBeDeletedSize(): number {
        // Part 1
        const MAX_SIZE = 100000;
        return this.dirListSizes.filter(size => size < MAX_SIZE).reduce((acc, size) => acc + size, 0)
    }

    getMinToDeleteDirectory(): number {
        // PART 2
        const missingSpace = 30000000 - (70000000 - this.fs.size!);

        const delta = this.dirListSizes.map(size => size - missingSpace);
        const minDelta = Math.min(...delta.filter(val => val > 0))
        const index = delta.indexOf(minDelta);

        return this.dirListSizes[index]
    }
}
