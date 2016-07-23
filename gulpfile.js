var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var copy = require("gulp-contrib-copy");
var clean = require('gulp-contrib-clean');
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso")
var server = require("browser-sync");
var rename = require("gulp-rename");
var spritesmith = require("gulp.spritesmith");

gulp.task("style", function(){
  gulp.src("less/style.less")
  
  .pipe(plumber())
  
  .pipe(less())
  
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 3 version",
      "last 3 Chrome versions",
      "last 3 Firefox versions",
      "last 3 Opera versions",
      "last 2 Edge versions",
      "ie >= 8"
    ]})
    
    
  ]))
  
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.reload({stream: true}));
  
  gulp.src("less/ie/style_ie.less")
  .pipe(plumber())
  
  .pipe(less())
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style_ie.min.css"))
  .pipe(gulp.dest("build/css"))
});

gulp.task("minjs", function(){
  gulp.src("js/*.js")
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("main.min.js"))
  .pipe(gulp.dest("build/js/"))
  
});

gulp.task("image", function(){
  return gulp.src("img/**/*.{png,jpg,gif}")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true 
  }))
  .pipe(gulp.dest("build/img"))
});

gulp.task("clean", function () {
  return gulp.src("build", {read: false})
    .pipe(clean());
});

gulp.task("index-sprite", function(){
  var spriteData = gulp.src('img/index-icons/*.png').pipe(spritesmith({
    imgName: 'index-sprite.png',
    cssName: 'index-sprite.less'
  }));
    spriteData.img.pipe(gulp.dest('img')); 
    spriteData.css.pipe(gulp.dest('less/sprites')); 
});

gulp.task("copyHtml", function() {
  gulp.src("*.html")
  .pipe(copy())
  .pipe(gulp.dest("build"))
  gulp.src("*.ico")
  .pipe(copy())
  .pipe(gulp.dest("build"))
});

gulp.task("copyJslib", function() {
  gulp.src("js/vendor/*.js")
  .pipe(copy())
  .pipe(gulp.dest("build/js/vendor"))
});

gulp.task("show", function(){
  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });
  
  gulp.watch("less/**/*.less", ["style"]).on("change", server.reload);
  gulp.watch("*.html", ["copyHtml"]).on("change", server.reload);
  gulp.watch("js/*.js", ["minjs"]).on("change", server.reload);
  gulp.watch("img/*", ["image"]).on("change", server.reload);
});

gulp.task("build", ["clean", "copyHtml", "copyJslib","style", "minjs", "image"]);
