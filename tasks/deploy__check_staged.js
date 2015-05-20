module.exports = function (grunt) {
    grunt.registerTask('checkDeployedToStage', 'Checking content on stage', function () {
        var path   = require('path'),
            env    = grunt.config.get('env'),
            config = grunt.file.readJSON('config.json'),
            done   = this.async(),
            fs     = require('fs');

        try {
            var stagedProject = fs.lstatSync(env.stage.mount + '/news/special/' + config.year + '/newsspec_' + config.project_number + '/content/' + config.services.default);

            if (stagedProject.isDirectory()) {
                grunt.log.writeln('This content is on stage - OK');
                done();
            }
        } catch (e) {
            done(false);
            grunt.log.writeln('This content has not been staged - Fail');
        }
    });
};