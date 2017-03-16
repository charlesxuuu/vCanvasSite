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
      center: {lat: 49.283500, lng: -123.107498},
        zoom: 21,
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
      {lat: 49.283477, lng: -123.107509}, // p00 center -.000033 +.000011 
      {lat: 49.283484, lng: -123.107547},  // p01 center -.000026 +.000049
      {lat: 49.283507, lng: -123.107572},  // FAKE MARKER -.000005 +.000000
      {lat: 49.283502, lng: -123.107549},  //             +.000002 +.000051     
      {lat: 49.283498, lng: -123.107511},  //      -.000002 +.000013
      {lat: 49.283514, lng: -123.107602},  //    +.000014 +.000104
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
        map.setZoom(21);
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
