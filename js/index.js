var iso;


$(document).ready(function(){

	$('#geoloc > div').hide();

	//Evènement au clic sur un pays de la carte
	$('path').click(function(){
		var iso = $(this).attr( "id" );
		requestDetails(iso);
	});

	//Evènement sur bouton rechercher ou bouton detail Geoloc
	$('button#rechercher, button#geolocDetails').click(function(){
		console.log(iso);
		requestDetails(iso);
		//$('svg').find('path #'+iso).addClass( "modalcolor" );
		// console.log($('svg').find('path #'+iso));
	});

	//Evenement au chargement de la page, demande à l'utilisateur de partager sa localisation
	if (navigator.geolocation)
	{
	    navigator.geolocation.getCurrentPosition(function(position)
	    {
	    	var latitude = position.coords.latitude;
	    	var longitude = position.coords.longitude;
	    	// console.log("Longitude = "+longitude+ " Latitude = "+latitude);
			requestISO2(latitude, longitude);
	    });
	}
	else
    alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");


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
//Requête vers OpenCageData en envoyant la longitude et la latitude
function requestISO2(latitude, longitude) {
	var urlLatLongISO = "https://api.opencagedata.com/geocode/v1/json?q="+ latitude +"%2C%20"+longitude+"&key=3cb5d4185cb14bbc93797e291549a2c7&language=fr&pretty=1";
	// console.log(urlLatLongISO);
	$.getJSON(urlLatLongISO, function(data){
		console.log(data);
		// console.log(data.results[0].components.country_code);
		iso = data.results[0].components.country_code;
		console.log(iso);
		$("#geoloc label").append(data.results["0"].components.city+", "+data.results[0].components.country);
		$("#geoloc > div").show();	
	});
}


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
		//Penser à rajouter : data-toggle="modal" data-target="#detailsModal" dans l'objet déclencheur
	});
}