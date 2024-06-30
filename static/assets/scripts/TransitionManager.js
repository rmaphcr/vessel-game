class TransitionManager
{
	//purpose: handles the transition screen between levels
	
	constructor(scene)
	{
		this.scene = scene;
		this.active = false; //tells the game whether it's currently paused or not. Game begins paused.
		this.scene.keyManager.Space.on('up',this.Activate,this) //starts listening for presses of the spacebar
		
		this.blocker = scene.add.rectangle((this.scene.width)/2, this.scene.height/2, this.scene.width, this.scene.height, 0x000000).setVisible(false);
		this.blocker.setDepth(1001);
		
		this.transitionText = scene.add.text((this.scene.width)/2, h/2.7, (this.scene.level.levelRecord.number - 1).toString(), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:100}).setVisible(false);		
		this.transitionText.setDepth(1002);
		this.transitionText.setOrigin(0.5);	
		
		this.pauseScreen = scene.pauseScreen;
		this.openingScreen = scene.openingScreen;
		this.gameOverScreen = scene.gameOverScreen;
		this.transitionScreen = scene.transitionScreen;
		
		this.openingText = scene.add.text((this.scene.width)/2, h/2, [">Cut the vessels with two black ends to beat the level.", ">Ignore the vessels with two white ends.", ">Use the mouse to move the camera.",">Use the arrow keys or WASD to move the cursor.", ">Click the left mouse button and hold it to draw a cutting path.", ">Release the left mouse button to cut along the path!","This first level will be untimed, so you can get used to it."], { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setVisible(false).setAlign("center");		
		this.openingText.setDepth(1002);
		this.openingText.setOrigin(0.5);	

		this.gameOver = false; //becomes true when the game is restarting.

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
		
		else
		{
			this.RestartCheck(); //checks if the space key has been held
		}
		
	}
	
	Begin(mode = "pause")
	{
		//stops timer, throws up transition screen until continue button pressed
		//the player can use the spacebar to pause and unpause at any time as well, but the screen will be hidden
		//called by the Activate() listener responder, or directly when a new level has just been generated
		
		console.log("pause initiated");
		
		this.active = true;
		
		this.scene.timer.Pause();
		this.blocker.setVisible(true);
	
		if (mode == 'opening')
		{
			this.openingScreen.setVisible(true);
		}
		
		else if (mode == "transition")
		{
			this.transitionText.setText((this.scene.level.levelRecord.number - 1).toString())
			this.transitionScreen.setVisible(true);
			this.transitionText.setVisible(true);
		} 
		
		else if (mode == "end")
		{
			this.gameOver = true;
			this.gameOverScreen.setVisible(true);
			this.transitionText.setText((this.scene.level.levelRecord.number - 1).toString())
			this.transitionText.setVisible(true);
		}
		
		else
		{
			this.pauseScreen.setVisible(true);
		}
		
	}
	
	End()
	{		
		{
		console.log("game resumed");
		
		this.blocker.setVisible(false);
		this.transitionText.setVisible(false);
		this.pauseScreen.setVisible(false);
		this.gameOverScreen.setVisible(false);
		this.transitionScreen.setVisible(false);
		this.openingScreen.setVisible(false);
		this.openingText.setVisible(false);
		this.scene.timer.Unpause();
		this.active = false;
		}
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
		this.scene.practiceText.setText(["PRACTICE","LEVEL","(UNTIMED)"]);
		this.scene.levelText.setText(["Levels" , "completed: " + (this.scene.level.levelRecord.number - 1)])
		if (newGame == false) {this.Begin("transition")};	//congratulates player and pauses the game until they press 'P'
	}

	RestartCheck()
	{
		console.log("duration" + this.scene.keyManager.Space.duration.toString())
		if (this.scene.keyManager.Space.duration >= 500) //if space key has been held for over half a second
		{
			this.RestartGame();
		}
	}

	RestartGame()
	{
		console.log("restarting game");
		//sets everything back to initial state so game can be restarted.
		this.gameOverScreen.setVisible(false);
		this.transitionText.setVisible(false);
		this.scene.transitionManager.Transition(true); //dumps last level.
		this.scene.timer.sessionTime = 0;
		this.scene.level.levelRecord.number = 1;	//sets level number back to 1.
		this.scene.levelText.setText(["Levels" , "completed: " + (this.scene.level.levelRecord.number - 1)])
		this.gameOver = false;
		this.End()		//ends pause
	}
	
}
