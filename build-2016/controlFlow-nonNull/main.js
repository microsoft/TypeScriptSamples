function countLines(text) {
    var count;
    for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
        var line = text_1[_i];
        if (line.length !== 0) {
            count = count + 1;
        }
    }
    return count;
}
var a = countLines(["one", "two", "", "three"]);
var b = countLines(["hello", null, "world"]);
var c = countLines();
