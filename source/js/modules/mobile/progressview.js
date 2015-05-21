define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        bind = bootstrap.bind,
        ProgressView;

    ProgressView = function(el) {
        this.$el = $(el);

        // Prepend an initial title
        this.$el.prepend('<li class="is-active"><span>Great British Class Survey</span></li>');

        // Add a close button
        this.$el.append('<button class="close sprite sprite-close-reversed">Back to story</button>');

        this.$el.removeClass('is-hidden');

        this.$el.find('button').on('click', bind(this, 'onClick'));
    };

    ProgressView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    ProgressView.prototype.setProgress = function(n) {
        var target;
        $('li.is-active', this.$el).removeClass('is-active');
        target = (n === -1) ?$('li', this.$el).last() : $('li', this.$el)[n + 1];
        $(target).addClass('is-active');
    };

    ProgressView.prototype.complete = function() {
        this.setProgress(-1);
    };

    ProgressView.prototype.onClick = function(e) {
        e.preventDefault();
        controller.hideMain();
    };

    return ProgressView;

});
