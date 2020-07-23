/*--------------Get canvas by id "game"--------------*/
var canvas = document.querySelector("#game");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 520;

/*--------------Image--------------*/
var img = new Image();
img.addEventListener("load", loadHandler, false);
img.src = "media/spriteSheet.png";

/*--------------Data--------------*/
var sprites = []; // Array of Sprites

//Score and points
var score = 0;
var points = 0;
var pointsGranted = 0;  
var result = 100; // Important for general decision-making according to math function.

//Colors
var red = 0;
var green = 0;
var blue = 0;
var bucket = {red: 0, green: 0, blue: 0};

//keyCode for controls
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;
//Boolean values to change
var moveLeft = false;
var moveRight = false;
var spaceKeyIsPressed = false;

/*--------------Object Standards--------------*/
var spriteObject = 
{
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 0,
	sourceHeight: 0,
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	vx: 0
};

var bubbleObject =
{
	sourceX: 684,
	sourceY: 118,
	sourceWidth: 218,
	sourceHeight: 142,
	x: 550,
	y: 170,
	width: 225,
	height: 145
};

/*--------------BackgroundSprite--------------*/
var background = Object.create(spriteObject);
background.sourceY = 261;
background.sourceWidth = 1024;
background.sourceHeight = 589;
background.width = 900;
background.height = 520;
sprites.push(background);

/*--------------PlayerSprite--------------*/
var player = Object.create(spriteObject);
player.x = canvas.width / 2 - 68;
player.y = canvas.height - 230;
player.sourceX = 399;
player.sourceWidth = 134;
player.sourceHeight = 245;
player.width = 126 / 1.5;
player.height = 245 / 1.5;
sprites.push(player);

/*--------------ProductBucketSprite--------------*/
var pBucket = Object.create(spriteObject);
pBucket.sourceX = 684;
pBucket.sourceY = 0;
pBucket.sourceWidth = 150;
pBucket.sourceHeight = 110;
pBucket.x = 500;
pBucket.y = canvas.height - 100;
pBucket.width = 150 / 2;
pBucket.height = 110 / 2;
sprites.push(pBucket);

/*--------------WasteBucketSprite--------------*/
var wBucket = Object.create(spriteObject);
wBucket.sourceX = 684;
wBucket.sourceY = 0;
wBucket.sourceWidth = 150;
wBucket.sourceHeight = 110;
wBucket.x = 5;
wBucket.y = canvas.height - 100;
wBucket.width = 150 / 2;
wBucket.height = 110 / 2;
sprites.push(wBucket);

var correct = Object.create(spriteObject);
correct.sourceX = 843;
correct.sourceY = 0;
correct.sourceWidth = 76;
correct.sourceHeight = 67;
correct.x = 518;
correct.y = 432;
correct.width = 76 / 2;
correct.height = 67 / 2;
sprites.push(correct);

var incorrect = Object.create(spriteObject);
incorrect.sourceX = 920;
incorrect.sourceY = 0;
incorrect.sourceWidth = 76;
incorrect.sourceHeight = 67;
incorrect.x = 23;
incorrect.y = 432;
incorrect.width = 76 / 2;
incorrect.height = 67 / 2;
sprites.push(incorrect);

/*--------------Message Bubbles--------------*/
var controlsBubble = Object.create(bubbleObject);
sprites.push(controlsBubble); 

var desiredColorBubble = Object.create(bubbleObject);
desiredColorBubble.sourceX = 902;
desiredColorBubble.x = 560;
desiredColorBubble.y = 60;
desiredColorBubble.width = 150;
desiredColorBubble.height = 100;
sprites.push(desiredColorBubble);

var yourColorBubble = Object.create(bubbleObject);
yourColorBubble.x = 140;
yourColorBubble.y = 60;
yourColorBubble.width = 150;
yourColorBubble.height = 100;
sprites.push(yourColorBubble);

/*--------------Math Work--------------*/
var doMath = function() {
	var rHigh = Math.max(bucket.red, pRed);
	var rLow = Math.min(bucket.red, pRed);
	var gHigh = Math.max(bucket.green, pGreen);
	var gLow = Math.min(bucket.green, pGreen);
	var bHigh = Math.max(bucket.blue, pBlue);
	var bLow = Math.min(bucket.blue, pBlue);

	var rDiff = rHigh - rLow;
	var gDiff = gHigh - gLow;
	var bDiff = bHigh - bLow;

	result = rDiff + gDiff + bDiff;
};

/*--------------Key Controls--------------*/
//Keycode assignments for changing boolean values
var keycodeDown = function(e){
	switch(e.keyCode)
	{
		case LEFT:
		moveLeft = true;
		break;

		case RIGHT:
		moveRight = true;
		break;

		case SPACE:
		if(!spaceKeyIsPressed)
		{
			spaceKeyIsPressed = true;
		};
	}
};
var keycodeUp = function(e){
	switch(e.keyCode)
	{
		case LEFT:
		moveLeft = false;
		break;

		case RIGHT:
		moveRight = false;
		break;

		case SPACE:
		spaceKeyIsPressed = false;
	}
};

//Listen to what the user do, and attach action to those interactions
window.addEventListener("keydown", keycodeDown, false);
window.addEventListener("keyup", keycodeUp, false);

/*--------------LoadHandler--------------*/
function loadHandler() { img.removeEventListener("load", loadHandler, false); };

