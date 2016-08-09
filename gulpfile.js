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
var concat = require("gulp-concat");
var critical = require("critical");

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
  
  gulp.src("js/main.js")
  
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("main.min.js"))
  .pipe(gulp.dest("build/js/"))
  gulp.src("js/portfolio.js")
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("portfolio.min.js"))
  .pipe(gulp.dest("build/js/"))
  gulp.src("js/index.js")
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("index.min.js"))
  .pipe(gulp.dest("build/js/"))
  gulp.src("js/contacts.js")
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("contacts.min.js"))
  .pipe(gulp.dest("build/js/"))
  gulp.src("js/reviews.js")
  .pipe(gulp.dest("build/js/"))
  .pipe(uglify())
  .pipe(rename("reviews.min.js"))
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

gulp.task("common-sprite", function(){
  var spriteData = gulp.src('img/common-icons/*.png').pipe(spritesmith({
    imgName: 'common-sprite.png',
    cssName: 'common-sprite.less'
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
  gulp.src("js/vendor/html5shiv.min.js")
  .pipe(copy())
  .pipe(gulp.dest("build/js/vendor"))
  gulp.src("js/vendor/jquery.colorbox-min.js")
  .pipe(copy())
  .pipe(gulp.dest("build/js/vendor"))
  gulp.src("fonts/*")
  .pipe(copy())
  .pipe(gulp.dest("build/fonts/"))
});

gulp.task("copyJslib", function() {
  gulp.src(['js/vendor/inputmask.min.js', 'js/vendor/jquery.inputmask.min.js', 'js/vendor/inputmask.phone.extensions.min.js', 'js/vendor/respond.js'])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('build/js/vendor'))
  .pipe(uglify())
  .pipe(rename('lib.min.js'))
  .pipe(gulp.dest('build/js/vendor'))
});

gulp.task('critical', function () {
    critical.generate({
        //inline: true,
        base: 'build/',
        src: 'index.html',
        dest: 'build/index-critical.html',
        //minify: true,
        dimensions: [{
        height: 800,
        width: 750
    }, {
        height: 900,
        width: 1400
    }]
    });
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

gulp.task("build", ["clean", "copyHtml", "style", "copyJslib", "minjs", "image"]);
