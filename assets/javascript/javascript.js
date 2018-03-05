 
var map;
var marker;
var mapForm;
var address;



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6694, lng: -117.8265},
        zoom: 10
    });     
    // console.log(initMap)
}



$('#submitBTN').on('click', function(){
    //declare var for geocoder
    var geocoder= new google.maps.Geocoder();
    //takes input value from address field
    address = $('#address').val();
    geocoder.geocode( { 'address': address}, function(results, status) {
        //if status is ok, if will set marker on location
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            //marker variable
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                zoom: 15
            });
        //if status not ok, it will alert status
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
})

// Firebase API
var config = {
    apiKey: "AIzaSyASO4tmmjaJcfkcuLkSWDnpW1yO0h7rLoE",
    authDomain: "group-proj-1-1520270896169.firebaseapp.com",
    databaseURL: "https://group-proj-1-1520270896169.firebaseio.com",
    projectId: "group-proj-1-1520270896169",
    storageBucket: "",
    messagingSenderId: "185013817151"
  };

  firebase.initializeApp(config);

