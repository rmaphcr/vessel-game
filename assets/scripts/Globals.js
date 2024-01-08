	//These are global settings of the game.
	
	let w = config.width; 				//integer, width of screen
	let h = config.height; 				//integer, height of screen
	
	let clockTick = 500; 				//how often to update clock (in ms)
	
	var standardOffset = 30;			//offset of vessel end points from the edge of the screen
	var endPointSize = 15 				//size of endpoint circles
	var endPointTrueColour = 0x000000; 		//colour of true endpoints (2 of which connect the target blood vessel)
	var endPointFalseColour = 0xffffff; 		//colour of fake endpoints 
	var midPointDisturbance = 100;		//range of disturbance for vessel midpoints
	var splinePoints = 5;				//number of points to draw between endpoints for spline connection
	var vesselColour = 0x87a7b0;			//colour of blood vessel lines
	var vesselThickness = 3; 			//thickness of blood vessels
	
