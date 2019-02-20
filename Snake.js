$(document).ready(function(){
	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 800;
	var fieldPx = 20;
	var count = 0;
	var lastKey = Math.floor((Math.random() * 4) +1);
	
	var snake = {
		length: 4,
		score: 0,
		x: fieldPx * Math.floor((Math.random() * 40) + 0),
		y: fieldPx * Math.floor((Math.random() * 40) + 0),
		px: fieldPx - 1
	};
	
	function fillSnake(){
		ctx.fillStyle = "Green";
		ctx.fillRect(snake.x, snake.y, snake.px, snake.px);
	}	
	
	function redirect(){
		switch(lastKey){
			case 1:
				snake.y = snake.y +fieldPx;
				break;
			case 2:
				snake.x = snake.x +fieldPx;
				break;
			case 3:
				snake.y = snake.y -fieldPx;
				break;
			case 4:
				snake.x = snake.x -fieldPx;
				break;
		}
	}	
	
	var food = {
		x: fieldPx * Math.floor((Math.random() * 40) + 0),
		y: fieldPx * Math.floor((Math.random() * 40) + 0),
		px: fieldPx - 1
	};
	
	function fillFood(){
		ctx.fillStyle = "Red";
		ctx.fillRect(food.x, food.y, food.px, food.px);
	}
	
	function relocateFood(){
		food.x = fieldPx * Math.floor((Math.random() * 40) + 0);
		food.y = fieldPx * Math.floor((Math.random() * 40) + 0);		
		fillFood();
	}
	
	function borderCrossing(){
		if(snake.y < 0){
			snake.y = 780;
		}else if(snake.y > 780){
			snake.y = 0;
		}else if(snake.x < 0){
			snake.x = 780;
		}else if(snake.x > 780){
			snake.x = 0;
		}
	}		
	
	fillSnake();
	fillFood();
	
	function loop() {
		requestAnimationFrame(loop);
		if(++count < 6){
			return;
		}
		count = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redirect();
		borderCrossing();
		if(snake.y == food.y && snake.x == food.x){
			snake.score = snake.score + 200;
			$("#score").text(snake.score);
			length = length + 1;
			$("#length").text(length);
			relocateFood();
		}
		fillSnake();
		fillFood();
		$("#score").text(snake.score);
		$("#length").text(snake.length);
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