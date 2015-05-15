$(document).foundation();

$('.team-pic').hover(function(){
    $(this).children(".overlay").css("background-color","rgba(0,0,0,0.6)");
    $(this).children("h5").show("easeIn").slideDown;
},
    function() {
         $(this).children(".overlay").css("background-color","rgba(0,0,0,0)");
        $(this).children("h5").hide("easOut");
    }
);
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

(function() {
  var body = document.getElementsByClassName('overlay2')[0];
  var burgerContain = document.getElementsByClassName('burger-contain')[0];
  var burgerNav = document.getElementsByClassName('burger-nav')[0];
  var burgerBrand = document.getElementsByClassName('burger-brand')[0];

  burgerContain.addEventListener('click', function toggleClasses() {
    $("body").toggleClass("body-scrolling");
    $(".burger-nav").delay(1000).toggleClass("hide");
    $(body).delay(2000).toggleClass("open");
    $(burgerContain).toggleClass("open");
    $(burgerBrand).toggleClass("open");
    $(burgerNav).toggleClass("open");
    
}
    , false);
})();




$('.strate').hover(function(){
   
    $(".strategy").show();    
}, function() {
    $(".strategy").hide();
});


 
 
 