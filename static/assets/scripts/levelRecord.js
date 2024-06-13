class levelRecord
{
//this class records exportable stuff in a level: time to completion, no. of mistakes, etc.

	constructor(number,scene)
	
	{
		this.s = scene;
		this.sessionID = scene.sessionID;
		this.number = number;
		this.mistakenCuts = 0;
		this.completed = false;
		this.currentTime = 0; 	//this changes to match the timer when the level ends
		this.intersections = 0;
		this.vesselCount = 0;	//how many vessels were in the level
		this.totalMotion = 0;	//how many pixels were moved by the cutting head in the level
		this.fov = scene.levelParams.camSize;
		this.idleFlag = false 	//if this is true, there was inactivity by the player for more than the idleFlagTime specified in Globals. Makes it easier to identify & throw out useless data
	}

	incrementMistakes()
	{
		this.mistakenCuts += 1;
	}
	
	incrementTime(howMuch)
	{
		this.timeElapsed += howMuch;
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
		this.completed = false;
		this.number += 1;
		this.mistakenCuts = 0;
		this.currentTime = 0;
		this.intersections = 0;
		this.totalMotion = 0;
		this.vesselCount = 0;
		this.fov = 0;
		this.idleFlag = false;
	}
	
	createJSONdict()
	{
		var levelDict = {"sessionID" : this.sessionID, "number" : this.number, "mistakes" : this.mistakenCuts, "time" : this.currentTime, "intersections" : this.intersections, "FOV" : this.fov, "vessels" : this.vesselCount, "motion" : this.totalMotion, "idleFlag" : this.idleFlag };
		
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
		console.log("Idle flag triggered : " + this.idleFlag) 
	}
}
