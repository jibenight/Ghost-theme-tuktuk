const { src, dest, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Minifier pour CSS
function minifyCss() {
  return src('assets/css/output.css')
    .pipe(postcss([cssnano()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('assets/built/css/'));
}

// Minifier pour JS
function minifyJs() {
  return src(['assets/js/*.js', 'assets/js/lib/*.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('assets/built/js/'));
}

// Copier les polices vers le dossier build
function copyFonts() {
  return src('assets/fonts/**').pipe(dest('assets/built/fonts/'));
}

// Exporter la tâche par défaut
exports.build = series(minifyCss, minifyJs, copyFonts);
