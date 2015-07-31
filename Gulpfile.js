var gulp 		= require('gulp'),
	uglify  	= require('gulp-uglify'),
	changed 	= require('gulp-changed'),
	imagemin 	= require('gulp-imagemin'),
	stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
	minifyHTML  = require('gulp-minify-html'),
	browserify  = require('gulp-browserify'),
	rename       = require('gulp-rename');

 gulp.task('js', function () {
    gulp.src('./js/app.min.js')
        .pipe(stripDebug())
	.pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js'));   
    });


gulp.task('css',function(){
	gulp.src('./css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/css'));
 	gulp.src('./font-awesome-4.4.0/**/*.*')
    .pipe(gulp.dest('./public/font-awesome-4.4.0'));
});

gulp.task('images',function(){
    var imgSrc = './images/**/*',
        imgDst = './public/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
    gulp.src('./css/search-white.png')
        .pipe(gulp.dest('./public/css'));
});


gulp.task('html',function(){
    var htmlSrc = './index.html',
        htmlDst = './public';

    gulp.src(htmlSrc)
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

gulp.task('fonts',function(){
    gulp.src('./fonts/**')
        .pipe(gulp.dest('./public/fonts'));
});



gulp.task('default', ['js','css','images','html','fonts',]);










