define(
['newspec_template/js/bootstrap', 'js/controller', 'js/archetypesdata'],
function(bootstrap, controller, archetypesData) {

    var $ = bootstrap.$,
        bean = bootstrap.bean,
        bind = bootstrap.bind,
        ResultsView;

    ResultsView = function(el) {
        this.$el = $(el);
        bean.on(this.$el[0], 'click', 'button.share', bind(this, 'onClickShare'));
    };

    ResultsView.prototype.show = function() {
        this.renderResults();
        this.$el.removeClass('is-hidden');
        bean.fire(this.$el[0], 'focus');
    };

    ResultsView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    ResultsView.prototype.renderResults = function() {
        var archetypeId;
        archetypeId = controller.getUserArchetype();
        $('#gbcs-ResultsView-summary-' + archetypeId).addClass('is-active');
    };

    ResultsView.prototype.showCharacter = function(id) {
        var $target;

        $('.ResultsView-item.is-active', this.$el[0]).removeClass('is-active');

        $target = $('#gbcs-ResultsView-' + id);
        $target.addClass('is-active');
        bean.fire($target[0], 'focus');
    };

    ResultsView.prototype.onClickShare = function() {
        var archetypeId;
        archetypeId = controller.getUserArchetype();
        alert('My class group match is: ' + archetypesData[archetypeId].title);
    };

    return ResultsView;

});
