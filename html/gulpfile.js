"use strict";

/* подключаем gulp и плагины */
var gulp = require("gulp"), // подключаем Gulp
  plumber = require("gulp-plumber"), // модуль для отслеживания ошибок
  sourcemaps = require("gulp-sourcemaps"), // модуль для генерации карты исходных файлов
  sass = require("gulp-sass"), // модуль для компиляции SASS (SCSS) в CSS
  autoprefixer = require("gulp-autoprefixer"), // модуль для автоматической установки автопрефиксов
  cleanCSS = require("gulp-clean-css"), // плагин для минимизации CSS
  uglify = require("gulp-uglify"), // модуль для минимизации JavaScript
  cache = require("gulp-cache"), // модуль для кэширования
  imagemin = require("gulp-imagemin"), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
  jpegrecompress = require("imagemin-jpeg-recompress"), // плагин для сжатия jpeg
  pngquant = require("imagemin-pngquant"), // плагин для сжатия png
  rimraf = require("gulp-rimraf"), // плагин для удаления файлов и каталогов
  rename = require("gulp-rename"), // Подключаем библиотеку для переименования файлов
  concat = require("gulp-concat"), // Подключаем gulp-concat (для конкатенации файлов)
  fileinclude = require("gulp-file-include"),
  browserSync = require("browser-sync").create(); // Подключаем Browser Sync;

/* параметры для gulp-autoprefixer */
var autoprefixerList = [
  "Chrome >= 45",
  "Firefox ESR",
  "Edge >= 12",
  "Explorer >= 10",
  "iOS >= 9",
  "Safari >= 9",
  "Android >= 4.4",
  "Opera >= 30"
];

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
  nodeModules: "./node_modules/",
  plugins: "./app/plugins/",
  app: "./app/",
  dist: "./dist/",
  clean: "./dist/*",
  build: {
    html: "dist",
    js: "dist/js/",
    css: "dist/css/",
    img: "dist/images/",
    fonts: "dist/fonts/"
  },
  src: {
    html: "app/*.html",
    js: "app/js/*.js",
    style: "app/css/*.css",
    img: "app/images/**/*.*",
    fonts: "app/fonts/**/*.*"
  },
  watch: {
    html: "app/template/**/*.html",
    js: "app/js/**/*.js",
    css: "app/scss/**/*.scss",
    img: "app/images/**/*.*",
    fonts: "app/fonts/**/*.*"
  }
};

var configPath = {
  jsLibs: [
    path.nodeModules + "jquery/dist/jquery.js",
    path.nodeModules + "popper.js/dist/umd/popper.js",
    path.nodeModules + "bootstrap/dist/js/bootstrap.js",
    path.nodeModules + "slick-carousel/slick/slick.js",
    path.nodeModules + "swiper/js/swiper.js",
    path.nodeModules + "nouislider/distribute/nouislider.js",
    path.nodeModules + "moment/moment.js",
    path.nodeModules + "bootstrap-daterangepicker/daterangepicker.js",
    path.nodeModules + 'jquery.maskedinput/src/jquery.maskedinput.js',
    path.nodeModules + '@fancyapps/fancybox/dist/jquery.fancybox.js',
    path.plugins + "magiczoomplus/magiczoomplus.js"
  ],
  cssLibs: [
    path.nodeModules + "bootstrap/dist/css/bootstrap.css",
    path.nodeModules + "slick-carousel/slick/slick.css",
    path.nodeModules + "animate.css/animate.css",
    path.nodeModules + "swiper/css/swiper.css",
    path.nodeModules + "nouislider/distribute/nouislider.css",
    path.nodeModules + "bootstrap-daterangepicker/daterangepicker.css",
    path.nodeModules + "@fancyapps/fancybox/dist/jquery.fancybox.css",
    path.plugins + "magiczoomplus/magiczoomplus.css"
  ],
  fontLibs: [path.nodeModules + "@fortawesome/fontawesome-free/webfonts/*"]
};

/* задачи */

function libsJs() {
  return gulp
    .src(configPath.jsLibs) // Берем все необходимые библиотеки
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.toString());
          this.emit('end');
        }
      })
    ) // для отслеживания ошибок
    .pipe(concat("libs.min.js")) // Собираем их в кучу в новом файле libs.min.js
    .pipe(uglify()) // Сжимаем JS файл
    .pipe(gulp.dest(path.app + "js")); // Выгружаем в папку app/js
}

function libsCss() {
  return gulp
    .src(configPath.cssLibs)
    .pipe(concat("libs.css"))
    .pipe(cleanCSS()) // минимизируем CSS
    .pipe(rename({ suffix: ".min" })) // Добавляем суффикс .min
    .pipe(gulp.dest(path.app + "css"));
}

function includeHtml() {
  return gulp
    .src([path.app + "template/views/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(plumber()) // отслеживание ошибок
    .pipe(gulp.dest(path.app))
    .pipe(browserSync.stream());
}

// сбор стилей
function scss() {
  return gulp
    .src(path.app + "scss/*.scss") // Берем источник
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.toString());
          this.emit('end');
        }
      })
    ) // для отслеживания ошибок
    .pipe(sourcemaps.init()) // инициализируем sourcemap
    .pipe(sass()) // scss -> css
    .pipe(
      autoprefixer({
        // добавим префиксы
        overrideBrowserslist: autoprefixerList
      })
    )
    .pipe(gulp.dest("./app/css/"))
    .pipe(browserSync.stream());
}

// сбор html
function html() {
  return gulp
    .src(path.src.html) // выбор всех html файлов по указанному пути
    .pipe(gulp.dest(path.dist)); // выкладывание готовых файлов
}

// сбор стилей
function css() {
  return gulp
    .src(path.src.style)
    .pipe(sourcemaps.write("./")) // записываем sourcemap
    .pipe(gulp.dest(path.build.css)); // выгружаем в dist
}

// сбор js
function js() {
  return gulp.src(path.src.js).pipe(gulp.dest(path.build.js)); // выгружаем в dist
}

// перенос шрифтов
function fonts() {
  return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
}

// обработка картинок
function images() {
  return gulp
    .src(path.src.img) // путь с исходниками картинок
    .pipe(
      imagemin([
        // сжатие изображений
        imagemin.gifsicle({ interlaced: true }),
        /* jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),*/
        pngquant(),
        imagemin.svgo({ plugins: [{ removeViewBox: false }] })
      ])
    )
    .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
}

function clean() {
  return gulp.src(path.clean, { read: false }).pipe(rimraf());
}

function cacheClear() {
  return cache.clearAll();
}

exports.includeHtml = includeHtml;
exports.scss = scss;

function watch() {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false
  });
  gulp.watch(path.app + "scss/**/*.scss", scss); // Наблюдение за scss файлами в папке scss
  gulp.watch(path.app + "template/**/*.html", includeHtml); // Наблюдение за HTML файлами в корне проекта
  gulp.watch(path.app + "*.html").on("change", browserSync.reload);
  gulp.watch(path.app + "js/*.js").on("change", browserSync.reload);
}

exports.clean = clean;
exports.cacheClear = cacheClear;

exports.libsJs = libsJs;
exports.libsCss = libsCss;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;

exports.watch = watch;

var build = gulp.series(
  clean,
  scss,
  includeHtml,
  gulp.parallel(libsJs, libsCss, html, css, js, images, fonts)
);
// задача по умолчанию
gulp.task("build", build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task("default", gulp.series(build, watch));
