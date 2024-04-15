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
	}

	incrementMistakes()
	{
		this.mistakenCuts += 1;
	}
	
	incrementTime(howMuch)
	{
		this.timeElapsed += howMuch;
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
	}
	
	createJSONdict()
	{
		var levelDict = {"sessionID" : this.sessionID, "number" : this.number, "mistakes" : this.mistakenCuts, "time" : this.currentTime, "intersections" : this.intersections, "FOV" : this.fov, "vessels" : this.vesselCount, "motion" : this.totalMotion };
		
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
	}
}
