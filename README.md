# gulp-yield-prefix
[![NPM version][npm-image]][npm-url]
> A yield-prefix  plugin for gulp 3

## Usage

First, install `gulp-yield-prefix` as a development dependency:

```shell
npm install --save-dev gulp-yield-prefix
```
Then, add it to your `gulpfile.js`:

```javascript
var yieldPrefix = require('gulp-yield-prefix');
gulp.task('yieldPrefix', function(){
return gulp.src('js/plot/*.js')
    .pipe(yieldPrefix(["ts", "tm"]))
    .pipe(gulp.dest('js/plot/dist/'));
});

```

#### Input
```javascript
function hello(){
    tm(1);
    ts(2);
    a(3);
}
```

#### Output
```javascript
function hello(){
    yield tm(1);
    yield ts(2);
    a(3);
}
```

## API

### md2json(targetFuncs)

#### targetFuncs
Type: `Array`

Function names to prefix "yield".






[npm-url]: https://npmjs.org/package/gulp-yield-prefix
[npm-image]: http://img.shields.io/npm/v/gulp-yield-prefix.svg