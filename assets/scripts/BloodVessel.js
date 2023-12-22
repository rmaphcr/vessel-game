//this class encapsulates the blood vessel's spline and some of its drawing functions.

class bloodVessel
	
	{
		constructor(endPoints,midPoints,endCol1,endCol2)	//(vesselCoordinates object, array, s)
		{
			this.endPoints = endPoints;								//vesselCoordinates object 
			this.midPoints = midPoints; 							//array of integers, where each pair of integers is a midpoint
			this.endCol1 = endCol1;
			this.endCol2 = endCol2;
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
			
			scene.add.circle(this.endPoints.point1.x,this.endPoints.point1.y, endPointSize, this.endCol1, 1);
			scene.add.circle(this.endPoints.point2.x,this.endPoints.point2.y, endPointSize, this.endCol2, 1); 
			
			for (var i = 0;i<this.midPoints.length;i++) 
			{
				scene.add.circle(this.midPoints[i].x,this.midPoints[i].y,vesselThickness * 2,vesselColour,1);
				console.log("Drew Midpoint At " + this.midPoints[i].x  + "," +  this.midPoints[i].y);
			}
			
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
			
			console.log(splinePoints);
			
			let splineX = (splinePoints[0] + splinePoints[splinePoints.length-2])/2;
			let splineY = (splinePoints[1] + splinePoints[splinePoints.length-1])/2;
			console.log("Spline center:" + splineX + "," + splineY);
			const splineCurve = new Phaser.Curves.Spline(splinePoints);
			let splineObject = scene.add.curve(splineX,splineY,splineCurve);
			this.spline = splineObject;
			
			splineCurve.draw(graphics);
		}
	}
