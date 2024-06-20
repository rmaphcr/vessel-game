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
		
		this.restartText = scene.add.text((this.scene.width)/2, 2*(h/3), "Press the 'P' key to restart the game.", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setVisible(false);		
		this.restartText.setOrigin(0.5);
		this.restartText.setDepth(1002);	

		this.gameOver = false; //becomes true when the game is restarting

	}
	
	Activate()
	{
		
		//function called by pause listener. 
		
		if (this.active == false)
		{
			this.Begin();
		}
		
		else if (this.gameOver == false) 
		{
			this.End();
		}
		
		else  //if the game is over
		{
			this.RestartGame();
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
			this.gameOver = true;
			this.gameOverText = this.scene.add.text((this.scene.width)/2, (h/2), ["GAME OVER","","You completed " + (this.scene.level.levelRecord.number - 1).toString() + " levels.","Thank you for playing!"], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });		
			this.gameOverText.setOrigin(0.5);
			this.gameOverText.setDepth(1002);	
			this.gameOverText.setAlign("center");
			this.restartText.setVisible(true);
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
	
	Transition(newGame = false)
	{
		//manages all the junk involved in setting up a new level
		this.scene.RNGManager.Reset();	//gets new seed
		this.scene.level.recordResults(newGame);
		this.scene.levelParams = new levelParams(this.scene.RNG.between(dmin,dmax),this.scene.RNG.between(cmin*10,cmax*10)/10);
		this.scene.level.generate();
		this.scene.cutCursor.vessels = this.scene.level.bloodVessels;
		this.scene.fovText.setText("Camera size: " + this.scene.camera.size);
		this.scene.levelText.setText(["Levels" , "completed: " + (this.scene.level.levelRecord.number - 1)])
		if (newGame == false) {this.Begin("transition")};	//congratulates player and pauses the game until they press 'P'
	}
	
	RestartGame()
	{
		console.log("restarting game");
		//sets everything back to initial state so game can be restarted.
		this.gameOverText.setVisible(false);
		this.restartText.setVisible(false);
		this.scene.transitionManager.Transition(true); //dumps last level.
		this.scene.timer.sessionTime = 0;
		this.scene.level.levelRecord.number = 1;	//sets level number back to 1.
		this.scene.levelText.setText(["Levels" , "completed: " + (this.scene.level.levelRecord.number - 1)])
		this.gameOver = false;
		this.End()		//ends pause
	}
	
}
