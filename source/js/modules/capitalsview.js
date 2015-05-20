define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        CapitalsView;

    CapitalsView = function(el) {
        this.$el = $(el);

        this.onClickOutside = $.proxy(this, 'onClickOutside');

        this.$el.on('click', 'a', $.proxy(this, 'onClick'));
        this.$el.on('click', 'button', $.proxy(this, 'onClickClose'));
    };

    CapitalsView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    CapitalsView.prototype.onClick = function(e) {
        var id;

        e.preventDefault();
        e.stopPropagation();

        id = e.currentTarget.href.replace(/^.*?#/, '');

        this.$el.find('.is-active').removeClass('is-active');

        $('#' + id)
            .addClass('is-active')
            .focus();

        $(document).on('mousedown touchstart', this.onClickOutside);
    };

    CapitalsView.prototype.onClickOutside = function(e) {
        var $target;

        $target = $(e.target);

        // Don't close when clicking inside popover element
        if ($target.hasClass('CapitalsView-popover') || $target.parent().hasClass('CapitalsView-popover')) {
            return;
        }

        this.$el.find('.is-active').removeClass('is-active');

        $(document).off('mousedown touchstart', this.onClickOutside);
    };

    // FIXME: Use a link back to the main element instead?
    CapitalsView.prototype.onClickClose = function(e) {
        this.$el.find('.is-active').removeClass('is-active');
    };

    CapitalsView.prototype.showHelp = function() {
        this.$el.find('.CapitalsView-help').removeClass('is-hidden');
    };

    CapitalsView.prototype.hideHelp = function() {
        this.$el.find('.CapitalsView-help').addClass('is-hidden');
    };

    return CapitalsView;

});
