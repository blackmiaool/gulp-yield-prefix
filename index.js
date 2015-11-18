var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-markdown-table-to-json';

function md_trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function handle(text,target_functions) {
    target_functions.forEach(function(v,i){
        var reg=eval("/"+"\\s"+v+"\\s*\\("+"/g");
        text=text.replace(reg,"yield "+v+"(");
    })    
    return text;
}
// Plugin level function(dealing with files)
function gulpMarkdownTableToJson(target_functions) {
    // Creating a stream through which each file will pass
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
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
module.exports = gulpMarkdownTableToJson;