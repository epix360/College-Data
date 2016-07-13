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

var offset = [];
var getOffset = (function() {
    for (s = 0; s <= 7769; s++) {
        offset.push(s);
    }
})();

var urlBase = 'https://inventory.data.gov/api/action/datastore_search?offset='
var resourceID = '&resource_id=38625c3d-5388-4c16-a30f-d105432553a4';

var urlArray = [];
for (u = 0; u <= 7769; u++) {
    urlS = urlBase + offset[u] + resourceID;
    urlArray.push(urlS);
}

var url;
for (r = 0; r <= 7769; r+=100) {
    url = urlArray[r]; 

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
                if (size <= 1) {
                    continue
                };

                //console.log(name);
                
                ColMarker();
            }
        });
    });
}

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


