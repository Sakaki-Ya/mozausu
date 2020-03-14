"use strict";

const gulp = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");

const sassOptions = {
  options: {
    outputStyle: "compressed",
    sourceMap: false,
    sourceComment: false
  }
};

gulp.task("style", () => {
  const src = "./style/style.scss";
  const dest = "./style/";
  return gulp
    .src(src)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(sass(sassOptions))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest))
    .pipe(
      notify({
        title: "scssをコンパイルしました！",
        message: new Date()
      })
    );
});
