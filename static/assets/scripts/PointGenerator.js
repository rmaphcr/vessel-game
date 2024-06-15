	class pointGenerator // This class's purpose is to generate a pair of points within a specified screen boundary. 
	{
		
		constructor(scene)
		{
			//below members define the area the generator draws points within. Screen size with offset buffer by default.
			this.boundaryX1 = standardOffset;
			this.boundaryX2 = w - standardOffset;
			this.boundaryY1 = standardOffset;
			this.boundaryY2 = h - standardOffset;
			this.scene = scene
		}
		
		GenerateEndPoints()
		{
			
			//randomly generates two endpoints for a vessel and returns their coordinates as a VesselCoordinates object instance
			
			var coords = new vesselCoordinates();
			
			const whichEdge = this.scene.RNG.between(1,2);	//Flips a coin to determine whether the vessel is generated spanning top and bottom, or left and right
			
			switch(whichEdge)
			{
				case 1: //Top and bottom

				
				coords.SetCoordinates(
				this.scene.RNG.between(this.boundaryX1,this.boundaryX2), 			//X1
				this.boundaryY1, 							//Y1
				this.scene.RNG.between(this.boundaryX1,this.boundaryX2), 			//X2
				this.boundaryY2								//Y2
				);
				
				
				break;
				
				case 2: //Left and right

				
				coords.SetCoordinates( 											
				this.boundaryX1,							//X1
				this.scene.RNG.between(this.boundaryY1,this.boundaryY2),			//Y1
				this.boundaryX2,							//X2
				this.scene.RNG.between(this.boundaryY1,this.boundaryY2)			//Y2
				);
				
				break;
				
				default:
				
				coords.SetCoordinates(0,0,0,0);
				
				break;

			}
			
			return coords; 
			
		}
		
		GenerateMidPoints(coords)
		{
			//Given a vesselCoordinates, returns an array of n evenly spaced points between the endpoints.
			var pointArray = [];
			
			//console.log("GENERATING VESSEL MIDPOINTS");

			for (var i = 1;2*i <= splinePoints * 2;i++)
			{
			
				//console.log("LOOP CONTINUES");
				
				var stepX = Math.abs(coords.point2.x-coords.point1.x)/(splinePoints+1);
				var stepY = Math.abs(coords.point2.y-coords.point1.y)/(splinePoints+1);
				
				if (coords.point1.x > coords.point2.x)
				{
					stepX *= -1;
				}
				
				if (coords.point1.y > coords.point2.y)
				{
					stepY *= -1;
				}
			
				let newX = coords.point1.x + (i*stepX); 
				let newY = coords.point1.y + (i*stepY);
				var newPoint = new point(newX,newY);
				
				//console.log("pushing to pointArray")
				pointArray.push(newPoint);
				
			} 
			
			
			return pointArray;
			
		}
	}
