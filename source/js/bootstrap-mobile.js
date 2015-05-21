define(
['jquery'],
function ($) {
    return {
        $: $,
        bind: function(o, f) {
            return function () {
                return o[f].apply(o, Array.prototype.slice.call(arguments));
            };
        }
    };
});