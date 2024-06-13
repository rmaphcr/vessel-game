class idleTracker
{
	
	//The purpose of this class is to identify and flag idleness, when the player is not moving.
	//If idleness is detected for longer than specified by idleFlagTime in Globals, the levelRecord will be flagged for idleness.
	//This makes it easy to differentiate levels that naturally took a long time, from levels where the player just nodded off or left their PC.
	//The former are useful data, the latter are not!
	//So in analysis, we can easily filter out levels with idleFlag == true if we like.
	
	constructor(scene)
	{
		this.scene = scene;
		this.idleTime = 0;	//how much time (in seconds) has elapsed (according to scene's LevelTimer) since the player did anything.
	}
	
	reset()
	{
		//Called whenever the player does something. 
		this.idleTime = 0;	
	}
	
	flagIdle()
	{
		//Called when the idle flag is to be triggered. Called by self.
		this.scene.level.levelRecord.setIdle();
	}
	
	increment(amount)
	{
		//Called to increment the idle time. Happens whenever the level timer ticks. Called by the LevelTimer.
		//But unless the player is just sitting there doing nothing, reset() will soon be called to set it back to 0
		this.idleTime += amount; 
		this.checkIdleFlag()
	}
	
	checkIdleFlag()
	{
		//Called every time the idle time is incremented, to check if the idle flag needs to be set. Called by self.
		if (this.idleTime >= idleFlagTime && this.scene.level.levelRecord.idleFlag == false)
		{
			this.flagIdle()
		}
	}
}
