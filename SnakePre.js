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
	var length = 4;
	var body = [];
	var lastKey = Math.floor((Math.random() * 4) +1);
	fillHead();
	fillBody();
	fillFood();
	
	function fillHead(){
		ctx.fillStyle = "Black";
		
		body.unshift({y: headY,x: headX});
		ctx.fillRect(headX ,headY ,fieldPx -1 ,fieldPx -1);
		alert(body[1]);
	} 
	
	function fillBody(){
		ctx.fillStyle = "Black";
		ctx.fillRect(body.x , body.y ,fieldPx -1 ,fieldPx -1 );
	}
	
	function fillFood(){ for
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
	
	function redirect(){
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
	}
	
	function borderCrossing(){
		if(headY < 0){
			headY = 780;
		}else if(headY > 780){
			headY = 0;
		}else if(headX < 0){
			headX = 780;
		}else if(headX > 780){
			headX = 0;
		}
	}	
	
	function loop() {
		requestAnimationFrame(loop);
		if(++count < 6){
			return;
		}
		count = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redirect();
		borderCrossing();
		if(headY == foodY && headX == foodX){
			score = score + 200;
			$("#score").text(score);
			length = length + 1;
			$("#length").text(length);
			relocateFood();
		}
		fillHead();
		fillBody();
		fillFood();
		$("#score").text(score);
		$("#length").text(length);
	}

	window.onkeydown = function(event) {
		switch(event.keyCode){
			case 38://down
				if(lastKey != 1){
					lastKey = 3;
				}
				break;
			case 40://up
				if(lastKey != 3){
					lastKey = 1;
				}
				break;
			case 39://right
				if(lastKey != 4){
					lastKey = 2;
				}
				break;
			case 37://left
				if(lastKey != 2){
					lastKey = 4;
				}
				break;
		}
	}
requestAnimationFrame(loop);
	
});