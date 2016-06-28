var offset = [];
//offset 982 includes Idaho schools
var getOffset = (function() {
    for (s = 0; s <= 7769; s++) {
        offset.push(s);
    }
})();

var urlBase = 'http://whateverorigin.org/get?url=https://inventory.data.gov/api/action/datastore_search?offset='
var resourceID = '&resource_id=38625c3d-5388-4c16-a30f-d105432553a4&callback=?';

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

                //Excludes smaller institutions
                size = Number(d.records[i].INSTSIZE);
                if (size <= 2) {
                    continue
                };

                console.log(name);

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
    var contentString = '<h2>' + name + '</h2>' +
        '<p>' + address + '<br>' + city + ',' + ' ' + state + ' ' + zip + '</p>' +
        '<p><a href="http://' + website + '" target="_blank">' + website + '</a></p>';


    marker.addListener('click', function() {
        if (infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
        infowindow.setPosition(this.position);
    });
}
// Testing the addMarker function
function ColMarker() {
    addMarker(map);
}