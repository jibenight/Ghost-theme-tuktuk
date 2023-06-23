const { src, dest, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const newer = require('gulp-newer');

const { exec } = require('child_process');
const browserSync = require('browser-sync').create();

// Minify CSS files using PostCSS and cssnano
function minifyCss() {
  return src('assets/css/output.css')
    .pipe(postcss([cssnano()])) // Optimize and minify CSS with cssnano
    .pipe(rename({ extname: '.min.css' })) // Rename output file with .min.css extension
    .pipe(dest('assets/built/css/')); // Save the minified file to destination directory
}

// Minify JS files using uglify
function minifyJs() {
  return src(['assets/js/*.js', 'assets/js/lib/*.js']) // Select all JS files in assets/js and assets/js/lib directories
    .pipe(concat('all.js')) // Concatenate all JS files into one file named all.js
    .pipe(uglify()) // Minify the JavaScript code
    .pipe(rename({ extname: '.min.js' })) // Rename the output file with .min.js extension
    .pipe(dest('assets/built/js/')); // Save the minified file to destination directory
}

// Copy fonts to the build directory only if they don't already exist
function copyFonts() {
  return src('assets/fonts/**') // Select all font files in assets/fonts directory
    .pipe(newer('assets/built/fonts/')) // Pass through newer files only
    .pipe(dest('assets/built/fonts/')); // Save the new or updated font files to the destination directory
}

// Task to run postcss command
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

// Task for live reloading using BrowserSync
function serve(cb) {
  browserSync.init({
    proxy: 'localhost:2368', // Setup a proxy server pointing to the local Ghost instance
  });

  // Watch for changes in CSS and hbs files for live reloading
  gulp.watch('assets/css/*.css', series(minifyCss, reload));
  gulp.watch('assets/css/*.css', series(runPostcss, minifyCss, reload));
  gulp.watch('**/*.hbs', series(minifyCss, minifyJs, reload));
}

// Task to reload the browser
function reload(cb) {
  browserSync.reload(); // Trigger a browser reload
  cb(); // Call the callback function to signal task completion
}

// Export the default task
exports.run = series(minifyCss, minifyJs, copyFonts, runPostcss, serve); // The default task sequence
