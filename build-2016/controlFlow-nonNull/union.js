var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
    function B() {
    }
    return B;
}());
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
var E = (function () {
    function E() {
    }
    return E;
}());
function getABCDE(kind) {
    return kind === "A" ? new A() :
        kind === "B" ? new B() :
            kind === "C" ? new C() :
                kind === "D" ? new D() :
                    new E();
}
function strange(kind) {
    var x = getABCDE(kind);
    if (x instanceof A) {
        x;
        x = new B();
        x;
    }
    else if (x instanceof B || x instanceof C) {
        x;
    }
    else if (!(x instanceof D)) {
        x;
    }
    else {
        return;
    }
    x;
}
