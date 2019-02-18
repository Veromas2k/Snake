$(document).ready(function(){

	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 800;
	var fieldPx = 20;
	var posX = Math.floor((Math.random() * 39) + 0);
	var posY = Math.floor((Math.random() * 39) + 0);
	var posFX = Math.floor((Math.random() * 39) + 0);
	var posFY = Math.floor((Math.random() * 39) + 0);
	var headX = fieldPx * posX;
	var headY = fieldPx * posY;
	var foodX = fieldPx * posFX;
	var foodY = fieldPx * posFY;
	var score = 0;
	var count = 0;
	var lastKey = Math.floor((Math.random() * 4) +1);
	fillHead();
	fillFood();
	
	function fillHead(){
		ctx.fillStyle = "Black";
		ctx.fillRect(headX ,headY ,fieldPx -1 ,fieldPx -1);
	}
	
	function fillFood(){
		ctx.fillStyle = "Red";
		ctx.fillRect(foodX, foodY, fieldPx -1, fieldPx -1);
	}	
	
	function relocateFood(){
		posFX = Math.floor((Math.random() * 39) + 0);
		posFY = Math.floor((Math.random() * 39) + 0);
		foodX = fieldPx * posFX;
		foodY = fieldPx * posFY;	
		fillFood();
	}
		
	function updateGameArea() {
		//if (++count < 4){
		//	return;
		//}
		//count = 0;
		switch(lastKey){
			case 1:
				headY = headY +fieldPx;
				break;
			case 2:
				headX = headX +fieldPx;
				break;
			case 3:
				headY = headY -fieldPx;
				break;
			case 4:
				headX = headX -fieldPx;
				break;
		}
		switch(headY){
			case -20:
				headY = 780;
				break;
			case 800:
				headY = 0;
				break;
		}
		switch(headX){
			case -20:
				headX = 780;
				break;
			case 800:
				headX = 0;
				break;
		}

		if(headY == foodY && headX == foodX){
			score = score + 200;
			$("#score").text(score);
			relocateFood();
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fillHead();
		fillFood();
		$("#score").text(score);		
		requestAnimationFrame(updateGameArea);
	}

	window.onkeydown = function(event) {
		if(event.keyCode == 38) { // down
			headY -= fieldPx;
			lastKey = 3;
		} else if(event.keyCode == 40) { // up
			headY += fieldPx
			lastKey = 1;
		} else if(event.keyCode == 39) { // right 
			headX += fieldPx
			lastKey = 2;
		} else if(event.keyCode == 37) { // left
			headX -= fieldPx 
			lastKey = 4;
		}
	}

requestAnimationFrame(updateGameArea);
	
});