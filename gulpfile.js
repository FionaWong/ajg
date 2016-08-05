/**
 * Created by malanling on 16/8/4.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
  gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/styles/'))
});

gulp.task('default',function(){
  gulp.watch('src/styles/*.scss',['sass']);
});
