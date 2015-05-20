'use strict';

module.exports = function () {

    var deploy = require('../lib/deploy')(),
        helper = require('./helper')(),
        assert = require('assert'),
        fs     = require('fs');

    deploy.consoleWarnFacade = function (message) {
        throw new Error(message);
    }

    var tests = [
        {
            'when everything is provided': {

                topic: function () {
                    return deploy.validateInputs({
                        source:  'some/source',
                        server:  'some/server',
                        path:    'some/path'
                    });
                },

                'everything should validate': function (inputs) {
                    assert.isTrue(inputs);
                }
            },

            'when we neglect to specify the server': {
                'an error should be raised': function () {
                    assert.throws(function () {
                        deploy.validateInputs({
                            //server:  'some/server',
                            source:  'some/source',
                            path:    'some/path'
                        })
                    }, Error);
                }
            },

            'when we neglect to specify the source': {
                'an error should be raised': function () {
                    assert.throws(function () {
                        deploy.validateInputs({
                            //source:  'some/source',
                            server:  'some/server',
                            path:    'some/path'
                        })
                    }, Error);
                }
            }
        },
        {
            'calling the copy function': {

                topic: function () {
                    helper.setUp(this.callback);
                },

                'should copy source to tmp directory': function () {
                    // assert copied correctly
                    helper.assertFilesExist([
                        helper.getTmpDirPath(),
                        helper.getTmpDirPath() + '/test.html'
                    ]);

                    helper.tearDown();
                }
            }
        },
        {
            'calling the replace function': {

                topic: function () {
                    helper.setUp(this.callback);
                },

                'should copy source to tmp directory': function () {

                    // make our replacements
                    deploy.findAndReplaceEnvironments({
                    replacements: [{
                            from: 'TEST',
                            to:   'bbc.co.uk'
                        }, {
                            from: 'Foo',
                            to:   'example.com'
                        }]
                    });

                    assert.deepEqual(
                        fs.readFileSync(helper.getFixturesPath() + '/../expected/test.html', {
                            'encoding': 'utf8'
                        }),
                        fs.readFileSync(helper.getTmpDirPath() + '/test.html', {
                            'encoding': 'utf8'
                        })
                    );

                    helper.tearDown();
                }
            }
        },
        {
            'deploying the processed files': {

                topic: function () {
                    helper.setUp(this.callback);
                },

                'should deploy source to server': function () {
                    deploy.copyToDeploymentZone({
                        server: helper.getServerPath(),
                        path:   '/news/special/year'
                    });

                    var deployPath = helper.getServerPath() + '/news/special/year';

                    helper.assertFilesExist([
                        deployPath,
                        deployPath + '/test.html'
                    ]);

                    deploy.deleteRecursive(helper.getServerPath());
                    helper.tearDown();
                }
            }
        }
    ];

    return tests;
}