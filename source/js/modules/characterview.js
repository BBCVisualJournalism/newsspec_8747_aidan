define(
['newspec_template/js/bootstrap', 'js/archetypesdata', 'js/segmentsview'],
function(bootstrap, archetypesData, SegmentsView) {

    var $ = bootstrap.$,
        CharacterView;

    CharacterView = function(el) {
        var $canvas, width;

        this.$el = $(el);

        $canvas = this.$el.find('.canvas');

        // FIXME: Cannot get dimensions if element is hidden
        width = $canvas.width();

        $canvas.css({ height: width, width: width });

        this.segments = new SegmentsView(this.$el.find('.canvas'), width, 0.8, 0.35);

        this.$character = this.$el.find('.character');
    };

    // This shows the user's score and illustration
    CharacterView.prototype.update = function(score) {
        this.segments.update(score);
        this.setHeadClass('user');
    };

    CharacterView.prototype.showArchetype = function(id) {
        this.segments.update(archetypesData[id]);
        this.setHeadClass(id);
    };

    CharacterView.prototype.setHeadClass = function(id) {
        this.$character[0].className = this.$character[0].className.replace(/character-[\w-]+/, 'character-' + id);
    };

    CharacterView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    return CharacterView;

});
