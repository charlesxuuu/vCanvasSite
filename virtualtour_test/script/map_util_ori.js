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
    var mapOptions = {
      center: {lat: 49.276895, lng: -122.914783},
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
    var myLatLngArray = [ 
      {lat: 49.276862, lng: -122.914794}, // panorama 00
      {lat: 49.276869, lng: -122.914832},  // panorama 01
      {lat: 49.276890, lng: -122.914783},  // FAKE MARKER
      {lat: 49.276897, lng: -122.914834},
      {lat: 49.276893, lng: -122.914796},
      {lat: 49.276909, lng: -122.914887},
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
        icons: [{
        icon: lineSymbol,
        offset: '100%'
        },
        {
        icon: lineSymbol,
        offset: '20%'
        },
        {
        icon: lineSymbol,
        offset: '40%'
        },
        {
        icon: lineSymbol,
        offset: '60%'
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
        switch(index_i){
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