var browserify = require('browserify')
var source = require('vinyl-source-stream')
var gulp = require('gulp')
 
module.exports = function() {

  return browserify('./index.js', {standalone: "CrowdClient"})
    .bundle()
    .pipe(source('crowd-client.js'))
    .pipe(gulp.dest('./dist/'))

}