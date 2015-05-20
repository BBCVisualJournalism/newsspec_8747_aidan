'use strict';

module.exports = function () {

    var path   = require('path'),
        fs     = require('fs'),
        wrench = require('wrench'),
        tmpDir = path.join(__dirname, '../tmp');

    var deploy = {

        process: function (options, done) {
            this.validateInputs(options);

            if (options['beforeDeployment']) {
                options['beforeDeployment']();
            }

            this.copyOutputToTemporaryDirectory(options);
            this.findAndReplaceEnvironments(options);
            this.copyToDeploymentZone(options);
            this.cleanUpTemporaryFiles();

            console.log('Content deployed to following location: ' + options['server'] + options['path']);
            done();
        },

        validateInputs: function (options) {
            if (!options['server']) {
                this.throwError("You must specify the `server` attribute!");
            }
            if (!options['source']) {
                this.throwError("You must specify the `source` attribute!");
            }
            return true;
        },

        copyOutputToTemporaryDirectory: function (options) {
            try {
                if (fs.lstatSync(options['source']).isDirectory()) {
                    wrench.copyDirSyncRecursive(options['source'], tmpDir, {
                        forceDelete: true
                    });
                }
            } catch (e) {
                this.throwError('Could not copy directory! ' + e);
            }
        },

        findAndReplaceEnvironments: function (options) {
            var gruntTextReplace = require('grunt-text-replace/lib/grunt-text-replace');

            gruntTextReplace.replaceFileMultiple({
                src: [
                    tmpDir + '/**/*.html',
                    tmpDir + '/**/*.css',
                    tmpDir + '/**/*.js',
                    tmpDir + '/**/*.inc'
                ],
                overwrite:    true,
                replacements: options['replacements']
            });
        },

        copyToDeploymentZone: function (options) {
            var mkdirp     = require('mkdirp'),
                deployPath = options['server'] + options['path'];
            try {
                mkdirp.sync(deployPath);
                if (fs.lstatSync(tmpDir).isDirectory()) {
                    wrench.copyDirSyncRecursive(tmpDir, deployPath, {
                        forceDelete: true
                    });
                }
            } catch (e) {
                this.throwError('Could not deploy directory! ' + e);
            }
        },

        cleanUpTemporaryFiles: function () {
            this.deleteRecursive(tmpDir);
        },

        deleteRecursive: function (filepath) {
            var failSilently = false;
            wrench.rmdirSyncRecursive(filepath, failSilently);
        },

        /*
         * ERROR HANDLING
         */

        consoleWarnFacade: null,

        warningMessage: function (message) {
            if (this.consoleWarnFacade) {
                this.consoleWarnFacade(message);
            }
            else {
                console.warn(message);
            }
        },

        throwError: function (errMsg) {
            this.warningMessage(errMsg);
            throw new Error(errMsg);
        }
    };

    return deploy;
};