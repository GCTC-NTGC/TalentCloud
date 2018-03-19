// gulpfile.js handles all Gulp front-end tasks.

// Require the Gulp Package Manager
var gulp = require('gulp');
// Require Gulp SASS (Pre-Processor, Handles SASS)
var sass = require('gulp-sass');
// Require Gulp PostCSS (Post-Processor, Handles Autoprefixer and CSSnano)
var postcss = require('gulp-postcss');
// Require Autoprefixer (Adds Browser Prefixes)
var autoprefixer = require('autoprefixer');
// Require CSSnano (Compresses and Optimizes CSS)
var cssnano = require('cssnano');

// This task runs SASS on our SCSS files and compiles them into CSS.
gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sass())
    // This is the output folder for this task.
    .pipe(gulp.dest('css/compiled'))
});

// This task runs both Autoprefixer and CSSnano on our compiled CSS.
gulp.task('optimize', function () {
    var plugins = [
        autoprefixer({browsers: ['last 2 version']}),
        cssnano()
    ];
    return gulp.src('css/compiled/*.css')
        .pipe(postcss(plugins))
        // This is the output folder for this task.
        .pipe(gulp.dest('css/optimized/'));
});

// This task watches both the SCSS and Compiled folders and then runs the above tasks as appropriate. This task allows you to run "Gulp" once in your terminal and forget about it.
gulp.task('default',function() {
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('css/compiled/*.css',['optimize']);
});
