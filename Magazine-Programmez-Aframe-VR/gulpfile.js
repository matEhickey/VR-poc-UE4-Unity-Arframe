var gulp = require("gulp");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();

// Developement route, use the dev/index.html as site index
// open the site in webbrowser, and reload each time there is a modification in a watched file
gulp.task("default", function () {
  browserSync.init({
    server: {
      baseDir:".",
      index: "./dev/index.html"
    }
  });

  gulp.watch(["dev/index.html", "js/*/*.js", "scenes/*.html", "objects/*"], ["serve"]);

  gulp.start("serve") ;

});

// Build final app with browserify, and open the webserver (remain to extract index.html and lib/bundle.js in a separate build folder)
gulp.task('build', function() {
  return Promise.all([
    new Promise(function(resolve, reject) {
      gulp.src([__dirname + '/js/index.js'])
       .pipe(browserify())
       .pipe(rename('bundle.js'))
       .pipe(gulp.dest(__dirname + '/js/libs'))
       .on('end', resolve);
    }),
  ]).then(function () {

      browserSync.init({
        server: {
          baseDir:".",
        }
      });

  });
});

gulp.task('serve', function() {
  browserSync.reload();
});
