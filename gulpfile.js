/**
 * Created by hansell.ramos on 30/11/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default',['hello','world']);

gulp.task('hello', function(cb){
    setTimeout(function(){
        console.log("Hello");
        cb();
    },2000)
});

gulp.task('world', ['hello'], function(){
    console.log("world")
});

gulp.task('sass',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/'))
});