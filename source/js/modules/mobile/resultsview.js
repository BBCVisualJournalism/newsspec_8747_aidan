define(
['newspec_template/js/bootstrap', 'js/controller', 'js/archetypesdata'],
function(bootstrap, controller, archetypesData) {

    var $ = bootstrap.$,
        bind = bootstrap.bind,
        ResultsView;

    ResultsView = function(el) {
        this.$el = $(el);
        this.$el.find('button.share').on('click', bind(this, 'onClickShare'));
    };

    ResultsView.prototype.show = function() {
        this.renderResults();
        this.$el.removeClass('is-hidden');
        this.$el.focus();
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
        $target.focus();
    };

    ResultsView.prototype.onClickShare = function() {
        var archetypeId;
        archetypeId = controller.getUserArchetype();
        alert('My class group match is: ' + archetypesData[archetypeId].title);
    };

    return ResultsView;

});
