(function () {
    var baseUrl = 'http://noldev25new.newsonline.tc.nca.bbc.co.uk:11138',
        basePath = '/news/special/2013/newsspec_5093',
        config,
        el = document.getElementById('newsspec_5093'),
        isDesktop = (window.bbc);

    // Raphael module does not return itself, but it is in the global scope
    el.className = 'clearfix';
    if (isDesktop) {

        el.className += ' desktop';

        config = {
            paths: {
                'js': basePath + '/js/modules',
                'newspec_template/js/bootstrap': basePath + '/js/bootstrap',
                'raphael': 'http://news.bbcimg.co.uk/news/special/shared/js/raphaeljs/amd/v1/raphael-min-amd'
            }
        };
    } else {
        el.className += ' mobile';

        config = {
            paths: {
                'js': basePath + '/js/modules',
                'js/app': basePath + '/js/modules/mobile/app',
                'js/controller': basePath + '/js/modules/mobile/controller',
                'newspec_template/js/bootstrap': basePath + '/js/bootstrap-mobile',
                'raphael': 'http://news.bbcimg.co.uk/news/special/shared/js/raphaeljs/amd/v1/raphael-min-amd'
            }
        };
    }

    require(
        config,
        ['newspec_template/js/bootstrap', 'js/app'],
        function(bootstrap, app) {
            if (isDesktop) {
                // Wait for DOM ready
                bootstrap.$(app.init);
            } else {
                app.init();
            }
        }
    );

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

}());