function initMap() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);

    // initialize a new Google Map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myLatlng,
      zoom: 16
    });

    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Fullstack Academy"
    });

    marker.setMap(map);
}

$(document).ready(function() {
    initMap();
});
