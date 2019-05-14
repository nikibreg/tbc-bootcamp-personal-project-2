'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
 
sass.compiler = require('node-sass');

gulp.task('clean:css', () => {
  return del([
      'dist/css/*',
  ]);
});

gulp.task('clean:html', () => {
    return del([
        'dist/*.html',
    ]);
});

gulp.task('clean:images', () => {
    return del([
        'dist/images/*',
    ]);
});

gulp.task('sass', function () {
  return gulp.src('source/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function(){
    return gulp.src('source/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('watch', function() {
    gulp.watch('source/*.html', (done) => {
        gulp.series(['clean:html', 'html'])(done);
    });
    gulp.watch('source/styles/**/*.scss', (done) => {
        gulp.series(['clean:css', 'sass'])(done);
    });
    gulp.watch('source/images/**/*.*', (done) => {
        gulp.series(['clean:images', 'images'])(done);
    });
});

const init = [
    'clean:css',
    'sass',
    'clean:html',
    'html',
    'clean:images',
    'images'
];

gulp.task('default', gulp.series([...init,'watch']));