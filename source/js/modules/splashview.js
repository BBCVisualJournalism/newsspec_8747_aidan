define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        SplashView;

    SplashView = function(el) {
        this.$el = $(el);
        this.$el.on('click', 'a', $.proxy(this, 'onClick'));
    };

    SplashView.prototype.onClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        controller.dismissSplash();
    };

    SplashView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    return SplashView;

});
