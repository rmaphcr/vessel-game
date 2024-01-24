class Camera
{
		size; 
		mosaic; //boolean. Whether or not to keep the mask or redraw it when the camera is moved.
		circle; 
		
		constructor(scene,size,mosaic)
		{
			this.size = size;																												//integer. Radius (in pixels) of the circle
			this.circle = scene.add.circle(game.input.mousePointer.worldX,game.input.mousePointer.worldY,cameraRadius,'0xffffff').setVisible(false);	//circle object.

		}
		
		UpdatePosition()	//Moves camera circle center to mouse location
		{
			if (this.mosaic == true)
			{
				//Use later to handle mosaicing 
			}
			
			this.circle.setPosition(game.input.mousePointer.worldX, game.input.mousePointer.worldY);
			
		}
		
		UpdateSize()	//updates the camera's size
		{
			this.circle.radius = this.size;
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
