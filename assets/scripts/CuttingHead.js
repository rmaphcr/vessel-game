class cutHead
{
	
	//This class implements the cutting head.
	
	constructor(scene,keymanager,size,speed,x_max,y_max)
	{
	
		this.scene = scene; //the scene to which the cutting head is bound. Usually "this".
	
		this.size = size;	//the size (radius of circle for now) of the object
		
		this.keymanager = keymanager;	//the key manager responsible for handling this cut head
	
		this.object = scene.add.circle(game.input.mousePointer.x,game.input.mousePointer.y,this.size,'0xffffff'); //the game object associated with this cutting head
		
		this.speed = speed;	//the speed (in pixels per frame) which the cutting head moves at when a button is held down
		
		this.x_max = x_max;	//maximum x coordinate allowed for the cut head
		
		this.y_max = y_max;	//maximum y coordinate allowed for the cut head
		
		this.leftClicking = false; //tracks whether the left mouse button is currently being held down. Used to determine when a click has occurred. 
		
		this.ResetPosition(); //starts the cuthead cursor at the mouse location
		
		this.line = scene.add.line(0,0,this.object.x,this.object.y,this.object.x,this.object.y); //initiates cut line. The coordinates will update during clicking
		
	}
	
	GoWhite()
	{
		this.object.fillColor = '0xffffff';
	}
	
	GoBlue()
	{
		this.object.fillColor = '0x00c9ff';
	}
	
	ResetPosition() 
	{
		this.object.setPosition(game.input.mousePointer.x, game.input.mousePointer.y);	//resets location of the cut head to the mouse pointer
	}
	
	ListenForMouse()	//listens for mouse input
	
	{
		if (game.input.activePointer.leftButtonDown() == true)	//if left click is being held down
		{
			console.log("cutting");
			
			if (this.leftClicking == false) //first frame where click is detected
			{
				this.DesignateCutStart();	//tells the game a cut is beginning
			}
			
			this.leftClicking = true;	//tracks click, so that we can then track release 
			//also to do: draw the graphics line
		}
		
		if (game.input.activePointer.leftButtonDown() == false & this.leftClicking == true)	//if left click is released
		{
			console.log("done cutting");
			
			this.leftClicking = false;
			
			this.DesignateCutEnd();	//tells the game a cut is ending, starts line placement chain
			this.ResetCutLocation();	//resets the location of the cut coordinates to 0
		}
	}
	
	ListenForKeys()	//listens for key input
	
	{
		
			
		if(this.keymanager.arrows.left.isDown & this.object.x >= this.speed)
		{
			this.object.x -= this.speed;
		}
			
		if(this.keymanager.arrows.right.isDown & this.object.x <= this.x_max-this.speed)
		{
			this.object.x += this.speed;
		}
		
		if(this.keymanager.arrows.up.isDown & this.object.y >= this.speed)
		{
			this.object.y -= this.speed;
		}
			
		if(this.keymanager.arrows.down.isDown & this.object.y <= this.y_max-this.speed)
		{
			this.object.y += this.speed;
		}
						
		
	}
	
	ResetCutLocation() //resets the cutting line coordinates
	
	{
		this.line.x1 = 0;
		this.line.x2 = 0;
		this.line.y2 = 0;
		this.line.y1 = 0;
	}
	
	DesignateCutStart()	//designates start point for cutting
	
	{
		
		this.GoBlue();
		
		this.line.x2 = this.object.x; //updates line coords
		this.line.y2 = this.object.y;
		console.log("Cut starting at " + this.line.x1 + "," + this.line.y1 + ".");
	}
	
	DesignateCutEnd() //designates end point for cutting
	
	{
		console.log("Cut ending at " + this.line.x2 + "," + this.line.y2 + ".");
		this.GoWhite();
		
		this.InitiateCutLine(); //calls a method to create a line and check its intersection with all the blood vessel splines in the scene
	}
	
	DrawLine() //this function is called every frame if the left mouse button is held down. It deletes and redraws a *graphics* line over the cuthead's cutting line.
	{
		//PLACEHOLDER
	}
	
	HideLine()	//this function will be called at the end of a cut to hide the line.
	{
		
	}
	
	InitiateCutLine()//method which takes the cut head's current cutting line, and checks its intersection with all blood vessels in the scene.
	
	{
		//PLACEHOLDER
		
	}
	
}
