var gulp = require('gulp')
var sass = require('gulp-sass')
// var browserSync = require('browser-sync').create()
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
// var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var msgSass = 'Gulp is compiling Sass. _φ(･_･'
var msgScript = 'Minifing JS'
// var msgError = 'Ouch! Gulp caught error! (╯°□°）╯︵ ┻━┻'

var webappDir = 'app-web/src/main/webapp/resources'
var styleDir = '/css'
var jsDir = '/js'
gulp.task('sass', function () {
  return gulp.src('front-end-src/scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return error.message
      })
    }))
    .pipe(sass({
      // outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(notify(msgSass))
    .pipe(gulp.dest(webappDir + styleDir))
    // .pipe(browserSync.stream())
})

gulp.task('script', function () {
  return gulp.src('front-end-src/js/*.js')
      // .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(notify({
      message: msgScript,
      onLast: true
    }))
    .pipe(gulp.dest(webappDir + jsDir))
})

gulp.task('js-watch', ['script'], function (done) {
  // browserSync.reload();
  // done();
})

gulp.task('watch', function () {
  // browserSync.init({
  //   server: true,
  //   browser: 'Google Chrome'
  // })

  gulp.watch(['front-end-src/scss/*.scss', 'front-end-src/scss/modules/*.scss'], ['sass'])
  gulp.watch(['front-end-src/js/*.js'], ['js-watch'])
  // gulp.watch([webappDir + '/*.jsp']).on('change', browserSync.reload)
})
gulp.task('default', ['watch'])
