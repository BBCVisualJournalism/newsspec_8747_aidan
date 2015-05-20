define(['js/pubsub', 'lib/news_special/bootstrap'], function(pubsub, news) {

	var step1 = false,
		step2 = false,
		step3 = false;

	pubsub.addListener('start-interaction', function (target) {
		if(step1 === false){
			news.pubsub.emit('istats', ['user-interaction', 'User started interaction']);
			console.log('boo1');
			step1 = true;
		}
	});
	pubsub.addListener('get-result', function (target) {
		if(step2 === false){
			news.pubsub.emit('istats', ['user-interaction', 'User completed the form']);
			console.log('boo2');
			step2 = true;
		}		
	});
	pubsub.addListener('explore-archetypes', function (target) {
		if(step3 === false){
			console.log('boo3');
			news.pubsub.emit('istats', ['user-interaction', 'Explored archetypes']);
			step3 = true;
		}		
	});
		
});