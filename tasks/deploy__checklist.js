module.exports = function (grunt) {
    grunt.registerTask('deploy_checklist', function () {

        var config = grunt.config.get('config');

        propertiesToCheck = [
            {
                value:         config.debug,
                invalidValues: ['true'],
                errMessage:    '"debug" in package.js is set to true, do not deploy to live with this setting!'
            },
            {
                value:         config.project_number,
                invalidValues: ['', '0000'],
                errMessage:    '"project_number" in package.json not set!'
            }
        ];

        propertiesToCheck.forEach(function (property) {
            checkProperty(
                property.value,
                property.invalidValues,
                property.errMessage
            );
        });

        function checkProperty(value, invalidValues, errMessage) {
            if (valueIsInvalid(value, invalidValues)) {
                grunt.log.warn(errMessage);
            }
        }
        function valueIsInvalid(value, invalidValues) {
            return invalidValues.indexOf(value) > -1;
        }
    });
};