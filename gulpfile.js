var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var rename = require("gulp-rename");

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
 
gulp.task('less', function () {
     
	    gulp.src('assets/less/config.less')
	    	.pipe(less({
	            plugins: [autoprefix]
	        }).on('error', function(err){

	        	console.log('8================D Erreur de compilation.')
        		this.emit('end');
    		}))
			.pipe(rename('styles.css'))
			.pipe(gulp.dest('assets/css/'));
			//.pipe(csslint())
    		//.pipe(csslint.reporter());
});

gulp.task('watch', function() {
    gulp.watch('assets/less/**/*.less', ['less']);
});
