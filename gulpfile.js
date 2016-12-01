/**
 * Created by hansell.ramos on 30/11/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default',['sass']);

gulp.task('sass',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/'))
        .pipe(reload({stream:true}))
});

gulp.task('sass:prod',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(sass({ outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest('app/dist/'))
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

gulp.task('build', ['sass:prod']);