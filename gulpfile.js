import fs from "fs"
import gulp from "gulp"
import autoprefixer from "gulp-autoprefixer"
import header from "gulp-header"
import gulpSass from "gulp-sass"
import dartSass from "sass"
import rename from "gulp-rename"
import sourcemaps from "gulp-sourcemaps"

const pkg = JSON.parse(fs.readFileSync("./package.json").toString())
const { src, dest } = gulp
const banner = `
/*!
 * ${pkg.name} ${pkg.version} (${pkg.homepage})
 * Copyright 2022-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim()
const sass = gulpSass(dartSass)

function css() {
    return src("./src/sass/index.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(header(banner))
        .pipe(autoprefixer())
        .pipe(rename("index.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("./public/css"))
}

export default css
