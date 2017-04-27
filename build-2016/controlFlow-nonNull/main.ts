
function countLines(text?: string[]): number {
    let count: number;
    for (const line of text) {
        if (line.length !== 0) {
            count = count + 1;
        }
    }
    return count;
}

let a = countLines(["one", "two", "", "three"]);
let b = countLines(["hello", null, "world"]);
let c = countLines();
