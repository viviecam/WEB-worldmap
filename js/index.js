$(document).ready(function(){

	function request(alpha){
		// var url = "https://restcountries.eu/rest/v2/all";
		var url = "https://restcountries.eu/rest/v2/alpha?codes=" + alpha;
		$.getJSON(url, function(data){
			// console.log(data[0].translations.fr);
			$('.modal-title').html(data[0].translations.fr);
			var urlImg = data[0].flag;
			$('.modal-body img').attr("src", urlImg);
		});
	}

	$('path').click(function(){
		var alpha = $(this).attr( "id" );
		request(alpha);
	});
});