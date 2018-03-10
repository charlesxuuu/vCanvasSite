/**
*   The function is provided by Google Map Api
**/     
function initMap() {

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
      center: {lat: 49.276895, lng: -122.914783},
        zoom: 15,
        mapTypeId: 'satellite'
    };

    var map = new google.maps.Map(document.getElementById('map-satellite'),
      mapOptions);


    //Markers
    var myLatLngArray = [ 
      {lat: 49.276862, lng: -122.914794}, // panorama 00
    ];
    for ( var i=0; i < myLatLngArray.length; i++){
        var myLatLng = myLatLngArray[i];
        newmarker(map,myLatLng,i);
    }
}

/**
* The function add a marker to the map
**/
function newmarker(map,myLatLng,index_i){
      var marker = new google.maps.Marker({
      position: myLatLng,
      icon: 'assets/ic_map_anim0.png',
      map: map,
      title: index_i.toString()
      });
      marker.setMap(map);
      marker.addListener('click', function() {
        map.setZoom(20);
        map.setCenter(marker.getPosition());
        switch(index_i){
        case 0:
          window.location.replace('pano0.html');
          break;
        }
      });
}