/*--------------Update--------------*/
update();
function update() {

	// Requests frame updates, making the animation to start
	window.requestAnimationFrame(update, canvas); 

	// LeftAction
	if(moveLeft && !moveRight) {
		player.vx = -3;
		player.sourceX = 267;
	};
	// RightAction
	if(moveRight && ! moveLeft) {
		player.vx = 3;
		player.sourceX = 399;
	};
	// Move the Player
	player.x += player.vx;

	// Velocity to zero if no arrow key is pressed
	if(!moveLeft && !moveRight) { player.vx = 0; };

	// SpaceBar @ RedBucket
	if(player.x > 75 && player.x < 95 && spaceKeyIsPressed) {
		player.sourceX = 135;
		bucket.red += 1;
	};

	// SpaceBar @ GreenBucket
	if(player.x > 175 && player.x < 195 && spaceKeyIsPressed) {
		player.sourceX = 135;
		bucket.green += 1;
	};

	// SpaceBar @ BlueBucket
	if(player.x > 275 && player.x < 295 && spaceKeyIsPressed) {
		player.sourceX = 135;
		bucket.blue += 1;
	};
	
	// SpaceBar @ WasteBucket
	if(player.x < 60 && spaceKeyIsPressed) {
		player.sourceX = 0;
		bucket.red = 0;
		bucket.green = 0;
		bucket.blue = 0;
		score -= 1;
	};

	// Standardize player sprite when not delivering color
	if(player.x > 460 && !spaceKeyIsPressed) {
		player.sourceX = 399;
	};

	// Limits the bucket colors to 255 each
	if(bucket.red >= 255) { bucket.red = 255 };
	if(bucket.green >= 255) { bucket.green = 255 };
	if(bucket.blue >= 255) { bucket.blue = 255 };

	// Border breach
	if(player.x < 10) { player.x = 10; };
	if(player.x > 492) { player.x = 490; };

	// Ignitiate rendering, drawing everything onto canvas
	render();
};

/*--------------Render--------------*/
function render() {
	// clears frame continuously
	ctx.clearRect(0, 0, canvas.width, canvas.height); 

	if(sprites.length !== 0)
	{
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			ctx.drawImage (
				img,
				sprite.sourceX, sprite.sourceY,
				sprite.sourceWidth, sprite.sourceHeight,
				sprite.x, sprite.y,
				sprite.width, sprite.height);
		};
	};

	// Create and show customer's bucket color and player's bucket color
	cBucket();
	product(pRed, pGreen, pBlue);

	//Text to show on canvas
    ctx.font = "normal bold 17px Helvetica";
	ctx.fillText("Score: " + score, canvas.width - 100,50);
	if(score < 250) {
		if(score < 75 || score > 150) {
			ctx.fillText("Red: " + pRed, 500, 40);};
		if(score < 200) {	
		ctx.fillText("Green: " + pGreen, 500, 60);};
		if(score < 150 || score > 200) {
		ctx.fillText("Blue: " + pBlue, 500, 80);};
		};
	colorBoxText("Red: " + bucket.red, 350, 40);
	colorBoxText("Green: " + bucket.green, 350, 60);
	colorBoxText("Blue: " + bucket.blue, 350, 80);
	infoText("Aim for this color.", 635, 100, 130, "center", 25);

	// Show points granted if any.
	if(points > 0) { pointsText("+" + points, canvas.width - 100, 75); };
	
	// Show introductory text until score reaches above 50
	if(score < 10) {
		infoText("Use your keyboard controls to move around, and [spacebar] to fill/empty your bucket.", 660, 210, 160, "center", 25);
		infoText("The color in your bucket.", 215, 100, 130, "center", 25);
		} else if(score <= 50) {
		infoText("Great job student! I've got another challenge for you!", 660, 210, 160, "center", 25);
		var index = sprites.indexOf(yourColorBubble);
		if (index > -1) {
			sprites.splice(index, 1);
			}
		} else if(score <= 100){
			infoText("You're doing an exellent work! I've hidden one of the clues to add some more challenge for you. Good luck!", 660, 195, 180, "center", 25);
		} else if(score <= 150){
			infoText("Good job! Remember - if you accidentally get too much of one color, you can pour it in the cross-marked bucket.", 660, 195, 180, "center", 25);
		} else if(score <= 250){
			infoText("Keep up the good work! Soon you won't need any help, haha!", 660, 205, 180, "center", 25);
		} else if(score <= 275) {
			infoText("Alright, no clues from now on. Have you got what it takes to match colors?", 660, 205, 180, "center", 25);
		} else {
			var index = sprites.indexOf(controlsBubble);
			if (index > -1) {
				sprites.splice(index, 1);
				}
		};

	// If player pours the color to the product bucket
	if(player.x > 450 && spaceKeyIsPressed) {
		player.sourceX = 536;

		// Initiate Math difference between the colors, and grant points if earned.
		doMath();
		if(result < 50) {
			console.log(50-result);
			score += (50 - result);
			points = 0;
			points += (50 - result);
			pRed = Math.round(Math.random() * 250);
			pGreen = Math.round(Math.random() * 250);
			pBlue = Math.round(Math.random() * 250);
			};
		
		// Neutralize color of player's bucket - the player either starts a new level or start over.
			bucket.red = 0;
			bucket.green = 0;
			bucket.blue = 0;
		};
};