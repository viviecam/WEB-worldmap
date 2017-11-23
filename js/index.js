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


// AUTOCOMPLETION
var placeSearch, autocomplete;
      var componentForm = {
        country: 'long_name',
      };

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
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }
