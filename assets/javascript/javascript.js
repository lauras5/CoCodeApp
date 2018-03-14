 
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
var markerNum = 0;

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

    $('#submitBTN').on('click', function(){
        //declare var for geocoder
        var geocoder= new google.maps.Geocoder();
        //takes input value from address field
        address = $('#address').val().trim();
        radius = '5000'
        type = 'starbucks|panera|mcdonalds|barnesandnoble|arbys|applebees|brewsterscoffee|cariboucoffee|chickfila|cornerbakery|dunkindonuts|ihop|burgerking|leessandwiches|peetscoffee|tullyscoffee|wendys'
        // $('#type').val().trim();
        name = $('#name').val().trim();
        time = $('#time').val().trim();
        languages = $('#languages').val().trim();
        message = $('#projInfo').val().trim();
        contentString = '<p><b>' + name + '</b></p>'+
        '<p>Working with :<b> '+ languages +'</b></p> ' +
        '<p>About this project : <b>' + message + '</b></p> ' +
        '<p>They will be working until ' + time + '</p> ' +
        '<p>If you would like to collaborate, click the button below.</p>' +
        //create minutes until it is deleted
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
                        title: name
                    });  

                    markerNum++
                    console.log(markerNum)
                    
                    //pans to center of position
                    map.panTo(position);
                    //add listeners for toggle and window function
                    marker.addListener('click', toggleBounce);
                    marker.addListener('click', function() {
                      infowindow.open(map, marker);
                    });

                    //set toggle to toggle when user iputs info and creates 'beacon'
                    function toggleBounce() {
                        //if marker is set to Bounce, set to null, if set to null, bounce
                        if (marker.getAnimation() !== null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    };  
                };

                if (markerNum === 1) {
                  console.log('hello')
                }

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
                }).then(function(object) {
                    console.log(object)
                    var listView = $('<div id="lists">Nearby Locations : </div>')
                    $('#list').append(listView)
                    var resultsLength = object.results.length 
                    for (var i = 0; i < resultsLength; i++) {
                      var icon = object.results[i].icon
                      var objName = $('<div id="obj"><img src="' + icon + '"> ' + object.results[i].name + '</div><br>')
                      $('#lists').append(objName)
                      console.log(objName)
                      
                      //returns undefined, ask Quinton on Sat
                      // var objLocation = object.results[i].geometry.location
                      // console.log(objlocation)
                      //place icon on location instead of marker
                    } 
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

