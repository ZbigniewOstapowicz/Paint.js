var gulp = require('gulp');
var sass = require('gulp-sass');
var deploy = require('gulp-deploy-git');

const browsersync = require("browser-sync").create();
const webpack = require('webpack-stream');
const { spawn } = require('child_process');
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function copyHtml() {
    return gulp.src('index.html')
        .pipe(gulp.dest('build'))
};

function copyImg() {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg,ico}')
        .pipe(gulp.dest('build/img'))
};

function copyFavicon() {
    return gulp.src('src/favicon/**/*.{jpg,png,ico}')
        .pipe(gulp.dest('build/favicon'))
};

function styles() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'))
};

function scripts() {
    return gulp.src('src/js/index.js')
        .pipe(webpack({
            output: {
                filename: 'index.js',
            },
        }))
        .pipe(gulp.dest('build'));
}

function watchFiles() {
    copyImg();
    copyFavicon();
    copyHtml();
    styles();
    scripts();

    gulp.watch('index.html', copyHtml);
    gulp.watch('src/img/**/*.{gif,jpg,png,svg}', copyImg);
    gulp.watch('src/favicon/**/*.{png,jpg,ico}', copyFavicon);
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);

    gulp.watch(
        [
            "./build/**/*",
        ],
        gulp.series(browserSyncReload)
    );
}

const watch = gulp.parallel(watchFiles, browserSync);
gulp.task('node-server-start', function(cb) {
    const server = spawn('node', ['nodeapi/nodeapi.js'], { stdio: 'inherit' });
    server.on('close', () => cb());
});

gulp.task('ng-serve', function(cb) {
    const server = spawn(
        /^win/.test(process.platform) ? 'ng.cmd' : 'ng',
        ['serve'],
        { stdio: 'inherit' }
    );
    server.on('close', () => cb());
});

gulp.task(
    'start',
    gulp.parallel('ng-serve', 'node-server-start', function(cb) {
        console.log('both servers launched on localhost:4200');
        cb();
    })
);
gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(deploy({
      repository: 'https://github.com/zhevron/gulp-deploy-git.git'
    }));
});

gulp.task('default', gulp.series('start'));

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = watch;