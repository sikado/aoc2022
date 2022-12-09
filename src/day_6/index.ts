export function process(data: string, WINDOW_SIZE = 4): number {
    let cur = 0;

    while (cur + WINDOW_SIZE < data.length) {
        const marker = data.slice(cur, cur + WINDOW_SIZE);

        if (isUnique(marker)) {
            return cur + WINDOW_SIZE;
        } else {
            cur++;
        }
    }
    throw new Error("No marker");
}

function isUnique(str: string) {
    const uniqueString = new Set(str);
    return uniqueString.size === str.length;
}
