	//These are global settings of the game.
	
	let c = 150;							//integer, width of UI panel
	let w = config.width- c; 				//integer, width of game screen
	let h = config.height; 					//integer, height of game screen
	//always make sure config.width == config.height + c!
	
	let dmin = 2;						//min number of vessels
	let dmax = 5;						//max number of vessels
	
	let cmin = 0.3						//max camera size (as proportion of half screen width)
	let cmax = 1.0						//min camera size (as proportion of half screen width)
	
	let clockTick = 500; 				//how often to update clock (in ms)
	
	var standardOffset = 30;			//offset of vessel end points from the edge of the screen
	var endPointSize = 15 				//size of endpoint circles
	var endPointTrueColour = 0x000000; 	//colour of true endpoints (2 of which connect the target blood vessel)
	var endPointFalseColour = 0xffffff; //colour of fake endpoints 
	var midPointDisturbance = 100;		//range of disturbance for vessel midpoints
	var splinePoints = 5;				//number of points to draw between endpoints for spline connection
	var vesselColour = 0x87a7b0;		//colour of blood vessel lines
	var vesselThickness = 3; 			//thickness of blood vessels
	var vesselLineSplits = 20; 			//how many line segments in blood vessels
	
	//Scoring factors
	//How much each aspect of the game should contribute to one's level score
	//philosophy: an average level, played well, should be worth 100 points.
	
	//Score gained should increase with level difficulty, decrease with time taken, mistakes and movement
	//maybe some sort of "play until you lose" mechanic, where score is presented in terms of time, which ticks down
	//but is increased by the score when a level is beaten
	//so you see how long you can play before losing
	//then when you lose, you're shown your cumulative score and how many levels you beat
	//start with a decent buffer time at the beginning, so everyone has time to play at least a few levels.
	
	let beginningTime = 100 //the time you start with
	
	const scoreWeights = {time: 1,mistakes:1,movement:1,vessels:1,intersections:1}
