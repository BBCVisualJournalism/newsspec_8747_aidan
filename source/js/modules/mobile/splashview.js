define(
['newspec_template/js/bootstrap', 'js/controller'],
function(bootstrap, controller) {

    var $ = bootstrap.$,
        bean = bootstrap.bean,
        bind = bootstrap.bind,
        SplashView;

    SplashView = function(el) {
        this.$el = $(el);
        bean.on(this.$el[0], 'click', 'a', bind(this, 'onClick'));
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
