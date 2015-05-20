'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask(
        'deploy',
        'Configures a project to a specific server environment, then deploys to that environment.',
        function () {

        var deploy  = require('../lib/deploy')();
        var _       = require('underscore');
        var options = _.extend({
                path:         '/news/special/year/newsspec_test/content',
                replacements: [
                    {
                        from: 'http://local.bbc.co.uk:1031',
                        to:   'http://example.com'
                    },
                    {
                        from: 'http://static.local.bbc.co.uk:1033',
                        to:   'http://static.example.com'
                    }
                ]
            }, this.data);

        deploy.process(options, this.async());
    });
};