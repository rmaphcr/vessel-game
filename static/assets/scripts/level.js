class level
{

	constructor(s)
	{
		this.scene = s;
		this.bloodVessels = []; //list where its blood vessels are stored
		this.levelRecord = new levelRecord(1,s);
		this.vesselHandler = new vesselGenerator(this.scene);
	}

	generate()
	{
		//PLACEHOLDER: generating the level
		
		//FIRST: CLEAR EVERYTHING
		this.bloodVessels = [];
		
		this.scene.timer.Reset()
		console.log(this.scene.levelParams.camSize)
		this.scene.camera.Resize(this.scene.levelParams.camSize);
		
		this.scene.vesselGraphics.clear() //clears the graphics
		this.scene.vesselGraphics.lineStyle(5, vesselColour, 1.0);
		this.scene.vesselGraphics.fillStyle(vesselColour, 1.0);
		
		//NOW MAKE A NEW LEVEL
		
		for (var i = 0;i < this.scene.levelParams.difficulty;i++)	//put this inside levelGenerator class?
		{
			var targetVessel = (i == this.scene.levelParams.difficulty - 1) ? (true) : (false); //If this is the last vessel to be placed, tells PlaceVessel that it needs to be real
		
			var newVessel = this.vesselHandler.GenerateVessel(targetVessel);
			
			newVessel.drawLines(this.scene);
			
			//console.log("vessel generation complete, pushing to array")
			
			this.bloodVessels.push(newVessel);
		}
		
	}
	
	recordTime()
	{
		this.levelRecord.setCurrentTime(this.scene.timer) 
	}
	
	grabFOV()
	{
		this.levelRecord.getFOV();
	}
	
	recordResults()
	{
		//saves data to the level record and exports it, then resets level record
		
		//COUNT VESSELS FOR THE LEVEL RECORD
		
		{
			this.countVessels();
		}
		
		//GET THE INTERSECTION NUMBER FOR THE LEVEL RECORD
		
		{
			this.recordIntersections();
		}
		
		//GET THE RECORDED MOTION FOR THE LEVEL RECORD
		
		{
			this.recordMotion();
		}
		
		
		//GET THE RECORDED TIME FOR THE LEVEL RECORD
		{
			this.recordTime()
		}
		
		//GET THE CAMERA FOV
			
		{
			this.grabFOV()
		}
		
		var levelDict = this.levelRecord.createJSONdict()
		console.log(levelDict)
		
		//EXPORT AND RESET THE LEVEL RECORD
		//(testing export code)
		
		//this block sends JSONs to the firebase database, if exportData == true in scripts/Globals
		console.log("Writing results")
		
		fetch("/dbwrite", {
      method: "POST",
      headers: {
	"Content-Type": "application/json"
      },
      body: JSON.stringify({
	      "sessionID" : levelDict["sessionID"], 
	      "number" : levelDict["number"], 
	      "intersections" : levelDict["intersections"],
	      "FOV": levelDict["FOV"],
	      "vessels" : levelDict["vessels"],
	      "mistakes" : levelDict["mistakes"], 
	      "motion" : levelDict["motion"],
	      "mouseMotion": levelDict["mouseMotion"],
	      "time" : levelDict["time"],
	      "idleFlag":levelDict["idleFlag"]
      })
    })
		
		
		this.levelRecord.reset();
		this.scene.levelMotionTotal = 0; //resets level motion. Yes this code is very poorly organised
      
    }
	
	countVessels()
	{
		//counts vessels and tells the level record about it
		this.levelRecord.vesselCount = this.bloodVessels.length;
	}
	
	getFOV()
	{
		this.levelRecord.getFOV()
	}
	
	recordMotion()
	{
		//records how much the cutting head was moved, then resets it
		this.levelRecord.totalMotion = this.scene.levelMotionTotal;
	}
	
	recordIntersections()
	{
		
		
		if (this.bloodVessels.length < 2)	//aborts this and leaves the intersection record unchanged at 0 if there's only 1 blood vessel
		{
			return;
		}
		
		//checks how many times the vessels intersect each other and adds it to the level record
		//this is currently a really nasty nested for loop mess, but I'm not sure how else to do it
		
		
			for (var i = 0;i < this.bloodVessels.length -1 ;i++) //for each blood vessel in the scene (except the last one- by the time we get to it, it's already checked against everything else)
			{
				//console.log("checking intersect of vessel " + i + " and ")
				for (var j = i+1;j<this.bloodVessels.length;j++) //for every blood vessel AFTER that one (prevents repeat checks)- now I think about it, is this kind of process where all the !s come from in statistics formulae?
				{
					//console.log(" vessel " + j + ": ")
					for (var k = 0;k<this.bloodVessels[i].segments.length;k++)	//for each segment in the first blood vessel
					{
						//console.log(" segments " + k + " and ")
						for (var l = 0;l<this.bloodVessels[j].segments.length;l++) //and each segment in the second one
						{
							//console.log(l + ".")
							if (Phaser.Geom.Intersects.LineToLine(this.bloodVessels[i].segments[k],this.bloodVessels[j].segments[l]))	//if the two segments intersect
							{
								this.levelRecord.intersections += 1;	//increment the intersections in the level record
								//console.log("intersection found.")
							}
						}
					}
				}
			}
		
	}

}
