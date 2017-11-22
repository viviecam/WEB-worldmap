$(document).ready(function(){

	function request(alpha){
		// var url = "https://restcountries.eu/rest/v2/all";
		var url = "https://restcountries.eu/rest/v2/alpha?codes=" + alpha;
		$.getJSON(url, function(data){
			console.log(data[0].translations.fr);
		});
	}

	$('path').click(function(){
		var alpha = $(this).attr( "class" );
		request(alpha);
	});
});