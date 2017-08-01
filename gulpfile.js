var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')
// var uglify = require('gulp-uglify')
// var rename = require('gulp-rename')
var shell = require('gulp-shell')
var msgSass = 'Gulp is compiling Sass. _φ(･_･'
var msgScript = 'Minifing JS'
var msgError = 'Ouch! Gulp caught error! (╯°□°）╯︵ ┻━┻'
var msgStyleGuide = 'New style guide complete'

var styleDir = 'css'
// var jsDir = 'js'
gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return error.message
      })
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(notify(msgSass))
    .pipe(gulp.dest(styleDir))
    .pipe(browserSync.stream())
})

// gulp.task('script', function () {
//   return gulp.src('/js/*.js')
//     .pipe(uglify())
//     .pipe(notify({
//       message: msgScript,
//       onLast: true
//     }))
//     .pipe(gulp.dest(jsDir))
// })

// run 'sg-reload' after styleguide task is finished
gulp.task('sg-reload', ['styleguide'] ,function(){
  browserSync.reload()
})

gulp.task('styleguide', shell.task([
  'yarn run kss -- -c kss-config.json'
]))


gulp.task('watch', function () {
  browserSync.init({
    server: true,
    browser: 'Google Chrome Canary'
  })

  gulp.watch(['scss/*.scss', 'scss/*/*.scss'], ['sass', 'styleguide'])
  // gulp.watch(['/js/*.js'], ['js-watch'])
  gulp.watch(['handelbars/*.hbs'], ['sg-reload'])

  gulp.watch(['*.html']).on('change', browserSync.reload)
})

gulp.task('default', ['watch'])
