class Camera
{
		
		constructor(scene,size,mosaic)
		{
			this.scene = scene
			this.size = size;			//should be between 0.1 and 1. Ratio of radius to half screen width
			this.circle = this.scene.add.circle(game.input.mousePointer.worldX, game.input.mousePointer.worldY,this.size * (this.scene.width/2),'0xffffff').setVisible(false);	//circle object.
			this.circle.setOrigin(0,0)
		}
		
		UpdatePosition()	//Moves camera circle center to mouse location
		{
			if (this.mosaic == true)
			{
				//Use later to handle mosaicing 
			}
			
			this.TrackMovement();
			this.circle.setPosition(game.input.mousePointer.worldX,game.input.mousePointer.worldY);
			this.circle.setOrigin(0,0)
		}
		
		TrackMovement()
		{
			//the camera is also used to track (roughly) how much the mouse is being moved
			//by comparing the old and new positions of the camera center after each camera movement, adding it to a variable
			//this may not be accurate if the user is rapidly jiggling the camera back and forth or something, but then again that has no real equivalent in laparoscopy anyway 
			//because this is the vector distance (magnitude) between the mouse position over 2 update ticks of the game
			
			this.scene.level.levelRecord.incrementMouseMotion(Phaser.Math.Distance.Between(this.circle.x, this.circle.y, game.input.mousePointer.worldX, game.input.mousePointer.worldY))
		}
		
		UpdateSize()	//updates the camera's size
		{
			this.circle.setPosition(game.input.mousePointer.worldX,game.input.mousePointer.worldY)
			this.circle.radius = this.size * ((this.scene.width)/2);
			this.circle.setOrigin(0,0)
		}
		
		Resize(newSize)	//changes camera size
		{
			if (this.size != newSize)
			{
				this.size = newSize;
				this.UpdateSize();
			}
		}
}
