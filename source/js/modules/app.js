define(
['js/controller', 'js/usermodel', 'js/splashview', 'js/progressview', 'js/characterview', 'js/capitalsview', 'js/questionsview', 'js/resultsview', 'js/characternavview','js/pubsub','js/tracking','js/share'],
function(controller, UserModel, SplashView, ProgressView, CharacterView, CapitalsView, QuestionsView, ResultsView, CharacterNavView,pubsub,tracker,share) {
    
    return {
        init: function() {
            controller.init(
                new UserModel(),
                new SplashView('#gbcs-SplashView'),
                new ProgressView('#gbcs-ProgressView'),
                new CharacterView('#gbcs-CharacterView'),
                new CapitalsView('#gbcs-CapitalsView'),
                new QuestionsView('#gbcs-QuestionsView'),
                new ResultsView('#gbcs-ResultsView'),
                new CharacterNavView('#gbcs-CharacterNavView')
            );
        }
    };

});
