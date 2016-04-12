class A { a: string }
class B { b: string }
class C { c: string }
class D { d: string }
class E { e: string }

function getABCDE(kind: string) {
    return kind === "A" ? new A() :
        kind === "B" ? new B() :
        kind === "C" ? new C() :
        kind === "D" ? new D() :
        new E();
}

function strange(kind: string) {
    let x = getABCDE(kind);
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
