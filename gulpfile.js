const gulp = require("gulp");
const ts = require("gulp-typescript");
const copy = require("gulp-copy");

const tsProject = ts.createProject("tsconfig.json");

// Task to compile TypeScript files
gulp.task("scripts", function () {
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest("dist/src"));
});

// Task to copy HTML, CSS, and image files
gulp.task("copy-assets", function () {
  return gulp
    .src([
      "src/**/*.html",
      "src/**/*.css",
      "src/**/*.png",
      "src/**/*.jpg",
      "src/**/*.jpeg",
    ])
    .pipe(copy("dist/src", { prefix: 1 }));
});

// Default task to run both tasks in sequence
gulp.task("default", gulp.series("scripts", "copy-assets"));
