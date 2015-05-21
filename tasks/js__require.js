module.exports = function (grunt) {

    // *************************************************************************
    // REQUIRE PATHS
    // Add any paths here you want shortened. Relative to the 'js' dir.
    // *************************************************************************

    var amdModulePaths = {
        'pubsub': './lib/vendors/jquery/pubsub',
        'appInitData': 'empty:',
        'js': './modules',
        'newspec_template/js/bootstrap': './bootstrap',
        'raphael': './lib/vendors/raphael',
        'event_emitter': './lib/vendors/event_emitter'
    };

    var amdModuleMobilePaths = {
        'pubsub': './lib/vendors/jquery/pubsub',
        'appInitData': 'empty:',
        'js': './modules',
        'js/app': './modules/mobile/app',
        'js/controller': './modules/mobile/controller',
        'newspec_template/js/bootstrap': './bootstrap-mobile',
        'raphael': './lib/vendors/raphael',
        'event_emitter': './lib/vendors/event_emitter'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************

    var _ = require('lodash-node'),
        requirePathsForJquery1build = _.merge({'jquery': './lib/vendors/jquery/jquery-1.9.1'}, amdModulePaths),
        requirePathsForJquery2build = _.merge({'jquery': './lib/vendors/jquery/jquery-2.0.3'}, amdModulePaths),
        requirePathsForJquery1MobileBuild = _.merge({'jquery': './lib/vendors/jquery/jquery-1.9.1'}, amdModuleMobilePaths),
        requirePathsForJquery2MobileBuild = _.merge({'jquery': './lib/vendors/jquery/jquery-2.0.3'}, amdModuleMobilePaths),
        jasmineSpecPaths = _.merge(requirePathsForJquery1build, {'appInitData': './spec/appInitData'});
    
    grunt.config(['amdModulePaths'], amdModulePaths);
    grunt.config(['jasmineSpecPaths'], jasmineSpecPaths);
    grunt.config(['requirejs', 'jquery1'], {
        options: {
            baseUrl: './source/js',
            paths: requirePathsForJquery1build,
            optimize: 'uglify2',
            generateSourceMaps: false,
            preserveLicenseComments: false,
            name: './app',
            out: './content/<%= config.services.default %>/js/all-legacyie.js'
        }
    });

    grunt.config(['requirejs', 'jquery2'], {
        options: {
            baseUrl: './source/js',
            paths: requirePathsForJquery2build,
            optimize: 'uglify2',
            generateSourceMaps: true,
            preserveLicenseComments: false,
            name: './app',
            out: './content/<%= config.services.default %>/js/all-html5.js'
        }
    });
    grunt.config(['requirejs', 'jquery1-mobile'], {
        options: {
            baseUrl: './source/js',
            paths: requirePathsForJquery1MobileBuild,
            optimize: 'uglify2',
            generateSourceMaps: false,
            preserveLicenseComments: false,
            name: './app-mobile',
            out: './content/<%= config.services.default %>/js/all-legacyie-mobile.js'
        }
    });

    grunt.config(['requirejs', 'jquery2-mobile'], {
        options: {
            baseUrl: './source/js',
            paths: requirePathsForJquery2MobileBuild,
            optimize: 'uglify2',
            generateSourceMaps: true,
            preserveLicenseComments: false,
            name: './app-mobile',
            out: './content/<%= config.services.default %>/js/all-html5-mobile.js'
        }
    });
    grunt.config(['requirejs', 'lite'], {
        options: {
            baseUrl: './source/js',
            paths: requirePathsForJquery2build,
            optimize: 'uglify2',
            generateSourceMaps: false,
            preserveLicenseComments: false,
            name: './lib/vendors/almond/almond',
            out: './content/<%= config.services.default %>/js/lite.js',
            include: ['app--lite'],
            insertRequire: ['app--lite'],
            wrap: true
        }
    });
};
