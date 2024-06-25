class levelTimer
{
	constructor(scene,updateInterval)
	{
		//updateInterval: how often to update clock (in ms)

		this.clock = new Phaser.Time.Clock(scene); //create timer 
		this.levelTime = 0;	//current level time
		this.sessionTime = 0; //current session time (how long player has been playing overall)
		this.interval = updateInterval;
		this.scene = scene;
		
		this.clock.addEvent({
		delay:this.interval,
		loop:true,
		paused:false,
		callback: this.IncrementLevelTime,
		callbackScope: this
		});
		this.clock.start()
	}
	
	//Setter functions
	
	IncrementLevelTime()
	{
		
		this.levelTime += (this.interval)/1000;
		if (this.scene.level.levelRecord.number > tutLevels)
		{
		this.sessionTime += (this.interval)/1000;
		}
		this.scene.idleTracker.increment((this.interval)/1000)
	}
	
	SessionPenalty()
	{
		if (this.scene.level.levelRecord.number > tutLevels)
		this.sessionTime += (mistakePenalty) * (this.interval/1000)
	}
	
	Reset()
	{
		this.levelTime = 0;
	}

	Pause()
	{
		this.clock.paused = true;
	}
	
	Unpause()
	{
		this.clock.paused = false;
	}
	
	//Getter functions

	GetLevelTime()
	{
		return this.levelTime;
	}
	
	IsPaused()
	{
		if (this.clock.paused == true)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	GetTimeLeft()
	{
		return (timeLimit - this.sessionTime) 
	}
}
