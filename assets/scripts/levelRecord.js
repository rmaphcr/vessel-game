class levelRecord
{
//this class records exportable stuff in a level: time to completion, no. of mistakes, etc.

	constructor(number)
	
	{
		this.number = number;
		this.mistakenCuts = 0;
		this.completed = false;
		this.currentTime = 0; //this changes to match the timer when the level ends
		this.intersections = 0;
		this.vesselCount = 0;	//how many vessels were in the level
		this.totalMotion = 0;	//how many pixels were moved by the cutting head in the level
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
		this.setCurrentTime(timer)
	}
	
	setCurrentTime(timer)
	{
		this.currentTime = timer.GetLevelTime();
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
	}
	
	createJSON()
	{
		let levelStringJSON = JSON.stringify(this);
		console.log("CONVERTING LEVEL RECORD TO JSON FILE:")
		console.log(levelStringJSON);
		return levelStringJSON;
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
