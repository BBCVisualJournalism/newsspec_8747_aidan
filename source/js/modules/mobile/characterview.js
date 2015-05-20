define(
['newspec_template/js/bootstrap', 'js/archetypesdata', 'js/segmentsview', 'js/mobile/bitmapsegmentsview'],
function(bootstrap, archetypesData, SegmentsView, BitmapSegmentsView) {

    var $ = bootstrap.$,
        supportsSvg,
        CharacterView;

    // Check if device supports SVG
    // - http://stackoverflow.com/q/654112
    supportsSvg = ((SVGAngle in window) || document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'));
    // supportsSvg = false;

    CharacterView = function(el) {
        var $canvas, width;

        this.$el = $(el);

        $canvas = $('.canvas', this.$el);

        // FIXME: Cannot get dimensions if element is hidden
        // width = $canvas.offset().width;

        // FIXME: Fixed width
        width = 234;
        $canvas.css({ height: width, width: width });

        if (supportsSvg) {
            this.segments = new SegmentsView($canvas, width, 0.90, 0.44);
        } else {
            this.segments = new BitmapSegmentsView($canvas, width);
        }

        this.$character = $('.character', this.$el);
        this.$character[0].className = this.$character[0].className.replace(/ character/g, ' character-mobile');
    };

    CharacterView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    CharacterView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    // This shows the user's score and illustration
    CharacterView.prototype.update = function(score) {
        this.segments.update(score);
        this.setHeadClass('user');
    };

    CharacterView.prototype.showArchetype = function(id) {
        if (supportsSvg) {
            this.segments.update(archetypesData[id]);
        } else {
            this.segments.showArchetype(id);
        }

        this.setHeadClass(id);
    };

    CharacterView.prototype.setHeadClass = function(id) {
        this.$character[0].className = this.$character[0].className.replace(/ ?character-mobile-[\w-]+ ?/, '') + ' character-mobile-' + id;
    };

    return CharacterView;

});
