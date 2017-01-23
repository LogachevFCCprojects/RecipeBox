var gulp = require('gulp'), 
sass = require('gulp-sass');

// WATCH = DEFAULT TASK
gulp.task('default', ['sass'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
});

gulp.task('sass', () =>  
    gulp.src('src/sass/**/*.sass') 
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('src')) // I use webpack and don't give a fuck
);
