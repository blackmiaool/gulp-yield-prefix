var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-yield-prefix';

function md_trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function handle(text,target_functions) {
    target_functions.forEach(function(v,i){
        var reg=eval("/"+"\\b"+v+"\\s*\\("+"/g");
        text=text.replace(reg,"yield "+v+"(");
    })    
    return text;
}

function gulpYieldPrefix(target_functions) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = new Buffer(handle(file.contents.toString(),target_functions))
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpYieldPrefix;
