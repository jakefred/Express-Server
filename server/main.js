$(document).ready(function () {
    // load all of the top spots from data.json to the table
    $.getJSON('/data', function (spots) {
        spots.forEach(function (spot) {
            var mapsUrl = 'https://www.google.com/maps?q=' +
                spot.location[0] + ',' + spot.location[1];

            var row = $('<tr>');
            row.append($('<td>').text(spot.name));
            row.append($('<td>').text(spot.description));
            row.append(
                $('<td>').append(
                    $('<a>').attr('href', mapsUrl).text('Open in Google Maps')
                )
            );

            $('table').append(row);
        });
    });
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.7157, lng: -117.1611 },
        zoom: 10,
        mapId: 'DEMO_MAP_ID'
    });

    // One popup shared by all the pins, limits the whole window to a specific size
    var infoWindow = new google.maps.InfoWindow({maxWidth: 350});

    $.getJSON('/data', function (spots) {
        var bounds = new google.maps.LatLngBounds();
        
        // loops each spot
        spots.forEach(function (spot) {
            var position = {
                lat: spot.location[0],
                lng: spot.location[1]
            };

            // Create a pin for this spot
            var marker = new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: position,
                title: spot.name,
                gmpClickable: true
            });

            // Open the popup when this pin is clicked
            marker.addEventListener('gmp-click', function () {
                var content = document.createElement('div');
                content.className = 'popup';

                var heading = document.createElement('h3');
                heading.textContent = spot.name;
                heading.className = 'popup-name';

                var description = document.createElement('p');
                description.textContent = spot.description;
                description.className = 'popup-description'

                infoWindow.setHeaderContent(heading);
                content.append(description);
                infoWindow.setContent(content);
                infoWindow.open({
                    map: map,
                    anchor: marker
                });
            });

            // extends the bounds for each position
            bounds.extend(position);
        });

        // Adjust the view to include every pin
        if (spots.length > 0) {
            map.fitBounds(bounds);
        }
    });
}