$(document).ready(function(){
	var canvas = document.getElementById("canvas");
	var ctx= canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 800;
	ctx.moveTo(300,600);
	ctx.lineTo(300,200);
	ctx.stroke();
	
	
	//	keyDownHandler(event){
	//		var key = event.which;
	//		if(key>46){return;}
	//		switch(key){
	//			case 37:
	//				blockx -=1;
	//			case 39:
	//				blockx +=1;
	//			case 38:
	//				blocky +=1;
	//			case 40:
	//				blocky -=1;

					
				
	
});