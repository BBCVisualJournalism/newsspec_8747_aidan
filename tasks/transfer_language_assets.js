module.exports = function (grunt) {

    // used by `grunt translate`
    grunt.registerTask('transfer_language_assets', function () {

        var services = grunt.iframeScaffold.services;

        services.forEach(function (service) {

            var html = grunt.file.read('content/' + service + '/index.html'),
                matches = html.match(/div class="masthead__logo masthead__logo--([a-z]+)/),
                match;

            if (matches !== null) {
                match = matches[1];

                if (match !== 'english') {
                    grunt.file.copy('source/scss/news_special/f/bbc-' + match + '.png', 'content/' + service + '/css/f/bbc-' + match + '.png');
                    grunt.log.writeln('Copied ' + match + '.png into content/' + service + '/css/f/');
                }
            }
        });
    });

};