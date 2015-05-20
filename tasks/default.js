module.exports = function (grunt) {
    grunt.registerTask('default', ['bump', 'generate_shared_config', 'css', 'js', 'html', 'copy:cssFurniture', 'clean:tmp', 'lang_font:default']);
};