var gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , ts = require('gulp-typescript')
  , typescript = require('typescript')
  , del = require('del')
  , merge = require('merge2')
  , path = require('path')
  , spawn = require('child_process').spawn;

var lib = {
    project: ts.createProject('./src/lib/tsconfig.json', { typescript: typescript }),
    bin: "./bin/ts-async-github-sample",
    main: "./lib/github",
    base: "./src/lib/",
    dest: "./lib/",
    src: ["./src/lib/**/*.ts"],
    out: ["./lib/**/*"]
};

gulp.task("clean:lib", clean(lib));
gulp.task("clean", ["clean:lib"]);
gulp.task("build:lib", build(lib));
gulp.task("build", ["build:lib"]);
gulp.task("test", ["build"], test(lib));
gulp.task("watch:lib", ["build:lib"], watch(src(lib), ["build:lib"]));
gulp.task("watch", ["build", "test"], watch(src(lib), ["test"]));
gulp.task("default", ["build"]);

function src() {
    return Array.from(arguments).reduce(function (ar, opts) { 
        return ar.concat(opts.src); 
    }, []);
}

function clean(opts) {
    return function (done) {
        del(opts.out, done);
    };
}

function build(opts) {
    return function () {
        var tee = gulp
            .src(opts.src, { base: opts.base })
            .pipe(sourcemaps.init())
            .pipe(ts(opts.project));
        return merge([
            tee.dts
                .pipe(gulp.dest(opts.dest)),
            tee.js
                .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: path.relative(opts.dest, opts.base) }))
                .pipe(gulp.dest(opts.dest))
        ]);
    };
}

function test(opts) {
    return function (done) {
        var args = [opts.bin];
        console.log("Executing test...");
        spawn(process.argv[0], args, { stdio: "inherit" }).on("exit", function (code) {
            done(code !== 0 ? "Error executing script." : undefined);
        });
    };
}

function watch(src, tasks) {
    return function () { 
        return gulp.watch(src, tasks); 
    }
}