/**
 * Created by hansell.ramos on 30/11/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default',['sass']);

gulp.task('sass',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/'))
});

gulp.task('watch',function(){
    gulp.watch('src/sass/*.scss',['sass']);
});