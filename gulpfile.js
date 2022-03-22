import fs from "fs"
import gulp from "gulp"
import autoprefixer from "gulp-autoprefixer"
import header from "gulp-header"
import gulpSass from "gulp-sass"
import dartSass from "sass"
import rename from "gulp-rename"
import sourcemaps from "gulp-sourcemaps"

const sass = gulpSass(dartSass)
const pkg = JSON.parse(fs.readFileSync("./package.json").toString())
const banner = `
/*!
 * ${pkg.name}.css v${pkg.version} (${pkg.homepage})
 * Copyright 2022-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim()

function css() {
    return gulp.src("./src/browser/sass/index.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(header(banner))
        .pipe(autoprefixer())
        .pipe(rename("index.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./public/css"))
}

function virtualScrollCss() {
    return gulp.src("./src/browser/sass/virtualScroll.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(header(banner))
        .pipe(autoprefixer())
        .pipe(rename("virtualScroll.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./public/css"))
}

export default gulp.parallel(css, virtualScrollCss)
