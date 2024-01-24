class levelRecord
{
//this class records exportable stuff in a level: time to completion, no. of mistakes, etc.

	constructor(number)
	
	{
		this.number = number;
		this.mistakenCuts = 0;
		this.completed = false;
		this.currentTime = 0; //this changes to match the timer when the level ends
		this.difficulty = 0; //initialises a record of the level's difficulty, ie the number of vessels. This is set by the generate method of the level class which this levelRecord is part of.
		this.intersections = 0;
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
		console.log("Level " + this.number  + " has been completed. You took " + timer.GetLevelTime() + " seconds and made " + this.mistakenCuts + " mistaken cuts.")
		this.setCurrentTime(timer)
	}
	
	setCurrentTime(timer)
	{
		this.currentTime = timer.GetLevelTime();
	}
	
	exportRecord()
	{
		//exports the level record to a csv or something
		//console.log("PLACEHOLDER: EXPORTING THE LEVEL RECORD")
	}
	
	reset()
	{
		this.exportRecord();
		this.number += 1;
		this.mistakenCuts = 0;
		this.currentTime = 0;
		this.completed = false;
		this.difficulty = 0;
		this.intersections = 0;
	}
}
