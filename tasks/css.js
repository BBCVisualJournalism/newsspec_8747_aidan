module.exports = function (grunt) {
    grunt.registerTask('css', ['clean:sasscache', 'sass:main', 'sass:inline', 'cssmin']);
};