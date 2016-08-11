$(window).load(function(){
        $('#instModal').modal('show');
    });

//Creates and sets default view of map
var map;
var coord;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(38.1, -97.156168),
        zoom:5,
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

function getStore() {

    var storeValues = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        storeValues.push( localStorage.getItem(keys[i]) );
    }
$('#favs-list').html(storeValues);
$('#favs-list .favs').replaceWith('<button id="' + p + '" type="button" class="rmv-favs btn btn-danger" onclick="removeFavorite()"><i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Remove from Favorites</button></div>');  
}

if (localStorage.length > 0) {
    storageLength = localStorage.length;
$('.favs-btn').html('Favorites' + ' ' + '(' + storageLength + ')');
}
else {$('.favs-btn').html('Favorites');}

updateFavsNum = function() {
if (localStorage.length > 0) {
    storageLength = localStorage.length;
$('.favs-btn').html('Favorites' + ' ' + '(' + storageLength + ')');
}
else {$('.favs-btn').html('Favorites');}
}

getStore();

var url = 'https://cors-anywhere.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/college-finder-52e6d.appspot.com/o/directory.json?alt=media&token=ff497616-95cd-4468-b01b-ce336d13f1c8';

    var getSchools = $.getJSON(url, function(data) {

        /* loop through array */
        getCoord = $.each(data, function(index, d) {

            if (!d.records) return;

            for (i = 0; i < d.records.length; i++) {

                Lat = Number(d.records[i].LATITUDE);
                Lng = Number(d.records[i].LONGITUD);
                name = d.records[i].INSTNM;
                address = d.records[i].ADDR;
                city = d.records[i].CITY;
                state = d.records[i].STABBR;
                zip = d.records[i].ZIP;
                website = d.records[i].WEBADDR;
                phone = d.records[i].GENTELE;
                apply = d.records[i].APPLURL;

                //Excludes smaller institutions
                size = Number(d.records[i].INSTSIZE);

                //console.log(name);
                
                ColMarker();
            }
        });
    });

var infowindow;

function addMarker(LatLng) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(Lat, Lng),
       icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4,
            strokeWeight: 1,
            fillOpacity:1,
            fillColor: 'red'
          },
        map: map
    });

//var addBtn = '<button type="button" class="favs btn btn-success" onclick="addFavorite()"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Add to Favorites</button>';
//var rmvBtn = '<button id="' + p + '" type="button" class="rmv-favs btn btn-danger" onclick="removeFavorite()"><i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Remove from Favorites</button>';

    var contentString;
    contentString = '<div class="info-window"><h2>' + name + '</h2>' +
        '<p>' + address + '<br>' + city + ',' + ' ' + state + ' ' + zip + '</p>' +
        '<p>' + phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6,4) + 
        '</p>' + '<p><a href="http://' + website + '" target="_blank">' + website + '</a></p><button type="button" class="favs btn btn-success" onclick="addFavorite()"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Add to Favorites</button></div>';

    marker.addListener('click', function() {
        if (infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
        infowindow.setPosition(this.position);

        d = new Date();
        n = d.getTime();

    });
}
var d;
var n;
var p; 

// Testing the addMarker function
function ColMarker() {
    addMarker(map);
}

var addFavorite = (function() {
    var infWinInst = '<li id="' + n + '">' + infowindow.content + '</li>'; 
        $('#favs-list').append(infWinInst);
        p = n - 1;
        $('#favs-list .favs').replaceWith('<button id="' + p + '" type="button" class="rmv-favs btn btn-danger" onclick="removeFavorite()"><i class="fa fa-minus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Remove from Favorites</button></div>');
        $('#favs-list')
        $('#map .favs').replaceWith('<button type="button" class="favs btn btn-success">Added</button></div>');
        $('#map .favs').fadeOut(1500);
        localStorage.setItem('#' + n, infWinInst);
        updateFavsNum(); 
    });

var removeFavorite = (function() {
    $("#favs-list li, .favs").click(function(evt){ 
   var targetElement = evt.target;
   localStorage.removeItem('#' + this.id);
   $(this).remove(); 
   updateFavsNum(); 
});
$('#map .favs').replaceWith('<button type="button" class="favs btn btn-success" onclick="addFavorite()"><i class="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;&nbsp;Add to Favorites</button></div>');   
});


