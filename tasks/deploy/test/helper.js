'use strict';

module.exports = function () {

    var deploy = require('../lib/deploy')(),
        assert = require('assert'),
        fs     = require('fs'),
        path   = require('path');

    var helper = {

        setUp: function (done) {

            function waitForFileUpdates() {
                if (fs.existsSync(helper.getTmpDirPath())) {
                    setTimeout(waitForFileUpdates, 10);
                }
                else {
                    // sanity check
                    helper.assertFixturesExist();
                    helper.assertNoTmpDir();
                    deploy.copyOutputToTemporaryDirectory({
                        source: helper.getFixturesPath()
                    });
                    done();
                }
            }

            waitForFileUpdates();
        },

        // implicit testing of the deploy `cleanUpTemporaryFiles` function lives in here.
        tearDown: function () {
            deploy.cleanUpTemporaryFiles();
            helper.assertNoTmpDir();
            // sanity check - in case originals are corrupted as part of copy process.
            helper.assertFixturesExist();
        },

        getServerPath: function () {
            return path.join(__dirname, 'output');
        },

        getFixturesPath: function () {
            return path.join(__dirname, 'fixtures');
        },

        getTmpDirPath: function () {
            return path.join(__dirname, '../tmp');
        },

        assertFixturesExist: function () {
            helper.assertFilesExist([
                helper.getFixturesPath(),
                helper.getFixturesPath() + '/test.html'
            ]);
        },

        assertNoTmpDir: function () {
            helper.assertFilesDoNotExist([
                helper.getTmpDirPath(),
                helper.getTmpDirPath() + '/test.html'
            ]);
        },

        assertFilesExist: function (files) {
            for (var i = 0; i < files.length; i++) {
                assert.isTrue(fs.existsSync(files[i]), "The following file or directory does not exist when it should: " + files[i]);
            }
        },

        assertFilesDoNotExist: function (files) {
            for (var i = 0; i < files.length; i++) {
                assert.isFalse(fs.existsSync(files[i]), "The following file or directory exists when it shouldn't: " + files[i]);
            }
        }
    }

    return helper;
}