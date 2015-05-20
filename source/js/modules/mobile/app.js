define(
['js/controller', 'js/usermodel', 'js/mobile/splashview', 'js/mobile/progressview', 'js/mobile/questionsview', 'js/mobile/resultsview', 'js/mobile/characterview', 'js/mobile/characternavview', 'js/mobile/capitalsview', 'js/pubsub', 'js/tracking', 'js/mobile/resultsheaderview'],
function(controller, UserModel, SplashView, ProgressView, QuestionsView, ResultsView, CharacterView, CharacterNavView, CapitalsView, pubsub, tracker, ResultsHeaderView) {

    return {
        init: function() {
            controller.init(
                new UserModel(),
                new SplashView('#gbcs-SplashView'),
                new ProgressView('#gbcs-ProgressView'),
                new QuestionsView('#gbcs-QuestionsView'),
                new ResultsView('#gbcs-ResultsView'),
                new CharacterView('#gbcs-CharacterView'),
                new CharacterNavView('#gbcs-CharacterNavView'),
                new CapitalsView('#gbcs-CapitalsView'),
                new ResultsHeaderView(null, '#gbcs-CharacterView')
            );
        }
    };

});
