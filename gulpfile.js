(function() {
  'use strict';

  /* Required packages */
  var gulp         = require('gulp');
  var glob         = require('glob');
  var browserSync  = require('browser-sync');
  var reload       = browserSync.reload;
  var sass         = require('gulp-sass');
  var $            = require('gulp-load-plugins')();
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  /**
   * Error notification settings
   */
  function errorAlert(err) {
    $.notify.onError({
      message:  '<%= error.message %>',
      sound:    'Sosumi'
    })(err);
  }

  /* Environment variables */
  var _src_dir  = '';
  var _scss_dir = _src_dir + 'sass/';
  var _css_dir  = _src_dir + 'css/'

  gulp.task('sass', function() {
    var _postcss = [
                     autoprefixer({
                       browsers: ['last 3 versions'],
                       cascade: false
                     })
                   ];

    gulp.src(_scss_dir + '*.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe( postcss(_postcss) )
      .pipe(gulp.dest(_css_dir))
      .pipe(reload({stream: true}))
      .on( 'error', errorAlert )
      .pipe(
        $.notify({
          message: 'Styles have been compiled and minified',
          onLast:   true
        })
      );
  });

  gulp.task('watch', ['sass'], function() {
    browserSync({
      server: './',
      port: '4883'
    });
    gulp.watch(_scss_dir + '**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', reload);
  });
}());