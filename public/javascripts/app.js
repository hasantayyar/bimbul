$(document).ready(function(){
	$('.mood button').click(function(){
		var mood = $(this).html();
		document.location.href = '/rand/'+mood;
		if(typeof ga !== "undefined"){
			ga('send', 'event', 'mood', 'click_mainpage', encodeURIComponent(mood)); 
		}
	});


$('#randagain').click(function(){
		var mood = $(this).attr("rel");
		document.location.href = '/rand/'+mood;
		if(typeof ga !== "undefined"){
			ga('send', 'event', 'mood', 'click_songpage', encodeURIComponent(mood)); 
		}
	});
	 
})
