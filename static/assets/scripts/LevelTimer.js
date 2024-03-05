class levelTimer
{
	//I'm struggling to make this work
	//The clock just refuses to count up
	
	constructor(scene,updateInterval)
	{
		//updateInterval: how often to update clock (in ms)

		this.clock = new Phaser.Time.Clock(scene); //create timer 
		this.levelTime = 0;	//
		this.interval = updateInterval;
		
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
}
