define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        CharacterNavView;

    CharacterNavView = function(el) {
        this.$el = $(el);
        this.$el.on('click', 'a', $.proxy(this, 'onClick'));
    };

    CharacterNavView.prototype.onClick = function(e) {
        var id;

        e.preventDefault();
        e.stopPropagation();

        if ($(e.currentTarget).parent().hasClass('is-active')) {
            return;
        }

        id = e.currentTarget.href.replace(/^.*?gbcs-ArchetypesView-/, '');

        controller.showArchetype(id);
    };

    CharacterNavView.prototype.setActiveArchetype = function(id) {
        this.$el.find('.is-active').removeClass('is-active');
        $('#CharacterNavView-' + id).addClass('is-active');
    };

    CharacterNavView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    CharacterNavView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    return CharacterNavView;

});
