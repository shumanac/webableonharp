
//--typed.js--


$(document).ready(function(){ 



$(function(){
      $(".element").typed({
        strings: ["Hi Murwe Hi Murwe Hi Murwe "],
        typeSpeed: 0
      });
  });





setTimeout(function() {
    $(".typed-text").remove();
}, 5000)



//--particle slider 


setTimeout(function() {
    $("#particle-slider").css('position', 'absolute');
}, 3999.9)




//--star animation

var canvas = document.getElementById("maincanvas");
var ctx = canvas.getContext("2d");
var stars = [];
var colours = ["white"];

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var centre = new Vector2(canvas.width / 2, canvas.height / 2);

//In terms of canvas width to look consistent on different resolutions
var spawnWidth = canvas.width / 2;
var spawnHeight = canvas.height / 2;

//Star properties
var maxStars = 50;
var spawnRadius = 0.1;
var sizeIncreaseFactor = 0.004;

function loop() {
    clear();
    update();
    draw();
    requestAnimationFrame(loop);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
    }
}

function draw() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
}

function populateStarField() {
    for (var i = 0; i < maxStars; i++) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        stars.push(new star(new Vector2(x, y), getVelocity(new Vector2(x, y), centre), new Vector2(), spawnRadius, getRandomColour()));
    }
}

function getRandomColour() {
    return colours[Math.floor(Math.random() * colours.length)];
}

function addStar() {
    var x = centre.x + Math.floor(Math.random() * spawnWidth) - (spawnWidth / 2);
    var y = centre.y + Math.floor(Math.random() * spawnHeight) - (spawnHeight / 2);
    var velocity = getVelocity(new Vector2(x, y), centre);
    stars.push(new star(new Vector2(x, y), velocity, new Vector2((velocity.x / 30), (velocity.y / 30)), spawnRadius, getRandomColour()));
}

function getVelocity(location, centre) {
    var velocity = new Vector2();

    var distance = getDistanceBetween(location, centre, true);
    var scaledXDist = distance.x / (centre.x);
    var scaledYDist = distance.y / (centre.y);

    velocity.x = scaledXDist * 8;
    velocity.y = scaledYDist * 6;

    if (location.x < centre.x) {
        velocity.x = -velocity.x;
    }
    if (location.y < centre.y) {
        velocity.y = -velocity.y;
    }
    return velocity;
}

function getDistanceBetween(vector1, vector2, vectorOut) {
    var dx = Math.abs(vector1.x - vector2.x);
    var dy = Math.abs(vector1.y - vector2.y);
    if (!vectorOut) {
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    } else {
        return new Vector2(dx, dy);
    }
}

function star(location, velocity, acceleration, radius, colour) {
    this.location = location || new Vector2();
    this.velocity = velocity || new Vector2();
    this.acceleration = acceleration || new Vector2();
    this.radius = radius || 1;
    this.startRadius = radius;
    this.colour = colour || "#EEE";
}
star.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
}
star.prototype.update = function() {
    this.move();

    //Increase size to give appearance of moving closer
    this.radius = this.startRadius + (getDistanceBetween(this.location, centre, false) * sizeIncreaseFactor);

    //Remove if out of bounds, replace with new
    if (this.location.x < 0 ||
        this.location.x > canvas.width ||
        this.location.y < 0 ||
        this.location.y > canvas.height) {
        var index = stars.indexOf(this);
        if (index > -1) {
            stars.splice(index, 1);
            addStar();
        }
    }
}
star.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.arc(this.location.x, this.location.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
}

function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Vector2.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
}
Vector2.prototype.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
}
populateStarField();
requestAnimationFrame(loop);



// -------------------------particle logo---------------------------------

var init = function() {
    var isMobile = navigator.userAgent &&
        navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
    var isSmall = window.innerWidth < 1000;

    var ps = new ParticleSlider({
        ptlGap: isMobile || isSmall ? 1 : 0,
        ptlSize: isMobile || isSmall ? 1 : 1,
        width: 1e9,
        height: 1e9
    });


    (window.addEventListener ? window.addEventListener('click', function() {
        ps.init(true)
    }, false) : window.onclick = function() {
        ps.init(true)
    });
}

var initParticleSlider = function() {
    var psScript = document.createElement('script');
    (psScript.addEventListener ? psScript.addEventListener('load', init, false) : psScript.onload = init);
    psScript.src = '/js/function.js';
    psScript.setAttribute('type', 'text/javascript');
    document.body.appendChild(psScript);
}

(window.addEventListener ? window.addEventListener('load', initParticleSlider, false) : window.onload = initParticleSlider);
}) 