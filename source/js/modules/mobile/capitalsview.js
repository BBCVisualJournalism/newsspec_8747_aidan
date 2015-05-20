define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        CapitalsView;

    CapitalsView = function(el) {
        this.$el = $(el);
    };

    CapitalsView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };
    
    return CapitalsView;

});
