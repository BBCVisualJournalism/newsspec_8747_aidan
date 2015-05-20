define(['js/pubsub','newspec_template/js/bootstrap','js/archetypesdata'], function(pubsub,news,data) {
	
	
	pubsub.addListener('personal-share', function(e){
		personalisedSharing(data[e].title);

	});

	function personalisedSharing(resultVO){
		console.log('boo5');
		var displayStr = "I just discovered I'm in the "+resultVO+" of Britain's new class system. Where do you fit #BritishClass";
		var SHARETOOLS_URL = 'http://static.bbc.co.uk/modules/sharetools/share';
		var APP_ID = 'BBCClassCalculator';
		var FULL_URL = 'http://www.bbc.co.uk/news/business-17442946';
		var SHORT_URL = 'http://bbc.in/GIIZAe';
		var queryStr = "?url="+SHORT_URL + "&title="+displayStr + '&appId='+APP_ID;
		var myfullShareUrl = SHARETOOLS_URL + queryStr;
		var shareHtml = '<script src="http://static.bbc.co.uk/modules/sharetools/v1/script/sharetools.js" type="text/javascript"></script><div class="bbc-st"><a href="'+myfullShareUrl+'">Share your results</a></div>';

		news.$("div#share_class_result").html(shareHtml);
		
		if (window.bbc){
			sharetools = sharetools || {}; // Use existing object or create a new one if sharetools isn't loaded
			// call cleanUpSharetools() to remove duplicate share buttons and to edit the sharetool title. IE handles this differently to Chrome and firefox so call the function twice
			// in IE the onReady event gets called before the line above - the first time this function is called IE does not execute the onReady event and duplicate share buttons appear
			// In chrome and firefox the duplicate buttons appear if not in an onReady event
			sharetools.onReady = function() {
				cleanUpSharetools();
			};
			cleanUpSharetools();
		}
	}
	
	function cleanUpSharetools(){
		// HACK to remove duplicate share buttons from #top-share-toolbar and #bottom-share-toolbar
		news.$("div#bottom-share-toolbar div.bbc-st-wrapper").each(function(indx){
			if (indx != 0) { news.$(this).hide(); }
		});
		
		news.$("div#top-share-toolbar div.bbc-st-wrapper").each(function(indx) {
			if (indx != 0) { news.$(this).hide();}
		});
		// change heading next to share buttons
		news.$("div#share_class_result h2").html("Share your result");
	}
		
});