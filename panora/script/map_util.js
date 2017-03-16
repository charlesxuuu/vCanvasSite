/**
*   The function is provided by Google Map Api
**/     
function initMap() {
    // Create an array of styles.
    var styles = [
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
        ]
      }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = { //add here
        center: {lat: 0.0, lng:0.0},
        zoom: 20,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    var map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    //Markers
    var myLatLngArray = [ //add here
      {lat: 0.0, lng: 0.0}, 
      {lat: -10.0, lng: 0}, 
      {lat: -10.0, lng: 10.28587}, 
      {lat: 0, lng: 10}, 
      {lat: 10, lng: 10}, 
      {lat: -20, lng: 10}, 
    ];
    for ( var i=0; i < myLatLngArray.length; i++){
        var myLatLng = myLatLngArray[i];
        newmarker(map,myLatLng,i);
    }

    //Polylines
    var lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var tourPath = new google.maps.Polyline({
        path: myLatLngArray,
        icons: [ //add here
        {
        icon: lineSymbol,
        offset: '14%'
        },
        {
        icon: lineSymbol,
        offset: '28%'
        },
        {
        icon: lineSymbol,
        offset: '42%'
        },
        {
        icon: lineSymbol,
        offset: '57%'
        },
        {
        icon: lineSymbol,
        offset: '71%'
        },
        {
        icon: lineSymbol,
        offset: '85%'
        },
        ],
        geodesic: true,
        strokeColor: '#808080',
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    tourPath.setMap(map);
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
        switch(index_i){ //add here
        case 0:
        window.location.replace('pano0.html');
        break;
        case 1:
        window.location.replace('pano1.html');
        break;
        case 2:
        window.location.replace('pano2.html');
        break;
        case 3:
        window.location.replace('pano3.html');
        break;
        case 4:
        window.location.replace('pano4.html');
        break;
        case 5:
        window.location.replace('pano5.html');
        break;
        }
      });
}