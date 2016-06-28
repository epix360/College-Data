//Creates and sets default view of map
var map;
var coord;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(33.912149, -98.493440),
        zoom:4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    latLng = map.center;
}

//Resets view of map from ZIP code entered
$('#zipBtn').click(function() {

    map.setZoom(12);

    var zip = $('#zipcode').val();

    getCoord(zip, function(coordData) {
        map.setCenter(coordData);
        document.getElementById("output").innerHTML = coordData.city + ',' + ' ' + coordData.state;
    });

    //Gets coordinates of zip code entered by user
    function getCoord(zip, callback) {
        var urlBase = 'https://api.zippopotam.us/us/';
        var url = urlBase + zip;

        $.get(url, function(data, status) {

            var place = data.places[0];

            callback({
                lat: Number(place['latitude']),
                lng: Number(place['longitude']),
                city: place['place name'],
                state: place['state']
            });
        });
    }
});

