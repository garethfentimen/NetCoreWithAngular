var gulp = require('gulp'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint');

// I realise that this is now old fashioned, jspm or webpack and babel for ES2015+ would be better
// But done in the interest of speed 
gulp.task('default', ['dep','app','css']);

gulp.task('app', ['lint'], function () {
    return gulp.src(['app/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('wwwroot/js'));
});

gulp.task('lint', function () {
    return gulp.src(['js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('dep', function() {
    return gulp.src(['node_modules/angular/angular.js',
        'node_modules/angular-date-picker/angular-date-picker.js'])
        .pipe(concat('dep.js'))
        .pipe(gulp.dest('wwwroot/js'));
});

gulp.task("css", function () {
    return gulp.src(['node_modules/bootstrap-css/lib/*.css',
        'node_modules/angular-date-picker/angular-date-picker.css'])
        .pipe(concat("all.css"))
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('watch', function() {
  var watcher = gulp.watch('app/*.js', ['app']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});