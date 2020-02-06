var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var sass = require('gulp-sass');
var gulpSort = require('gulp-sort');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var del = require('del');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
//var spritesmith = require('gulp.spritesmith-multi');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var autoprefixer = require('gulp-autoprefixer');
const compileHandlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

const paths = {
  src: 'src/',
  dist: 'dist/',
  scss_src: 'src/assets/scss/',
  css_src: 'src/css/',
  css_dist: 'dist/assets/css',
  img_src: 'src/assets/images/',
  img_dist: 'dist/assets/images',
  svg_src: 'src/svg/',
  sprite_png_src: 'src/assets/sprites/png',
  sprite_svg_src: 'src/assets/sprites/svg',
  js_src: 'src/assets/js/',
  js_dist: 'dist/assets/js/',
  html_src: 'src/markup/',
  include_src: 'src/include',
  gulpconfig: 'gulpConfig'
};

// gulp task 환경 설정
const config = {
  sprite: {
    png: true, // png sprite 생성 (default: true)
    svg: true // svg sprite 생성 (default: true)
  },
  md5: true // md5 실행 여부 (default: true)
};

// Development Tasks 
// -----------------

// Sass
gulp.task('sass', function () {
  const options = {
    sass: {
      outputStyle: 'expanded',
      indentType: 'tab',
      indentWidth: 1
    },
    postcss: [autoprefixer({
      browsers: autoprefixerOptions,
      grid: true
    })]
  };

  return gulp.src(path.join(paths.scss_src, '/**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css_dist))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// browser-sync
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: paths.dist,
      directory: true
    }
  });
  gulp.watch([path.join(paths.dist, '/**/*.html')]).on("change", reload);
});

// Watchers
gulp.task('watch', function () {
  gulp.watch(path.join(paths.scss_src, '/**/*'), ['sass', reload]);
  gulp.watch(path.join(paths.js_src, '/**/*'), ['concat:js', reload]);
  gulp.watch(path.join(paths.include_src, '/**/*'), ['fileinclude', reload]);
  gulp.watch(path.join(paths.html_src, '/**/*'), ['fileinclude', reload]);
  gulp.watch(path.join(paths.html_src, 'index.html'), ['fileinclude', reload]);
  gulp.watch(path.join(paths.sprite_png_src, '/**/*'), ['auto-sprite', 'images', reload]);
  gulp.watch(path.join(paths.img_src, '/**/*'), ['images', reload]);
})


// get children folder
function getFolders(dir) {
  let result = [];
  if (fs.statSync(dir).isDirectory()) {
    result = fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
  }
  return result;
}

gulp.task('auto-sprite', (cb) => {
  return config.sprite.png ? runSequence('makeSprite', 'makeSpriteMaps', cb) : cb();
});

// sprite image 생성 (png)
gulp.task('makeSprite', () => {
  const folders = getFolders(paths.sprite_png_src);
  let options = {
    spritesmith: (options) => {
      const {
        folder,
        paths
      } = options;

      return {
        imgPath: path.posix.relative('./dist/assets/css/', path.posix.join('./dist/assets/images/', 'sp_' + folder + '.png')),
        imgName: 'sp_' + folder + '.png',
        cssName: path.posix.relative(paths.img_src, path.posix.join(paths.scss_src, 'sprites', '_' + folder + '.scss')),
        cssFormat: 'scss',
        padding: 4,
        cssTemplate: path.join(paths.gulpconfig, 'sprite_template.hbs'),
        cssSpritesheetName: folder,
        algorithm: 'binary-tree'
      }
    },
  };

  return folders.map((folder) => {
    return new Promise((resolve) => {
      gulp.src(path.join(paths.sprite_png_src, folder, '*@2x.png'))
        .pipe(gulpSort())
        .pipe(spritesmith(options.spritesmith({
          folder,
          paths
        })))
        .pipe(gulp.dest(paths.img_src))
        .on('end', resolve);
    });
  });
});

gulp.task('makeSpriteMaps', () => {
  const folders = getFolders(paths.sprite_png_src);
  var options = {
    maps: {
      handlebars: {
        path: path.join('.', path.posix.relative(path.join(paths.scss_src, 'sprites'), path.join(paths.scss_src, 'sprites'))),
        import: folders,
      }
    },
  };

  return new Promise(function (resolve) {
    gulp.src(path.join(paths.gulpconfig, 'sprite_maps_template.hbs'))
      .pipe(compileHandlebars(options.maps.handlebars))
      .pipe(rename('_sprite_maps.scss'))
      .pipe(gulp.dest(path.join(paths.scss_src, 'sprites')))
      .on('end', resolve);
  });
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {
  return gulp.src(path.join(paths.dist, '/**/*'))
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function () {
  return gulp.src(path.join(paths.img_src, '**/*.+(png|jpg|jpeg|gif|svg)'))
    .pipe(newer(paths.img_dist))
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/assets/images'))
});

// Copying fonts 
gulp.task('fonts', function () {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
})

// Cleaning 
gulp.task('clean', function () {
  return del.sync(paths.dist).then(function (cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function () {
  return del.sync(paths.dist);
});

gulp.task('fileinclude', function () {
  gulp.src([path.join(paths.html_src, '/**/*.html')], {
      base: './src/markup/'
    })
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('concat:js', function () {
  return gulp // js 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다. 
    .src([path.join(paths.js_src, '/**/*.js')]) // 상단에서 참조한 concat 모듈을 호출하고 병합할 파일네이밍을 정의 
    //.pipe( concat('applications.js') ) // 위에서 수행한 task 를 배포지(dist)에 파일을 생성한다. 
    .pipe(gulp.dest(paths.js_dist));
});

// Build Sequences
// ---------------
gulp.task('default', function (callback) {
  runSequence('clean:dist', 'useref', 'fonts', 'concat:js', 'auto-sprite', 'images', 'sass', 'fileinclude', 'watch', 'browser-sync',
    callback
  )
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'useref', 'fonts', 'concat:js', 'auto-sprite', 'images', 'sass', 'fileinclude',
    callback
  )
});