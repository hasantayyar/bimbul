var BASE_MAP_URL = "https://maps.google.com/maps/api/geocode/json?sensor=true&latlng=";

var ADMIN_POLITICAL = "administrative_area_level_1"
,   LOCALITY = "locality"
,   SUBLOCALITY = "sublocality_level_1"
,   SUBLOCALITY_2 = "sublocality_level_2";
 
  function getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var SEARCH_URL = (
          BASE_MAP_URL + 
          position.coords.latitude + 
          "," + 
          position.coords.longitude
        );

        $.get(SEARCH_URL, function(data) {
          var results = data.results;
          var address = {};
          for (var i = 0; i < results.length; i++) {
            var addressComponents = results[i].address_components;
            for (var j = 0; j < addressComponents.length; j++) {
              var component = addressComponents[j];
              if (component.types.indexOf(ADMIN_POLITICAL) != -1) {
                address.political = component.long_name;
              }
              if (component.types.indexOf(LOCALITY) != -1) {
                address.locality = component.long_name;
              }
              if (component.types.indexOf(SUBLOCALITY) != -1) {
                address.sublocality = component.long_name;
              }
              if (component.types.indexOf(SUBLOCALITY_2) != -1) {
                address.sublocality_2 = component.long_name;
              }
            }
          }

          var localAddress = $.map([
            address.political,
            address.locality,
            address.sublocality,
            address.sublocality_2
          ], function (v) {
            if (v !== undefined) { return v; }
          }).join(",");
 

            map = new GMaps({
              div: '#map',
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            

             $.post("/near", {
               llat: position.coords.latitude,
              llong: position.coords.longitude,
             }).done(function (data) {
                $.each(data, function( index, point ) {
                   map.addMarker({
                    lat: point.loc.lat,
                    lng: point.loc.lng
                  }); 
                });
             });
            map.addMarker({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }); 

          $("#message").text(localAddress); 
        }, "json");
      }, 
      function(err) {
        if (err.code == error.PERMISSION_DENIED) {
          alert("Error while getting location : PERMISSION_DENIED");
        }
        else if (err.code == error.POSITION_UNAVAILABLE) {
          alert("Error while getting location : POSITION_UNAVAILABLE");
        }
        else if(err.code == error.PERMISSION_DENIED_TIMEOUT) {
          alert("Error while getting location : PERMISSION_DENIED_TIMEOUT");
        }
      });
    }
    else {
      alert("Error while getting location");
    }
  }
$(document).ready(function () {
  $("#getgeo").click(function () {
    getGeoLocation();
  });
});
