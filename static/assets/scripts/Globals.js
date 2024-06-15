	//These are global settings of the game.
	
	//SCREEN SETTINGS
	let c = 150;							//integer, width of UI panel
	let w = config.width- c; 				//integer, width of game screen
	let h = config.height; 					//integer, height of game screen
	//always make sure config.width == config.height + c!
	//

	//CAMERA SETTINGS
	let cmin = 0.3						//max camera size (as proportion of half screen width)
	let cmax = 1.0						//min camera size (as proportion of half screen width)
	//
	
	//TIMER SETTINGS
	let clockTick = 500; 				//how often to update clock (in ms)
	let idleFlagTime = 5; 				//how many seconds of inactivity before triggering the idle flag for the current level
	//
	
	//BLOOD VESSEL SETTINGS
	let dmin = 2;						//min number of vessels
	let dmax = 5;						//max number of vessels
	var standardOffset = 30;			//offset of vessel end points from the edge of the screen
	var endPointSize = 15 				//size of endpoint circles
	var endPointTrueColour = 0x000000; 	//colour of true endpoints (2 of which connect the target blood vessel)
	var endPointFalseColour = 0xffffff; //colour of fake endpoints 
	var midPointDisturbance = 100;		//range of disturbance for vessel midpoints
	var splinePoints = 5;				//number of points to draw between endpoints for spline connection
	var vesselColour = 0x87a7b0;		//colour of blood vessel lines
	var vesselThickness = 3; 			//thickness of blood vessels
	var vesselLineSplits = 20; 			//how many line segments in blood vessels
	//
	
	//DEBUG & ANALYSIS SETTINGS
	let seedOverride = false;				//if this is a string, it'll be used instead of a random one for the first level's seed. Can be used to view levels.
	let noBlocker = false;					//if this is true, the full scene will be revealed, rather than through an aperture
	let noEnd = false;						//if this is true, the level will never move on.
	//
