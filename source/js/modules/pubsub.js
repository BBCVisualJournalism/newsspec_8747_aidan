(function () {

define(['event_emitter'] , function (EventEmitter) {
		var pubsub = new EventEmitter();
		return pubsub;
	});
}());