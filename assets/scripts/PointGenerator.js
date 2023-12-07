	class pointGenerator // This class's purpose is to generate a pair of points within a specified screen boundary. 
	{

		
		//below members define the area the generator draws points within. Screen size with offset buffer by default.
		
		boundaryX1 = standardOffset;
		boundaryX2 = w - standardOffset;
		boundaryY1 = standardOffset;
		boundaryY2 = h - standardOffset;
		
		pointGenerator(a,b,c,d,o)
		{
		//constructor, allows assignment of boundary variables. Doesn't work, like all constructors in this program.
			
			this.boundaryX1 = a;
			this.boundaryX2 = b;
			this.boundaryY1 = c;
			this.boundaryY2 = d;
		}
		
		GenerateEndPoints()
		{
			
			//randomly generates two endpoints for a vessel and returns their coordinates as a VesselCoordinates object instance
			
			var coords = new vesselCoordinates();
			
			var whichEdge = Phaser.Math.Between(1,2);	//Flips a coin to determine whether the vessel is generated spanning top and bottom, or left and right
			
			switch(whichEdge)
			{
				case 1: //Top and bottom

				
				coords.SetCoordinates(
				Phaser.Math.Between(this.boundaryX1,this.boundaryX2), 			//X1
				this.boundaryY1, 							//Y1
				Phaser.Math.Between(this.boundaryX1,this.boundaryX2), 			//X2
				this.boundaryY2								//Y2
				);
				
				
				break;
				
				case 2: //Left and right

				
				coords.SetCoordinates( 											
				this.boundaryX1,							//X1
				Phaser.Math.Between(this.boundaryY1,this.boundaryY2),			//Y1
				this.boundaryX2,							//X2
				Phaser.Math.Between(this.boundaryY1,this.boundaryY2)			//Y2
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
			
			var newX = 0;
			var newY = 0;
			
			console.log("GENERATING VESSEL MIDPOINTS");

			for (var i = 1;2*i <= splinePoints * 2;i++)
			{
			
				console.log("LOOP CONTINUES");
				
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
			
				newX = coords.point1.x + (i*stepX); 
				newY = coords.point1.y + (i*stepY);
				var newPoint = new point();
				newPoint.SetCoordinates(newX,newY);
				
				pointArray.push(newPoint);
				
			} 
			
			
			return pointArray;
			
		}
	}
