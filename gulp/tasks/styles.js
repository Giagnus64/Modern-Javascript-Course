//gulp variables required for css
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');


//task to pipe css through processor packages
gulp.task('styles', function(){
	return gulp.src('./loan_calculator/assets/styles/styles.css')
	.pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
	//error checking
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./loan_calculator/temp/styles'));

});