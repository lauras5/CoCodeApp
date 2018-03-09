 
var map;
var marker;
var mapForm;
var address;
var radius;
var type;
var newLoc;
var name;
var time;
var languages;
var message;

//do countdown for pin, how long is project
//diff between time input and now
var now = moment().format('hh:mmA')
console.log(now)
function initMap() {
    // classic map, if time set click button to toggle back from dark
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 33.6694, lng: -117.8265},
    //     zoom: 15
    // });    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6694, lng: -117.8265},
        zoom: 13,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      }); 
    // console.log(initMap)
    


$('#submitBTN').on('click', function(){
    //declare var for geocoder
    var geocoder= new google.maps.Geocoder();
    //takes input value from address field
    address = $('#address').val().trim();
    radius = '5000'
    // $('#radius').val().trim();
    type = $('#type').val().trim();
    name = $('#name').val().trim();
    time = $('#time').val().trim();
    languages = $('#languages').val().trim();
    message = $('#projInfo').val().trim();
    contentString = '<p><b>' + name + '</b> Working with : '+ languages +'</b> ' +
    'About this project : ' + message + ' ' +
    'They will be working until ' + time + ' ' +
    'If you would like to collaborate, click the button below.</p>' +
    // '<p><b>' + minutesUntil + '</b></p>' +
    '<button id="messanger">Contact Me About This Project!</button>';
    
    geocoder.geocode( {'address': address}, function(results, status) {
        //if status is ok enable set marker function
        if (status == 'OK') {
            // console.log(results)
            map.setCenter(results[0].geometry.location);
            map.addListener('click', function(e) {
                placeMarker(e.latLng, map)
              });

              var infowindow = new google.maps.InfoWindow({
                content: contentString
              });

              //drop marker on click, draggable
            function placeMarker(position, map) {
                // sets marker on click
                var marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    position: position,
                    animation: google.maps.Animation.DROP,
                    title: message
                });  

                map.panTo(position);
                marker.addListener('click', toggleBounce);

                marker.addListener('click', function() {
                  infowindow.open(map, marker);
                });

                //set toggle to toggle when user iputs info and creates 'beacon'
                function toggleBounce() {
                    console.log(marker)
                    //   if (marker.getAnimation() !== null) {
                    //       marker.setAnimation(null);
                    //   } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    //   }
                };
            };

              


            newLoc = results[0].geometry.location;
            var GMurl = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + newLoc + '&radius=' + radius + '&keyword=' + type + '&key=AIzaSyAOASDIikd8pGiO3vLaVh4bhuhpOr3ZAQY' 
            // console.log(GMurl);
            var newUrl = GMurl.replace(/[()]/g, '');
            var newUrl2 = newUrl.replace(/\s+/g, '')
            console.log(newUrl2)
            // //marker variable
            $.ajax({
                url : newUrl2,
                method : 'GET'
            }).then(function(obj) {
                console.log(obj)
                console.log(obj.results[0])
                //create for loop, create custom marker for all places in range of search, create array of restaurants and drop in carousel.
                });
        //if status not ok, it will alert status
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        };
        //end if.else statement for on-click
    });
});

};

//push recent searches
//push
// Firebase API
// var config = {
//     apiKey: "AIzaSyASO4tmmjaJcfkcuLkSWDnpW1yO0h7rLoE",
//     authDomain: "group-proj-1-1520270896169.firebaseapp.com",
//     databaseURL: "https://group-proj-1-1520270896169.firebaseio.com",
//     projectId: "group-proj-1-1520270896169",
//     storageBucket: "",
//     messagingSenderId: "185013817151"
//   };

//   firebase.initializeApp(config);

