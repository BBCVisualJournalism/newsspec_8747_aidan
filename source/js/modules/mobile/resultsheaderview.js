define(
['newspec_template/js/bootstrap', 'js/controller', 'js/archetypesdata'],
function(bootstrap, controller, archetypesData) {

    var $ = bootstrap.$,
        bean = bootstrap.bean,
        bind = bootstrap.bind,
        ResultsHeaderView;

    ResultsHeaderView = function(el, siblingEl) {
        var html;

        html = '<div id="gbcs-ResultsHeaderView" class="ResultsHeaderView is-hidden"></div>';
        $(siblingEl).before(html);

        this.$el = $('#gbcs-ResultsHeaderView');
    };

    ResultsHeaderView.prototype.show = function() {
        this.showCharacter('user');
        this.$el.removeClass('is-hidden');
    };

    ResultsHeaderView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    ResultsHeaderView.prototype.showCharacter = function(id) {
        var classes, intro, html;

        classes = '';
        html = '';

        if (id === 'user') {
            id = controller.getUserArchetype();
            classes = 'ResultsHeaderView-title-user';
            intro = 'The class group you most closely match is:';
        } else {
            intro = 'Other class groups:';
        }

        html += '<p class="ResultsHeaderView-intro">' + intro + '</p>';
        html += '<p class="ResultsHeaderView-title ' + classes + '">' + archetypesData[id].title + '</p>';

        this.$el.html(html);
    };

    return ResultsHeaderView;

});
