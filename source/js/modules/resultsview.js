define(
['newspec_template/js/bootstrap', 'js/controller', 'js/archetypesdata'],
function(bootstrap, controller, archetypesData) {

    var $ = bootstrap.$,
        ResultsView;

    ResultsView = function(el) {
        this.$el = $(el);
        this.$el.on('click', 'button.reset', $.proxy(this, 'onClickReset'));
        this.$el.on('click', 'button.share', $.proxy(this, 'onClickShare'));
    };

    ResultsView.prototype.show = function() {
        this.renderResults();
        this.$el.removeClass('is-hidden').focus();
    };

    ResultsView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    ResultsView.prototype.onClickReset = function(e) {
        controller.reset();
    };

    ResultsView.prototype.renderResults = function() {
        var archetypeId;
        archetypeId = controller.getUserArchetype();
        this.$el.find('.ResultsView-summary.is-active').removeClass('is-active');
        $('#gbcs-ResultsView-summary-' + archetypeId).addClass('is-active');
    };

    ResultsView.prototype.showCharacter = function(id) {
        this.$el.find('.ResultsView-item.is-active').removeClass('is-active');
        $('#gbcs-ResultsView-' + id).addClass('is-active').focus();
    };

    ResultsView.prototype.onClickShare = function() {
        var archetypeId;
        archetypeId = controller.getUserArchetype();
        alert('My class group match is: ' + archetypesData[archetypeId].title);
    };

    return ResultsView;

});
