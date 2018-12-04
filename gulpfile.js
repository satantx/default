// init
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// event

gulp.task('server', ['sass', 'js'], function () {
   browserSync.init({
      server: {
         baseDir: './'
      }
   });

   gulp.watch('*.html').on('change', browserSync.reload);
   gulp.watch('src/scss/**/*.scss', ['sass']);
   gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

});

gulp.task('sass', function () {
   return gulp.src('./src/scss/*.scss')
      .pipe( plumber({
         errorHandler: notify.onError( function (err) {
            return {
               title: 'Ошибка в стилях',
               message: err.message
            }
         })
      }))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('js', function () {
   return gulp.src([
   	'./src/js/jquery-3.3.1.min.js',
   	'./src/js/imagesloaded.min.js',
   	'./src/js/owl.carousel.min.js',
   	'./src/js/jquery.fancybox.min.js',
   	'./src/js/*.js'
   	])
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./js'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['server']);