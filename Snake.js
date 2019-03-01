document.addEventListener("DOMContentLoaded", function(event) { 
	//########
	// Variablen
	//########
	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	var fieldXY;
	var fieldPx;
	var count;
	var gameOn;
	var borders;
	var borderCheck;
	var lastKey;
	var gridArray = [8,16,32,64,128];
	var gridPos;
	var snake;
	var food;
	
	var gridSlider = document.getElementById("gridSlider");
	var gridOutput = document.getElementById("gridVal");
	var lengthSlider = document.getElementById("lengthSlider");
	var lengthOutput = document.getElementById("lengthVal");
	var speedSlider = document.getElementById("speedSlider");
	var speedOutput = document.getElementById("speedVal");
	var borderButton = document.getElementById("borderButton"); 
	var foodColor = document.getElementById("foodColor");
	var length = document.getElementById("length");
	var score = document.getElementById("score");
	var gamestart = document.getElementById("start");
//	alert(borderButton.getAttribute(""));
	gridOutput.innerHTML = gridOutput.value;
	lengthOutput.innerHTML = lengthSlider.value; 
	speedOutput.innerHTML = speedSlider.value; 
	borderValue = borderButton.getAttribute("value");

	function start(){
		fieldXY = Number(gridVal.text);//VARIABLE FIELDS
		fieldPx = 800 / fieldXY;
		count = 0;
		gameOn = false;
		borders = borderCheck;//BORDERS ON OR OFF
		lastKey = Math.floor((Math.random() * 4) +1);
		snake = {
			speed : 60 / Number(speedSlider.value),//VARIABLE GAME SPEED
			color : snakeColor.value,//VARIABLE SNAKE COLOR
			length: Number(lengthSlider.value),// VARIABLE START LENGTH
			score: 0,
			body : [],
			x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			px: fieldPx - fieldPx / 20
		};
		food = {
			color: foodColor.value,//VARIABLE FOOD COLOR
			x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			px: fieldPx - fieldPx / 20
		};
	}
	start();
//#####################################
//UI
//#####################################	

	gridSlider.oninput = function(){
		gridPos = Number(gridSlider.value) - 1;
		gridOutput.innerHTML =  (gridArray[gridPos]);
		gridVal.text = (gridArray[gridPos]);
	}
	
	lengthSlider.oninput = function() {
		lengthOutput.innerHTML = lengthSlider.value;
	} 

	speedSlider.oninput = function() {
		speedOutput.innerHTML = this.value;
	} 
	
	borderButton.onclick = function() {
		if(borderButton.value == 1){
			borderButton.value = 0;
			borderButton.innerHTML.text = "disabled";
			borderButton.style.color = "red";
			canvas.style.border = "2px solid white";
			borderCheck = false;
		}
		if(borderButton.value==0){
			borderButton.value = 1;
			borderButton.innerHTML = "enabled";
			borderButton.style.color = "green";
			canvas.style.border = "2px solid red";
			borderCheck  = true;
		}
	} 
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
		snake.body.forEach(occupied);
	}
	
	function occupied(cell){
		if(food.x == cell.x && cell.y == food.y){
			relocateFood();
		}else{
			fillFood();
		}
	}
	
	function borderCrossing(){
		if( borders == false){
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
		else{
			if(snake.y < 0){
				gameStop();
			}else if(snake.y > 800 - fieldPx){
				gameStop();
			}else if(snake.x < 0){
				gameStop();
			}else if(snake.x > 800 - fieldPx){
				gameStop();
			}	
		}
	}
		
	function onCrash(cell){
		if(snake.x == cell.x && cell.y == snake.y){
			gameStop();
		}
	}
	
	function gameStop(){
			alert("Game Over");
			gamestart.style.visibility=  "visible";
			gridSlider.style.visibility=  "visible";
			lengthSlider.style.visibility=  "visible";
			speedSlider.style.visibility=  "visible";
			gameOn = false;	
	}

//#####################################
//on game start button press
//#####################################	
	canvas.width = 800;
	canvas.height = 800;
	requestAnimationFrame(gameloop);
	gamestart.onclick = function(){
		if(gridVal.text == undefined){
			alert("undefined grid size");
		}
		else{
			gamestart.style.visibility=  "hidden";
			gridSlider.style.visibility=  "hidden";
			lengthSlider.style.visibility=  "hidden";
			speedSlider.style.visibility=  "hidden";
			start();
			gameOn = true;
		}
	};
//#####################################
//game 
//#####################################	
	
	function gameloop() {
		requestAnimationFrame(gameloop);
		if(gameOn == false){
			return;
		}
		if(++count < snake.speed){
			return;
		}
		count = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redirect();
		borderCrossing();
		if(snake.y == food.y && snake.x == food.x){
			snake.score = snake.score + 200;
			snake.length = snake.length + 1;
			relocateFood();
		}
		snake.body.forEach(onCrash);
		fillSnake();
		fillFood();
		score.innerHTML = snake.score;
		length.innerHTML = snake.length;
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