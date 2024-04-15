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
			
			this.circle.setPosition(game.input.mousePointer.worldX,game.input.mousePointer.worldY);
			this.circle.setOrigin(0,0)
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
