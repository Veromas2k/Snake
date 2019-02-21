$(document).ready(function(){
	//########
	// Variablen
	//########
	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	var fieldXY = 6;//VARIABLE FIELDS
	var fieldPx = 800%(800 / fieldXY);
	var count = 0;
	var lastKey = Math.floor((Math.random() * 4) +1);
	var snake = {
		speed : 60/3,//VARIABLE SPEED
		color : "red",//VARIABLE SNAKE COLOR
		length: 6,// VARIABLE START LENGTH
		score: 0,
		body : [],
		x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
		y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
		px: fieldPx - fieldPx / 20
	};
	var food = {
		color: "green",//VARIABLE FOOD COLOR
		x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
		y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
		px: fieldPx - fieldPx / 20
	};
//#####################################
//functions
//#####################################
	function drawBodyCell(cell){
		ctx.fillRect(cell.x,cell.y, snake.px, snake.px);
	}
	
	function fillSnake(){
		ctx.fillStyle = snake.color;
		ctx.fillRect(snake.x, snake.y, snake.px, snake.px);
		snake.body.unshift({x: snake.x, y: snake.y});
		
		snake.body.forEach(drawBodyCell);

		if (snake.body.length + 1 > snake.length){
			snake.body.pop();
		}
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
	
	function fillFood(){
		ctx.fillStyle = food.color;
		ctx.fillRect(food.x, food.y, food.px, food.px);
	}
	
	function relocateFood(){
		food.x = fieldPx * Math.floor((Math.random() * fieldXY) + 0);
		food.y = fieldPx * Math.floor((Math.random() * fieldXY) + 0);		
		occupied();
		//fillFood();	
	}
	
	function occupied(cell){
		if(food.x == cell.x && cell.y == food.y){
			relocateFood();
		}else{
			fillFood();
		}
	}
	
	function borderCrossing(){
		if(snake.y < 0){
			snake.y = 800 - fieldPx;
		}else if(snake.y > 800 - fieldPx){
			snake.y = 0;
		}else if(snake.x < 0){
			snake.x = 800 - fieldPx;
		}else if(snake.x > 800 - fieldPx){
			snake.x = 0;
		}
	}
	
	function onCrash(cell){
		if(snake.x == cell.x && cell.y == snake.y){
			//alert("Game Over");
		}
	}

//#####################################
//on game start (run once)
//#####################################	
	canvas.width = 800;
	canvas.height = 800;
	fillSnake();
	fillFood();
	requestAnimationFrame(gameloop);
//#####################################
//game 
//#####################################	
	function gameloop() {
		requestAnimationFrame(gameloop);
		if(++count < snake.speed){
			return;
		}
		count = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redirect();
		borderCrossing();
		if(snake.y == food.y && snake.x == food.x){
			snake.score = snake.score + 200;
			$("#score").text(snake.score);
			snake.length = snake.length + 1;
			$("#length").text(snake.length);
			relocateFood();
		}
		snake.body.forEach(onCrash);
		fillSnake();
		fillFood();
		$("#score").text(snake.score);
		$("#length").text(snake.length);
	}

//#####################################
//controls
//#####################################
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
});