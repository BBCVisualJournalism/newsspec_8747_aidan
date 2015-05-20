module.exports = function (grunt) {

    grunt.registerTask('translate', [
        'clean:beforeTranslate',
        'default',
        'copyRequiredJs',
        'images',
        'multi_lang_site_generator:build_all_other_sites',
        'clean:inlineCss',
        'copy_source',
        'transfer_language_assets',
        'lang_font:others',
        'clean:tmp'
    ]);

};