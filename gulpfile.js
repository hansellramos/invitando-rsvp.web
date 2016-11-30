/**
 * Created by hansell.ramos on 30/11/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default',['sass']);

gulp.task('sass',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/'))
        .pipe(reload({stream:true}))
});

gulp.task('watch',function(){
    gulp.watch('src/sass/*.scss',['sass']);
});

gulp.task('serve',['sass'],function(){
    browserSync({
        server: {
            baseDir: ['app']
        }
    });
    gulp.start('watch');
});