const pug = require('pug');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fs = require('fs');
const beautify = require('gulp-beautify');

const compile = function(){
    const template = pug.renderFile("./build/pug/index.pug")
    // console.log(template)
    fs.writeFileSync('./index.html', template)
}

function buildStyles() {
    return gulp.src('./build/scss/**/styles.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('./static'));
  };

async function defaultTask() {
    await buildStyles()
    await compile()
}

gulp.task('beautify-html', function() {
    return gulp
      .src('./index.html')
      .pipe(beautify.html({ indent_size: 2 }))
      .pipe(gulp.dest('./'));
  });

gulp.task('compile', async ()=>{
    await buildStyles()
    await compile()
})

gulp.task('watch', function() {
    // livereload.listen({start:true});
    gulp.watch('build/**/*.*', gulp.series("compile","beautify-html"));
});