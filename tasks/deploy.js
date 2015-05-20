module.exports = function (grunt) {

    var env  = grunt.config.get('env'),
        path = require('path'),
        sourceFiles = path.join(__dirname, '../content');

    // @TODO - this will become something like grunt.loadNpmTasks('deploy');
    require('./deploy/bin/grunt')(grunt);

    grunt.config(['deploy'], {
        stage: {
            server:  env['stage']['mount'],
            source:  sourceFiles,
            path:    '/news/special/<%= config.year %>/newsspec_<%= config.project_number %>',
            replacements: [{
                from: env['local']['domain'],
                to:   env['stage']['domain']
            }, {
                from: env['local']['domainStatic'],
                to:   env['stage']['domainStatic']
            }],
            beforeDeployment: function () {
                grunt.task.run('shell:checkMounts');
                grunt.task.run('deploy_checklist');
            }
        },
        live: {
            server:  env['live']['mount'],
            source:  sourceFiles,
            path:    '/news/special/<%= config.year %>/newsspec_<%= config.project_number %>',
            replacements: [{
                from: env['local']['domain'],
                to:   env['live']['domain']
            }, {
                from: env['local']['domainStatic'],
                to:   env['live']['domainStatic']
            }],
            beforeDeployment: function () {
                grunt.task.run('shell:checkMounts');
                grunt.task.run('deploy_checklist');
                grunt.task.run('checkDeployedToStage');
            }
        }
    });
};