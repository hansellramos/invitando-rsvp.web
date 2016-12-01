/**
 * Created by hansell.ramos on 30/11/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('default',['sass']);

gulp.task('sass',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/'))
        .pipe(reload({stream:true}))
});

gulp.task('sass:prod',function(){
    return gulp.src('src/sass/app.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest('app/dist/'))
});

gulp.task('js:prod',function(){
    return gulp.src('app/*.js')
        .pipe(plumber())
        .pipe(uglify({compress:true}))
        .pipe(gulp.dest('app/dist'))
});

gulp.task('css:prod',function(){
    return gulp.src('app/*.css')
        .pipe(plumber())
        .pipe(uglify({compress:true}))
        .pipe(gulp.dest('app/dist'))
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

gulp.task('build', ['sass:prod', 'js:prod']);