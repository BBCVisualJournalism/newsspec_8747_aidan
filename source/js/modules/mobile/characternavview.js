define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        bind = bootstrap.bind,
        CharacterNavView;

    CharacterNavView = function(el) {
        var characterIds;

        this.$el = $(el);

        characterIds = [];
        $('a', this.$el).each(function() {
            characterIds.push(this.href.replace(/^.*?gbcs-ArchetypesView-/, ''));
        });
        this.characterIds = characterIds;

        this.activeCharacterIndex = 0;

        this.$el.find('button').on('click', bind(this, 'onClick'));

    };

    CharacterNavView.prototype.onClick = function(e) {
        var d, i, id;

        e.preventDefault();
        e.stopPropagation();

        d = (e.currentTarget.className === 'prev') ? -1 : 1;
        i = this.activeCharacterIndex + d;

        // Wrap navigation
        if (i < 0) {
            i = this.characterIds.length - 1;
        } else if (i > this.characterIds.length - 1) {
            i = 0;
        }

        id = this.characterIds[i];

        controller.showArchetype(id);

        this.activeCharacterIndex = i;
    };

    CharacterNavView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    return CharacterNavView;

});
