class cutHead
{
	
	//This class implements the cutting head.
	
	constructor(scene,size,speed,x_max,y_max)
	{
	
		this.scene = scene; //the scene to which the cutting head is bound. Usually "this".
		
		this.graphics = this.scene.lineGraphics; //the graphics layer which this cutting head draws on (used for line display)
	
		this.size = size;	//the size (radius of circle for now) of the object
		
		this.keyManager = this.scene.keyManager;	//the key manager responsible for handling this cut head
	
		this.object = this.scene.add.circle(game.input.mousePointer.x,game.input.mousePointer.y,this.size,'0xffffff'); //the game object associated with this cutting head
		
		this.speed = speed;	//the speed (in pixels per frame) which the cutting head moves at when a button is held down
		
		this.x_max = x_max;	//maximum x coordinate allowed for the cut head
		
		this.y_max = y_max;	//maximum y coordinate allowed for the cut head
		
		this.leftClicking = false; //tracks whether the left mouse button is currently being held down. Used to determine when a click has occurred. 
		
		this.ResetPosition(); //starts the cuthead cursor at the mouse location
		
		this.line = new Phaser.Geom.Line(0,0,this.object.x,this.object.y,this.object.x,this.object.y); //initiates cut line. The coordinates will update during clicking
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
			this.scene.lineGraphics.clear();
			//console.log("cutting");
			
			if (this.leftClicking == false) //first frame where click is detected
			{
				this.DesignateCutStart();	//tells the game a cut is beginning
				this.scene.lineGraphics.moveTo();
				this.scene.lineGraphics.beginPath();
				this.StartLine();

			}
			
			this.UpdateLine();	
			this.leftClicking = true;	//tracks click, so that we can then track release 
		}
		
		if (game.input.activePointer.leftButtonDown() == false & this.leftClicking == true)	//if left click is released
		{
			//console.log("done cutting");
			
			this.leftClicking = false;
			
			this.DesignateCutEnd();	//tells the game a cut is ending, starts line placement chain
			this.ResetCutLocation();	//resets the location of the cut coordinates to 0
		}
	}
	
	ListenForKeys()	//listens for key input
	
	{
			
		if(this.keyManager.arrows.left.isDown & this.object.x >= this.speed)
		{
			this.object.x -= this.speed;
			this.scene.levelMotionTotal += this.speed;
		}
			
		else if(this.keyManager.arrows.right.isDown & this.object.x <= this.x_max-this.speed)
		{
			this.object.x += this.speed;
			this.scene.levelMotionTotal += this.speed;
		}
		
		if(this.keyManager.arrows.up.isDown & this.object.y >= this.speed)
		{
			this.object.y -= this.speed;
			this.scene.levelMotionTotal += this.speed;
		}
			
		else if(this.keyManager.arrows.down.isDown & this.object.y <= this.y_max-this.speed)
		{
			this.object.y += this.speed;
			this.scene.levelMotionTotal += this.speed;
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
		
		this.line.x1 = this.object.x; //updates line coords
		this.line.y1 = this.object.y;
		//console.log("Cut starting at " + this.line.x1 + "," + this.line.y1 + ".");
	}
	
	DesignateCutEnd() //designates end point for cutting
	
	{
		//console.log("Cut ending at " + this.line.x2 + "," + this.line.y2 + ".");
		this.GoWhite();
		this.graphics.clear()
		
		this.InitiateCutLine(); //calls a method to check the line's intersection with all the blood vessel splines in the scene
	}
	
	StartLine() //this function is called every frame if the left mouse button is held down. It deletes and redraws a *graphics* line over the cuthead's cutting line.
	{
		//PLACEHOLDER
		//console.log("drawing")
		this.graphics.clear();
		this.graphics.moveTo(this.line.x1,this.line.y1);
	}
	
	UpdateLine()
	{
		this.line.x2 = this.object.x;
		this.line.y2 = this.object.y; 
		this.graphics.clear();
		this.graphics.beginPath();
		this.graphics.moveTo(this.line.x1,this.line.y1);
		this.graphics.lineTo(this.line.x2,this.line.y2);
		this.graphics.closePath();
		this.graphics.strokePath();
	}
	
	InitiateCutLine()//method which takes the cut head's current cutting line, and checks its intersection with all blood vessels in the scene.
	
	{
		//currently working
		//console.log("initiating cutting for cut line between:")
		//console.log("(x: " + this.line.x1 + ",y: " + this.line.y1 + ") AND ")
		//console.log("(x: " + this.line.x2 + ",y: " + this.line.y2 + ")")
		
		//console.log(this.scene.level.bloodVessels)
		
		for (var i = 0;i < this.scene.level.bloodVessels.length;i++) //for each blood vessel in the scene
		{
			//console.log("checking blood vessel " + i)
			for (var j = 0; j< this.scene.level.bloodVessels[i].segments.length;j++) //for each line segment in vessel
			{
				//console.log("checking blood vessel " + i + " segment " + j);
				if (Phaser.Geom.Intersects.LineToLine(this.line,this.scene.level.bloodVessels[i].segments[j])) //if segment and cut line intersect
				{
					//console.log("Cut detected in blood vessel " + i + ", segment " + j + "!") //placeholder line to show functionality
					this.scene.level.bloodVessels[i].Cut() //calls cut method of vessel
					break;	//stops multiple cuts of the same segment counting as multiple mistakes, by breaking the segment loop 
				}
			}
		}
	}
	
}
