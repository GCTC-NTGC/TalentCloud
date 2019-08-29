// gulpfile.js handles all Gulp front-end tasks.

// Require the Gulp Package Manager
const gulp = require("gulp");
// Require Gulp SASS (Pre-Processor, Handles SASS)
const sass = require("gulp-sass");
// Require Gulp PostCSS (Post-Processor, Handles Autoprefixer and CSSnano)
const postcss = require("gulp-postcss");
// Require Autoprefixer (Adds Browser Prefixes)
const autoprefixer = require("autoprefixer");
// Require CSSnano (Compresses and Optimizes CSS)
const cssnano = require("cssnano");
// Require Gulp Notify (Notifies Us About Tasks & Errors)
const notify = require("gulp-notify");
// Creates a Node Notifier Constant for Error Notifications
const notifier = require("node-notifier");

// This handles Gulp errors and allows us to maintain our watch function.
function swallowError(error) {
  // Gets the error copy.
  const errorCopy = error.toString();
  // Spits out the Error Notification.
  notifier.notify({
    title: "Uh oh, something went wrong! 💀",
    message: "Check your console for more information on the error!",
    icon: "",
  });
  // Logs the error details to the console.
  console.log(errorCopy);
  // Stops the task and restarts Gulp.
  this.emit("end");
}

// This task runs SASS on our SCSS files and compiles them into CSS.
gulp.task("sass", function() {
  return (
    gulp
      .src("resources/assets/sass/*.scss")
      // Runs SASS.
      .pipe(sass({includePaths: ["node_modules/@fortawesome/fontawesome-free/scss"]}))
      // Checks for an error, and if it exists stops everything.
      .on("error", swallowError)
      // This is the output folder for this task.
      .pipe(gulp.dest("public/css"))
      // Notifies you that your code was successfully compiled.
      .pipe(
        notify({
          title: "You were successfully Sassy! 💁",
          message: "Your SASS has been compiled into CSS.",
          icon: "",
        }),
      )
  );
});

// This task runs both Autoprefixer and CSSnano on our compiled CSS.
gulp.task("optimize", function() {
  // Selects the Autoprefixer and CSSnano PostCSS plugins.
  const plugins = [autoprefixer({ browsers: ["last 2 version"] }), cssnano()];
  return (
    gulp
      .src("public/css/*.css")
      // Runs PostCSS and the plugins specified above.
      .pipe(postcss(plugins))
      // Checks for an error, and if it exists stops everything.
      .on("error", swallowError)
      // This is the output folder for this task.
      .pipe(gulp.dest("public/css"))
      // Notifies you that your code was successfully compiled.
      .pipe(
        notify({
          title: "Mmm, tasty optimization. 🍔",
          message: "Your CSS was successfully optimized.",
          icon: "",
        }),
      )
  );
});

// This task watches both the SCSS and Compiled folders and then runs the above tasks as appropriate. This task allows you to run "Gulp" once in your terminal and forget about it.
gulp.task("default", function() {
  gulp.watch("resources/assets/sass/**/*.scss", ["sass"]);
  // gulp.watch('css/compiled/*.css',['optimize']);
});
