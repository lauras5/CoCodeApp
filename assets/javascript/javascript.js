 
var map;
var marker;
var mapForm;
var address;
var radius;
var type;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.6694, lng: -117.8265},
        zoom: 15
    });     
    // console.log(initMap)
}

$('#submitBTN').on('click', function(){
    //declare var for geocoder
    var geocoder= new google.maps.Geocoder();
    //takes input value from address field
    address = $('#address').val();
    radius = $('#radius').val()
    type = $('#type').val()
    
    geocoder.geocode( { 'address': address}, function(results, status) {
        //if status is ok, if will set marker on location
        if (status == 'OK') {
            console.log(results)
            map.setCenter(results[0].geometry.location);
            var newLoc = results[0].geometry.location;
            console.log(newLoc)


            //need to get rid of parenthesis on newLoc
            var GMurl = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + newLoc + '&radius=' + radius + '&type=' + type + '&key=AIzaSyAOASDIikd8pGiO3vLaVh4bhuhpOr3ZAQY' 
            console.log(GMurl);
            var newUrl = GMurl.replace(/[()]/g, '');
            var newUrl2 = newUrl.replace(/\s+/g, '')
            console.log(newUrl2)
            //marker variable
            $.ajax({
                url : newUrl2,
                method : 'GET'
            }).then(function(response) {
                console.log(response)
                console.log(response[0].object.geometry)
                for ( var i = 0; i < response.length; i++) {
                    var marker = new google.maps.Marker({
                        map: map,
                        position: response[i].geometry.location,
                        
                    })
                    console.log(response[i].geometry.location)
                };
            })

        //if status not ok, it will alert status
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
})


//push recent searches
//push
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

