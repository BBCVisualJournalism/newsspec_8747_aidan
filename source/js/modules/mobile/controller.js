define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        bind = bootstrap.bind;

    return {
        init: function(userModel, splashView, progressView, questionsView, resultsView, characterView, characterNavView, capitalsView, resultsHeaderView) {
            this.repositionMain();
            // this.showMain();

            this.userModel = userModel;
            this.splashView = splashView;
            this.progressView = progressView;
            this.questionsView = questionsView;
            this.resultsView = resultsView;
            this.characterView = characterView;
            this.characterNavView = characterNavView;
            this.capitalsView = capitalsView;
            this.resultsHeaderView = resultsHeaderView;
        },

        // Move our main element to the root of the DOM tree so we can fill the viewport
        // - Also insert a button to trigger showing our main element
        repositionMain: function() {
            var $el, html;

            $el = $('#newsspec_5093');

            // TODO: Correct image URL and link copy
            html = [
                '<div id="newsspec_5093-mobile-launch">',
                    '<img src="http://www.bbc.co.uk/news/special/2013/newsspec_5093/img/launch-placeholder.gif" alt="">',
                    '<a><span>Launch</span></a>',
                '</div>'
            ].join('');

            $el.before(html);
            $('#newsspec_5093-mobile-launch a').on('click', bind(this, 'showMain'));

            $el.detach();
            $('.main').append($el);
        },

        showMain: function() {
            $('#newsspec_5093-mobile-launch').hide();
            $('#newsspec_5093').css({ display: 'block' });
            $('#blq-container').css({ display: 'none' });
        },

        hideMain: function() {
            $('#newsspec_5093-mobile-launch').show();
            $('#newsspec_5093').css({ display: 'none' });
            $('#blq-container').css({ display: 'block' });
        },

        inputChanged: function() {
            // iStats - Users has interacted with form
            // - FIXME: Needs to be triggered max once
            $.emit('start-interaction');
        },

        setUserProperty: function(property, value, silent) {
            this.userModel.set(property, value, silent);
            // if (!silent) {
            //     this.updateUserScore();
            // }
        },

        updateUserScore: function() {
            var score;
            score = this.userModel.score;
            this.characterView.update(score);
        },

        getUserArchetype: function() {
            return this.userModel.getNearestArchetype();
        },

        dismissSplash: function() {
            this.splashView.hide();
            this.characterView.hide();
            this.progressView.show();
            this.questionsView.show();
            this.showQuestions(0);
        },

        showQuestions: function(n) {
            // iStats - Users has completed questions
            // - FIXME: Needs to be triggered max once
            this.progressView.setProgress(n);
            this.questionsView.showQuestions(n);
        },

        showResults: function() {
            $.emit('get-result');
            this.questionsView.hide();
            this.resultsView.show();
            this.resultsHeaderView.show();
            this.characterView.show();
            this.characterNavView.show();
            this.capitalsView.show();
            this.progressView.complete();
            this.updateUserScore();
        },

        reset: function() {
            this.resultsView.hide();
            this.questionsView.reset();
            this.showQuestions(0);
        },

        showArchetype: function(id) {
            if (id === 'user') {
                this.updateUserScore();
            } else {
                // iStats - Users has viewed another class
                // - FIXME: Needs to be triggered max once
                $.emit('explore-archetypes');
                this.characterView.showArchetype(id);
            }

            this.resultsView.showCharacter(id);
            this.resultsHeaderView.showCharacter(id);
        }
    };

});