var iso;


$(document).ready(function(){

	//Evènement au clic sur un pays de la carte
	$('path').click(function(){
		var iso = $(this).attr( "id" );
		requestDetails(iso);
	});

	//Evènement au clic sur un pays de la carte
	$('button#rechercher').click(function(){
		console.log(iso);
		requestDetails(iso);
		//$('svg').find('path #'+iso).addClass( "modalcolor" );
		// console.log($('svg').find('path #'+iso));
	});

});

/* Code nécessaire au cas d'utilisation : barre de recherche */

// AUTOCOMPLETION : code Google 
var placeSearch, autocomplete;
var componentForm = {
	country: 'long_name',
};
var nomPays;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {types: ['geocode']});
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	var place = autocomplete.getPlace();
	for (var component in componentForm) {
	    document.getElementById(component).value = '';
	    document.getElementById(component).disabled = false;
	}

	for (var i = 0; i < place.address_components.length; i++) {
	    var addressType = place.address_components[i].types[0];
	    if (componentForm[addressType]) {
	        nomPays = place.address_components[i][componentForm[addressType]];
	        //On  recupère le nom du pays en fonction de la recherche effectuée
	        document.getElementById(addressType).value = nomPays;
	        requestISO(nomPays);
	    }
	}
	// var codeISO = nameToIsoCode(nomPays);
	// console.log(codeISO);
}


//Requête vers OpenCageData en envoyant le nomPays
function requestISO(nomPays) {
	var urlPaysIso = "https://api.opencagedata.com/geocode/v1/json?q="+nomPays+"&key=3cb5d4185cb14bbc93797e291549a2c7&language=fr&pretty=1";
	$.getJSON(urlPaysIso, function(data){
		iso = data.results[0].components.country_code;
		// requestDetails(iso);

	});
}


/* Code nécessaire au cas d'utilisation : géolocalisation */


/* Code nécessaire aux 3 cas d'utilisation*/

//Requête vers RestCountries en envoyant le code ISO
function requestDetails(iso){
	// var url = "https://restcountries.eu/rest/v2/all";
	var urlIsoDetails = "https://restcountries.eu/rest/v2/alpha?codes=" + iso;
	$.getJSON(urlIsoDetails, function(data){
		// console.log(data[0].translations.fr);
		$('.modal-title').html(data[0].translations.fr);
		var urlImg = data[0].flag;
		$('.modal-body img').attr("src", urlImg);
	});
}