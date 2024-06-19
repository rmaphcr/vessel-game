class TransitionManager
{
	//purpose: handles the transition screen between levels
	
	constructor(scene)
	{
		this.scene = scene;
		this.active = false; //tells the game whether it's currently paused or not
		this.scene.keyManager.P.on('up',this.Activate,this) //starts listening for presses of 'P'
		
		this.blocker = scene.add.rectangle((this.scene.width)/2, this.scene.height/2, this.scene.width, this.scene.height, 0x000000).setVisible(false);
		this.blocker.setDepth(1001);
		
		this.pauseText = scene.add.text((this.scene.width)/2, h/2, "PAUSED", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setVisible(false);	
		this.pauseText.setDepth(1002);		
		this.pauseText.setOrigin(0.5);
		
		this.transitionText = scene.add.text((this.scene.width)/2, h/2, "Good job! Onto the next level!", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setVisible(false);		
		this.transitionText.setDepth(1002);
		this.transitionText.setOrigin(0.5);	
		
		this.continueText = scene.add.text((this.scene.width)/2, 2*(h/3), "Press the 'P' key to continue.", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setVisible(false);		
		this.continueText.setOrigin(0.5);
		this.continueText.setDepth(1002);	

	}
	
	Activate()
	{
		
		//function called by pause listener. 
		
		if (this.active == false)
		{
			this.Begin();
		}
		
		else
		{
			//change this once countdown timer is implemented, so this will not do anything if countdown is at 0.
			this.End();
		}
	}
	
	Begin(mode = "pause")
	{
		//stops timer, throws up transition screen until continue button pressed
		//the player can use the p key to pause and unpause at any time as well, but the screen will be hidden
		//called by the Activate() listener responder, or directly when a new level has just been generated
		
		console.log("pause initiated");
		
		this.active = true;
		
		this.scene.timer.Pause();
		this.blocker.setVisible(true);
		
		if (mode == "transition")
		{
			this.continueText.setVisible(true);
			this.transitionText.setVisible(true);
		} 
		
		else if (mode == "end")
		{
			this.gameOverText = this.scene.add.text((this.scene.width)/2, (h/2), ["GAME OVER","","You completed " + (this.scene.level.levelRecord.number - 1).toString() + " levels.","Thank you for playing!"], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });		
			this.gameOverText.setOrigin(0.5);
			this.gameOverText.setDepth(1002);	
			this.gameOverText.setAlign("center");
		}
		
		else
		{
			this.continueText.setVisible(true);
			this.pauseText.setVisible(true);
		}
		
	}
	
	End()
	{		
		
		//resumes the game.
		
		console.log("game resumed");
		
		this.blocker.setVisible(false);
		this.continueText.setVisible(false);
		this.transitionText.setVisible(false);
		this.pauseText.setVisible(false);
		this.scene.timer.Unpause();
		this.active = false;
	}
}
