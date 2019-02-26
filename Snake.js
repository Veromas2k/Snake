$(document).ready(function(){
	//########
	// Variablen
	//########
	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	var fieldXY;
	var fieldPx;
	var count;
	var gameOn;
	var borders = false;
	var borderCheck;
	var lastKey;
	var snake;
	var food;
	function start(){
		fieldXY = $("#gridVal").text();//VARIABLE FIELDS
		fieldPx = 800 / fieldXY;
		count = 0;
		gameOn = false;
		borders = borderCheck;//BORDERS ON OR OFF
		lastKey = Math.floor((Math.random() * 4) +1);
		snake = {
			speed : 60 / Number($("#speedSlider").val()),//VARIABLE GAME SPEED
			color : $("#snakeColor").val(),//VARIABLE SNAKE COLOR
			length: Number($("#lengthSlider").val()),// VARIABLE START LENGTH
			score: 0,
			body : [],
			x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			px: fieldPx - fieldPx / 20
		};
		food = {
			color: $("#foodColor").val(),//VARIABLE FOOD COLOR
			x: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			y: fieldPx * Math.floor((Math.random() * fieldXY) + 0),
			px: fieldPx - fieldPx / 20
		};
	}
	start();
//#####################################
//UI
//#####################################	
	var gridSlider = document.getElementById("gridSlider");
	var gridOutput = document.getElementById("gridVal");
	gridOutput.innerHTML = gridOutput.value;

	gridSlider.oninput = function() {
		if(gridSlider.value == 1){
			gridOutput.innerHTML = 8;
			$("#gridVal").text() = 8;
		}
		if(gridSlider.value == 2){
			gridOutput.innerHTML = 16;
			$("#gridVal").text() = 16;
		}
		if(gridSlider.value == 3){
			gridOutput.innerHTML = 32;
			$("#gridVal").text() = 32;
		}
		if(gridSlider.value == 4){
			gridOutput.innerHTML = 64;
			$("#gridVal").text() = 64;
		}
		if(gridSlider.value == 5){
			gridOutput.innerHTML = 128;
			$("#gridVal").text() = 128;
		}
	}
	
	var lengthSlider = document.getElementById("lengthSlider");
	var lengthOutput = document.getElementById("lengthVal");
	lengthOutput.innerHTML = lengthSlider.value; 

	lengthSlider.oninput = function() {
		lengthOutput.innerHTML = this.value;
	} 
	
	var speedSlider = document.getElementById("speedSlider");
	var speedOutput = document.getElementById("speedVal");
	speedOutput.innerHTML = speedSlider.value; 

	speedSlider.oninput = function() {
		speedOutput.innerHTML = this.value;
	} 
	
	var borderSlider = document.getElementById("borderSlider");
	var borderOutput = document.getElementById("borderVal");
	borderOutput.innerHTML = borderOutput.text;
	
	borderSlider.oninput = function() {
		if(borderSlider.value == 1){
			borderOutput.innerHTML = "disabled";
			document.getElementById("borderVal").style.color = "red";
			document.getElementById("canvas").style.border = "2px solid white";
			borderCheck = false;
		}
		if(borderSlider.value == 2){
			borderOutput.innerHTML = "enabled";
			document.getElementById("borderVal").style.color = "green";
			document.getElementById("canvas").style.border = "2px solid red";
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
			$("#start").css("visibility", "visible");
			$("#gridSlider").css("visibility", "visible");
			$("#lengthSlider").css("visibility", "visible");
			$("#speedSlider").css("visibility", "visible");
			$("#borderSlider").css("visibility", "visible");
			gameOn = false;	
	}

//#####################################
//on game start button press
//#####################################	
	canvas.width = 800;
	canvas.height = 800;
	requestAnimationFrame(gameloop);
	$("#start").click(function(){
		if($("#gridVal").text() == "undefined"){
			alert("undefined grid size");
		}
		else if($("#borderVal").text() == "undefined"){
			alert("undefined border settings");
		}
		else{
			$("#start").css("visibility", "hidden");
			$("#gridSlider").css("visibility", "hidden");
			$("#lengthSlider").css("visibility", "hidden");
			$("#speedSlider").css("visibility", "hidden");
			$("#borderSlider").css("visibility", "hidden");
			start();
			gameOn = true;
		}
	});
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