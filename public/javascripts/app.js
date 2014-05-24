$(document).ready(function(){
	

function displayError(){}
			function displayPosition(position) {
			  $.post("/",{lat:position.coords.latitude,lon:position.coords.longitude},
			  	function(data){
			  		dataObj = JSON.parse(data);
			  		console.log(dataObj);
                                        desc = dataObj.weather[0].description;
                                        if(desc.search('rain')>0){
                                            $("body").addClass('hell');$("h1").addClass('hell');
                                            $("h1").html("Hell Yes!"); 
                                        }else{
                                            $("body").addClass('well');$("h1").addClass('well');
                                            $("h1").html("No!"); 
                                        }
                                        $("#desc").html(desc); 
			  	})
			}

	if (navigator.geolocation) {
			  var timeoutVal = 10 * 1000 * 1000;
			  navigator.geolocation.getCurrentPosition(
			    displayPosition, 
			    displayError,
			    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
			  );
			}
			else {
			  alert("Geolocation is not supported by this browser");
			}
});

