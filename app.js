    
    
    var crime = [];

    getCrimeData(crime, function(crimeData) {
        
        document.getElementById("output").innerHTML = crimeData;
        console.log(crimeData);
    });

    function getCrimeData(crimeData, callback) {
    var url = 'https://citizenrequests.herokuapp.com';
  //var url = urlBase + '?enddate=9%2F25%2F2015&lat=37.757815&long=-122.5076392&startdate=9%2F19%2F2015';


    $.get(url, function(data, status) {

				callback({
					description: description,
					location: location
                    
				});
			});
    }

    $.ajax({
    url: 'https://citizenrequests.herokuapp.com', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) { console.dir((data.source)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "99JoNhu73zmshRpWUWHcnzOOeQ1Yp1uBqSEjsnNIFd8ggNzW47"); // Enter here your Mashape key
    }
});

//Creates and sets default view of map
var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(39.828151, -98.579512),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
    latLng = map.center;
    //Shows coordinates of center in HTML
document.getElementById("output").innerHTML = latLng;
    } 

(function() {
    $('#zipBtn').click(function() {
    
    map.setZoom(12);

    var zip = $('#zipcode').val();

    getCoord(zip, function(coordData) {
        map.setCenter(coordData); 
        document.getElementById("output").innerHTML = map.center;
        TestMarker();
      // Function for adding a marker to the page.
    function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Testing the addMarker function
    function TestMarker() {
           center = map.center;
           addMarker(center);
    }        
		});

        getCityData(zip, function(cityData) {
       
        document.getElementById("city-data").innerHTML = zips.city;
        TestMarker();       
		});
    
    //Gets coordinates of zip code entered by user
function getCoord(zip, callback) {
    var urlBase = 'http://api.zippopotam.us/us/';
    var url = urlBase + zip;

    $.get(url, function(data, status) {

				var place = data.places[0];

				callback({
					lat: Number(place['latitude']),
					lng: Number(place['longitude'])
                    
				});
			});
    }

    function getCityData(zip, callback) {
    var urlBase = "http://zipfeeder.us/zip?key=thXpN5j-&zips=";
    var url = urlBase + zip;

    $.get(url, function(data, status) {

				var place = data.places[0];

				callback({
					cit: (place['city']),
                    met: cbsa_name
                    
				});
                console.log(getCityData);
			});
            
    }

    });
   /* var app = angular.module('ngCrime', []);

    app.controller('crimeController', ['guidService', function(locationService, guidService) {

        var crime = this;

        crime.location = [];
        crime.newEntry = {
            description: '',
            datetime: '',
            location: ''
    }

        crime.addStory = function() {
            guidService.getGuid().then(
                function (guid) {
                var newEntry = angular.copy(crime.newEntry);

                
                crime.zipCode.description = '';
                crime.zipCode.datetime = '';
                crime.zipCode.location = '';
                }
            );    
        };


    }]);
*/
})();







    