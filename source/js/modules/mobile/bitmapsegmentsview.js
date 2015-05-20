define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        BitmapSegmentsView;

    BitmapSegmentsView = function($el, width) {
        this.$el = $el;

        this.$el.addClass('canvas-bitmap archetype-user');

        this.render();
    };

    // FIXME: Should not need to reverse
    BitmapSegmentsView.prototype.renderedProperties = [
        'economic-income',
        'economic-assets',
        'social-mean',
        'social-count',
        'cultural-emerging',
        'cultural-high'
    ].reverse();

    BitmapSegmentsView.prototype.render = function() {
        var i, html;

        html = '';

        for (i = 0; i < this.renderedProperties.length; i ++) {
            html += '<div id="BitmapSegmentsView-segment-' + this.renderedProperties[i] + '" class="BitmapSegmentsView-segment"></div>';
        }

        this.$el.append(html);
    };

    BitmapSegmentsView.prototype.update = function(score) {
        var i, property, value, roundedValue;

        // Hide the current archetype
        this.showArchetype('user');

        for (i = 0; i < this.renderedProperties.length; i ++) {
            property = this.renderedProperties[i];

            value = score[property];

            if (isNaN(value)) {
                continue;
            }

            // Scale by area rather than radius?
            // value = Math.sqrt(value);

            // FIXME: Check rounding here is reasonable
            roundedValue = Math.ceil(value / 0.2) * 0.2;

            $('#BitmapSegmentsView-segment-' + property).addClass('pc' + Math.round(roundedValue * 100));
        }
    };

    BitmapSegmentsView.prototype.showArchetype = function(id) {
        this.$el[0].className = this.$el[0].className.replace(/ ?archetype-[\w-]+ ?/, '') + ' archetype-' + id;
    };

    return BitmapSegmentsView;

});
