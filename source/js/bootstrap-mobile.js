define(
['vendor/ender/bonzo', 'vendor/ender/qwery-mobile', 'vendor/ender/bean', 'vendor/istats/istats'],
function (bonzo, qwery, bean, istats) {
    return {
        $: function(selector, context) {
            return bonzo(qwery(selector, context));
        },
        bean: bean,
        bind: function(o, f) {
            return function () {
                return o[f].apply(o, Array.prototype.slice.call(arguments));
            };
        },
        istats: istats
    };
});