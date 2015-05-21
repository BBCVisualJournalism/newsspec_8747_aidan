define(['jquery'],
function(pubsub) {

    return {
        init: function(userModel, splashView, progressView, characterView, capitalsView, questionsView, resultsView, characterNavView) {
            this.userModel = userModel;
            this.splashView = splashView;
            this.progressView = progressView;
            this.characterView = characterView;
            this.capitalsView = capitalsView;
            this.questionsView = questionsView;
            this.resultsView = resultsView;
            this.characterNavView = characterNavView;
        },

        inputChanged: function() {
            // iStats - Users has interacted with form
            // - FIXME: Needs to be triggered max once
            pubsub.emit('start-interaction');
        },

        setUserProperty: function(property, value, silent) {
            this.userModel.set(property, value, silent);
            if (!silent) {
                this.updateUserScore();
            }
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
            this.progressView.show();
            this.capitalsView.show();
            this.questionsView.show();
            this.showQuestions(0);
        },

        showQuestions: function(n) {
            this.progressView.setProgress(n);
            this.questionsView.showQuestions(n);
        },

        showResults: function() {
            // iStats - Users has completed questions
            // - FIXME: Needs to be triggered max once
            pubsub.emit('get-result');
            pubsub.emit('personal-share',[this.getUserArchetype()]);
            this.questionsView.hide();
            this.resultsView.show();
            this.characterNavView.show();
            this.progressView.complete();
        },

        reset: function() {
            this.resultsView.hide();
            this.questionsView.reset();
            this.questionsView.show();
            this.characterNavView.hide();
            this.showQuestions(0);
        },

        showArchetype: function(id) {
            if (id === 'user') {
                this.updateUserScore();
                this.progressView.complete();
                this.capitalsView.showHelp();
            } else {
                // iStats - Users has viewed another class
                // - FIXME: Needs to be triggered max once
                pubsub.emit('explore-archetypes');
                this.characterView.showArchetype(id);
                this.progressView.clear();
                this.capitalsView.hideHelp();
            }

            this.resultsView.showCharacter(id);
            this.characterNavView.setActiveArchetype(id);
        }
    };

});