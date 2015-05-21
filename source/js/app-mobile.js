define(['lib/news_special/bootstrap', 'newspec_template/js/bootstrap', 'js/app'], function (news, bootstrap, app) {
    
    var el = document.getElementById('newsspec_5093');
    el.className = 'clearfix mobile';
    app.init();

    news.sendMessageToremoveLoadingImage();

    // FIXME: Remove in production
    // Avoid `console` errors in browsers that lack a console
    if (!(window.console && console.log)) {
        (function() {
            var noop = function() {};
            var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
            var length = methods.length;
            var console = window.console = {};
            while (length--) {
                console[methods[length]] = noop;
            }
        }());
    }    
});
