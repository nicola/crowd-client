var gulp = require('./tasks')([
  'browserify',
  'clean'
]);
 
gulp.task('build', ['clean', 'browserify']);
gulp.task('default', ['build']);

