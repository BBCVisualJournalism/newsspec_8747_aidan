module.exports = function (grunt) {

    var fontsLookup = {
        "afrique":    "standard",
        "azeri":      "standard",
        "bengali":    "standard",
        "portuguese": "standard",
        "english":    "standard",
        "gahuza":     "standard",
        "hausa":      "standard",
        "indonesia":  "standard",
        "kyrgyz":     "standard",
        "mundo":      "standard",
        "rusian":     "standard",
        "russian":    "standard",
        "somali":     "standard",
        "swahili":    "standard",
        "tajik":      "standard",
        "turkce":     "standard",
        "ukrainian":  "standard",
        "uzbek":      "standard",
        "vietnamese": "standard",

        "arabic":     "ar-ur",
        "pashto":     "ar-ur",
        "persian":    "ar-ur",
        "urdu":       "ar-ur",

        "burmese":    "my",
        "chinese":    "zh-hans",
        "hindi":      "hi",
        "nepali":     "ne",
        "sinhala":    "si",
        "tamil":      "ta",
        "ukchina":    "zh-hans_simp"
    };

    function prependLanguageFontsToCssFile(service) {
        var fontstackStr = fontsLookup[service];

        if (fontstackStr) {

            var outputCssFilePaths = [
                    'content/' + service + '/css/main.css',
                    'content/' + service + '/css/legacy-ie.css'
                ],
                cssToPrependStr = grunt.file.read('source/scss/news_special/fonts/' + fontstackStr + '_fonts.css'),
                sourceCssStr;

            for (var i = 0;  i < outputCssFilePaths.length; i++) {
                sourceCssStr = grunt.file.read(outputCssFilePaths[i]);
                grunt.file.write(outputCssFilePaths[i], cssToPrependStr + sourceCssStr);
            }
        }
        else {
            grunt.log.writeln('couldn\'t find any font information for: ' + service);
        }
    }

    grunt.registerTask('lang_font:default', function () {
        var service = grunt.config.get('config').services.default;
        prependLanguageFontsToCssFile(service);
    });

    grunt.registerTask('lang_font:others', function () {

        var services = grunt.iframeScaffold.services;

        services.forEach(function (service) {
            prependLanguageFontsToCssFile(service);
        });
    });
};
