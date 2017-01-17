var gulp = require('gulp'), 
babel = require('gulp-babel'), // React JSX
sass = require('gulp-sass'),
browserSync = require('browser-sync'), 
del = require('del'), 
autoprefixer = require('gulp-autoprefixer'); // css prefixes


// DEFAULT
gulp.task('default', () =>
    console.log('\n     There is no default task.\n     Use "gulp watch" or "gulp build".\n')
    );

// WATCH

gulp.task('watch', ['cleanWatch', 'jsx', 'js', 'jslibs', 'sass', 'browser-sync'], function() {
    gulp.watch('src/js_src/**/*.jsx', ['jsx']); 
    gulp.watch('src/js_src/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);

});

gulp.task('cleanWatch', () =>
    del.sync(['src/css', 'src/js'])
    );

gulp.task('jsx', () =>
    gulp.src('src/js_src/**/*.jsx')
    .pipe(babel({
        presets: ['react']
    }))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true})) 
    );

gulp.task('js', () =>
    gulp.src('src/js_src/**/*.js')
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true})) 
    );

gulp.task('jslibs', () =>
    gulp.src([
        'src/libs/react/react.min.js',
        'src/libs/react/react-dom.min.js',
        'src/libs/eventEmitter/EventEmitter.min.js'
        ])
    .pipe(gulp.dest('src/js'))
    );

gulp.task('sass', () =>  
    gulp.src('src/sass/**/*.sass') 
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
    );

gulp.task('browser-sync', () =>
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
    );

// BUILD does not depend on WATCH anyhow.
// So it duplicates a lot of code.
// And I did it on purpose.
// In fact it means cleaner build.
gulp.task('build', 
    ['build_clean', 'build_jsx', 'build_js', 
    'build_jslibs', 'build_sass', 'build_others'], () =>
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    })
    );

gulp.task('build_clean', () =>
    del.sync('build')
    );

gulp.task('build_jsx', () =>
    gulp.src('src/js_src/**/*.jsx')
    .pipe(babel({
        presets: ['react']
    }))
    .pipe(gulp.dest('build/js'))
);

gulp.task('build_js', () =>
    gulp.src('src/js_src/**/*.js')
    .pipe(gulp.dest('build/js')) 
);

gulp.task('build_jslibs', () =>
    gulp.src([
        'src/libs/react/react.min.js',
        'src/libs/react/react-dom.min.js',
        'src/libs/eventEmitter/EventEmitter.min.js'
        ])
    .pipe(gulp.dest('build/js'))
    );

gulp.task('build_sass', () =>  
    gulp.src('src/sass/**/*.sass') 
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('build/css'))
    );

gulp.task('build_others', () =>
    buildOthers = gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('build'))
    );
