// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var del = require('del'),
	rename = require('gulp-rename'),
   uglify = require('gulp-uglify'),
   plumber = require('gulp-plumber'),
   browserify = require('browserify'),
   babelify = require('babelify'),
   source = require('vinyl-source-stream'),
   buffer = require('vinyl-buffer'),
	fileinclude = require('gulp-file-include'),
	compass = require('gulp-compass'),

   historyApiFallback = require('connect-history-api-fallback'),
   browserSync = require('browser-sync').create();

// HTML Task
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'src/parts/'
	 	}))
		// Move to dist
		.pipe(gulp.dest('dist/'))
		// Updates local server
		.pipe(browserSync.stream());
});

gulp.task('scss', function() {
    return gulp.src('src/scss/compile/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
		  .pipe(compass({
				'sass': 'src/scss/compile',
				'css': 'dist/css',
				'images': 'dist/images',
				'style': 'expanded'
			}))
		  .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'))
		  .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return browserify('src/js/App.js')
        .transform(babelify, {
            presets: ["es2015", "react"]
        })
        .bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.min.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'))
		  .pipe(browserSync.stream());
});

gulp.task('json', function(cb) {
    return gulp.src('src/data/**/*.json')
        .pipe(gulp.dest('dist/data'))
		  .pipe(browserSync.stream());
});

gulp.task('includes', function() {
    return gulp.src('src/includes/**/*')
        .pipe(gulp.dest('dist/'))
		  .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
	 gulp.watch('src/**/*.json', ['html']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/includes/**/*', ['includes']);
});

// BROWSER SYNC
gulp.task('sync', function() {
    return browserSync.init({
        server: {
            baseDir: "dist/",
            middleware: [historyApiFallback()]
        }
    });
});

gulp.task('clean', function(cb){
	del.sync(['./dist/**/*']);
	cb(null);
})

// Default Task
gulp.task('default', ['clean', 'sync', 'build'], function(){
	browserSync.reload();
});

gulp.task('build', ['html', 'scss', 'js', 'includes', 'watch']);
