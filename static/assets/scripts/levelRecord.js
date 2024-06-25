class levelRecord
{
//this class records exportable stuff in a level: time to completion, no. of mistakes, etc.

	constructor(number,scene)
	
	{
		
		//if you add something new here that you want exported
		//remember to add it to the levelRecord.reset(), levelRecord.createJSONdict() and level.recordResults() functions
		// plus your backend route for exporting to the database!
		//I'm aware this is annoying, if you're reading this then I didn't get a chance to clean it up
		//Ideally, I'd want to define all the fields in one place (Globals?) so they're easier to change
		
		this.s = scene;
		this.sessionID = scene.sessionID;
		this.seed = scene.RNGManager.lastSeed;
		this.number = number; //number of levels beaten in this run;
		this.cumulativeNumber = number;
		this.mistakenCuts = 0;
		this.completed = false;
		this.currentTime = 0; 	//this changes to match the timer when the level ends
		this.intersections = 0;
		this.vesselCount = 0;	//how many vessels were in the level
		this.totalMotion = 0;	//how many pixels were moved by the cutting head in the level
		this.mouseMotion = 0; 	// (approximately) how much the mouse was moved in the level (pixels)
		this.fov = scene.levelParams.camSize;
		this.idleFlag = false; 	//if this is true, there was inactivity by the player for more than the idleFlagTime specified in Globals. Makes it easier to identify & throw out useless data
	}

	incrementMistakes()
	{
		this.mistakenCuts += 1;
	}
	
	incrementTime(howMuch)
	{
		this.timeElapsed += howMuch;
	}
	
	incrementMouseMotion(amount)
	{
		//this gets called by the Camera class, seemed the easiest way to do it and it should be roughly accurate
		
		this.mouseMotion += amount;
	}
	
	setIdle()
	{
		this.idleFlag = true;	//flags the level to denote the player was idle for more than the designated idle time
	}
	
	
	complete()
	{
		this.completed = true;
	}
	
	setCurrentTime(timer)
	{
		this.currentTime = timer.GetLevelTime();
	}
	
	getFOV()
	{
		this.fov = this.s.levelParams.camSize;
		return this.fov;
	}
	
	reset()
	{
		
	//called by level class each time a new level is generated, after data is exported
		
		this.completed = false;
		this.seed = this.s.RNGManager.lastSeed;
		this.number += 1;
		this.cumulativeNumber += 1;
		this.mistakenCuts = 0;
		this.currentTime = 0;
		this.intersections = 0;
		this.totalMotion = 0;
		this.mouseMotion = 0;
		this.vesselCount = 0;
		this.fov = 0;
		this.idleFlag = false;
	}
	
	createJSONdict()
	{
		var levelDict = {"sessionID" : this.sessionID, "seed" : this.seed, "number" : this.number, "cumulativeNumber":this.cumulativeNumber, "mistakes" : this.mistakenCuts, "time" : this.currentTime, "intersections" : this.intersections, "FOV" : this.fov, "vessels" : this.vesselCount, "motion" : this.totalMotion, "mouseMotion" : this.mouseMotion, "idleFlag" : this.idleFlag };
		
		return levelDict;
	}
	
	consoleDump()
	{
		console.log("LEVEL : " + this.number);
		console.log("Vessel count : " + this.vesselCount + " vessels")
		console.log("Vessel intersections : " + this.intersections)
		console.log("Completion time : " + this.currentTime + " seconds")
		console.log("Mistakes : " + this.mistakenCuts)
		console.log("Movement : " + this.totalMotion + " pixels")
		console.log("Mouse movement :" + this.mouseMotion + "pixels")
		console.log("Idle flag triggered : " + this.idleFlag) 
	}
}
