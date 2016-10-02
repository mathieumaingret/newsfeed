var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');  

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
 
gulp.task('less', function () {
     
	    gulp.src('assets/less/config.less')
	    	.pipe(less({
	            plugins: [autoprefix]
	        }).on('error', function(error){
	        	console.log('8================D Erreur de compilation.');
	        	console.log('Fichier : ' + error.fileName.substring(error.fileName.lastIndexOf('/')+1) + ' // Ligne : ' + error.lineNumber + ' // Colonne : ' + error.column);
        		this.emit('end');
    		}))
			.pipe(rename('styles.css'))
			.pipe(cleanCSS({}))
			.pipe(gulp.dest('assets/css/'));
});

gulp.task('watch', function() {
    gulp.watch('assets/less/**/*.less', ['less']);
});
