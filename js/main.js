$(document).foundation();

function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(23.755408, 90.366498),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        	var image = '../images/map-pin.png';
  			var myLatLng = new google.maps.LatLng(23.755408, 90.366498);
  			var beachMarker = new google.maps.Marker({
      		position: myLatLng,
      		map: map,
      		icon: image
 		 });

  			map.set('styles', [
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
      { visibility: "off" }
    ]
  }
]);
              }
      google.maps.event.addDomListener(window, 'load', initialize);
$('.team-pic').hover(function(){
    console.log("Hovered!");
    $(this).children(".overlay").css("background-color","rgba(0,0,0,0.6)");
    $(this).children("h5").show("easeIn").slideDown;
},
    function() {
         $(this).children(".overlay").css("background-color","rgba(0,0,0,0)");
        $(this).children("h5").hide("easOut");
    }
);
