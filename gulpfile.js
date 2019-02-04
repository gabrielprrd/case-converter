const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
 const fs = require('fs')


function css(done) {
  gulp.src('src/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
  done();
}

function js(done) {
    return browserify({
      entries: ['src/app.js']
    })
    .transform(babelify, {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(fs.createWriteStream('dist/app.js'));
  done();
}

gulp.task('css', css);
gulp.task('js', js);
gulp.task('default', gulp.parallel(css, js));