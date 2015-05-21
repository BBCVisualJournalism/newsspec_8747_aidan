define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        bind = bootstrap.bind,
        SplashView;

    SplashView = function(el) {
        this.$el = $(el);
        this.$el.find('a').on('click', bind(this, 'onClick'));
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
