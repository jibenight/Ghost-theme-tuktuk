const { src, dest, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const newer = require('gulp-newer');

const { exec } = require('child_process');
const browserSync = require('browser-sync').create();

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

// Copier les polices vers le dossier build uniquement si elles ne sont pas déjà présentes
function copyFonts() {
  return src('assets/fonts/**')
    .pipe(newer('assets/built/fonts/'))
    .pipe(dest('assets/built/fonts/'));
}

// Tâche pour exécuter la commande postcss
function runPostcss(cb) {
  exec(
    'TAILWIND_MODE=watch postcss assets/css/styles.css -o assets/css/output.css --config tailwind.config.dev.js --watch',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
}

// Tâche pour le live reload
function serve(cb) {
  browserSync.init({
    proxy: 'localhost:2368',
  });

  // Ajoutez ici les fichiers à surveiller pour le rechargement
  gulp.watch('assets/css/*.css', series(minifyCss, reload));
  gulp.watch('assets/css/*.css', series(runPostcss, minifyCss, reload));
  gulp.watch('**/*.hbs', series(minifyCss, minifyJs, reload));
}

// Tâche pour recharger le navigateur
function reload(cb) {
  browserSync.reload();
  cb();
}

// Exporter la tâche par défaut
exports.run = series(minifyCss, minifyJs, copyFonts, runPostcss, serve);
