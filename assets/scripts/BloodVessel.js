//this class encapsulates the blood vessel's spline and some of its drawing functions.

class bloodVessel
	
	{
		constructor(endPoints,midPoints,endCol1,endCol2,isTarget,graphics)	//(vesselCoordinates object, array, s)
		{
			this.endPoints = endPoints;										//vesselCoordinates object 
			this.midPoints = midPoints; 									//array of integers, where each pair of integers is a midpoint
			this.endCol1 = endCol1;
			this.endCol2 = endCol2;
			
			this.scene = defaultScene;
			this.graphics = graphics;
			
			this.isTarget = isTarget // true or false. Defines whether or not this blood vessel is the 'chosen one'
		}
		
		setEndPoints(newEnds)
		
		{
			this.endPoints = newEnds;
		}
		
		setMidPoints(newMids)
		{
			this.midPoints = newMids;
		}
		
		setEndCol1(newCol)
		{
			this.endCol1 = newCol;
		}
		
		setEndCol2(newCol)
		{
			this.endCol2 = newCol;
		}
		
		disturbMidPoints(maximum)
		{
			for (var i = 0;i<this.midPoints.length;i++)
			{
				this.midPoints[i].x += Phaser.Math.Between(-maximum,maximum);
				this.midPoints[i].y += Phaser.Math.Between(-maximum,maximum);
				
				if (Math.abs(this.midPoints[i].x) >= w)
					{
						if (this.midPoints[i].x > 0)
						{
							this.midPoints[i].x -= w;
						}
						
						else
						{
							this.midPoints[i].x += w;
						}
					}
			}
		}
		
		drawLines(scene,graphics)
		{
			this.graphics.fillStyle(this.endCol1, 1.0);	
			this.graphics.fillCircle(this.endPoints.point1.x,this.endPoints.point1.y, endPointSize);
			this.graphics.fillStyle(this.endCol2, 1.0);	
			this.graphics.fillCircle(this.endPoints.point2.x,this.endPoints.point2.y, endPointSize); 
			
			this.graphics.fillStyle(vesselColour, 1.0) //reset fill col
			
			var splinePoints = [];
			
			for (var i = 0;i<this.midPoints.length;i++)
			{
				splinePoints.push(this.midPoints[i].x);
				splinePoints.push(this.midPoints[i].y);
			}
			
			splinePoints.unshift(this.endPoints.point1.y);
			splinePoints.unshift(this.endPoints.point1.x);
			
			splinePoints.push(this.endPoints.point2.x);
			splinePoints.push(this.endPoints.point2.y);
			
			//console.log(splinePoints);
			
			let splineX = (splinePoints[0] + splinePoints[splinePoints.length-2])/2;
			let splineY = (splinePoints[1] + splinePoints[splinePoints.length-1])/2;
			//console.log("Spline center:" + splineX + "," + splineY);
			const splineCurve = new Phaser.Curves.Spline(splinePoints);
			this.curve = splineCurve
			let splineObject = scene.add.curve(splineX,splineY,splineCurve);
			this.spline = splineObject;
			
			//console.log("spline created")
			
			this.SplitLine(vesselLineSplits);
			//console.log("spline split")
			this.CreateLineGeometry();
			//console.log("line geometry created")
		}
		
		SplitLine(number)
		{
			this.linePoints = this.curve.getPoints(number+1)
		}
		
		CreateLineGeometry()
		{
			this.segments = []
			
			for (let i = 0; i < this.linePoints.length - 1; i++)
			{
				let segment = new Phaser.Geom.Line(this.linePoints[i].x,this.linePoints[i].y,this.linePoints[i+1].x,this.linePoints[i+1].y); //new line btwn point and next
				this.segments.push(segment); //add line to list
				this.graphics.strokePoints(this.linePoints);
				
			}
		}
		
		Cut()
		{
			console.log("a vessel was cut!") //placeholder
			
			if (this.isTarget == true) //if this is the correct blood vessel
			{
				console.log("This was the target blood vessel.")
				level.levelRecord.complete();
			}
			
			else
			{
				console.log("This was not the target blood vessel.")
				level.levelRecord.incrementMistakes();
			}

		}
	}
