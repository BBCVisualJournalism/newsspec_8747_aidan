define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        ProgressView;

    ProgressView = function(el) {
        this.$el = $(el);
        this.$el.find('li').eq(0).addClass('is-active');
    };

    ProgressView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    ProgressView.prototype.setProgress = function(n) {
        this.$el.find('li.is-active').removeClass('is-active');
        this.$el.find('li').eq(n).addClass('is-active');
    };

    ProgressView.prototype.complete = function() {
        this.setProgress(-1);
    };

    ProgressView.prototype.clear = function() {
        this.$el.find('li.is-active').removeClass('is-active');
    };

    return ProgressView;

});
