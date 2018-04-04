var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//defining gulp watch tasks
gulp.task('watch', function(){
	//initialize browsersync server
	browserSync.init({
		//makes browsersync notifications dissappear
		//notify: false,
		server:{
			baseDir:"loan_calculator"
		}
	});

	//reload browser on changes
	watch('./loan_calculator/index.html', function(){
		browserSync.reload();
	});
	
	watch('./loan_calculator/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
		//browserSync.reload();
	});

	watch('./loan_calculator/assets/scripts/**/*.js', function(){
		//gulp.start('scriptsRefresh');
		browserSync.reload();
	});
});

//new task for browsersync inject css - with styles task dependency
gulp.task('cssInject',['styles'], function(){
	gulp.src('./loan_calculator/temp/styles/styles.css')
	.pipe(browserSync.stream());
});

/*//new task for browsersync to refresh after webpack repacks JS
gulp.task('scriptsRefresh', ['scripts'], function(){
	browserSync.reload();
})*/