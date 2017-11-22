$(document).ready(function(){

	function request(alpha){
		// var url = "https://restcountries.eu/rest/v2/all";
		var url = "https://restcountries.eu/rest/v2/alpha?codes=" + alpha;
		$.getJSON(url, function(data){
			// console.log(data[0].translations.fr);
			$('.modal-title').html(data[0].translations.fr);
			console.log(data[0].flag);
			var urlImg = data[0].flag;
			$('.modal-body img').attr("src", urlImg);
			// $('.modal-body img').attr('src', data[0].flag);
		});
	}

	$('path').click(function(){
		var alpha = $(this).attr( "id" );
		request(alpha);
	});
});