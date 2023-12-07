	//This class holds the coordinates of blood vessel nodes points.
	
	class vesselCoordinates
	
	{

		//Point 1
		point1 = new point;
		//Point 2
		point2 = new point;
		
		vesselCoordinates(a,b,c,d) 
		{
			
		//Known issue: this constructor doesn't actually work for the time being. Use SetCoordinates after creating instance or coords will always be default.
		
		this.point1.x = a;
		this.point1.y = b;
		this.point2.x = c;
		this.point2.y = d;
			
		}
		
		SetCoordinates(a,b,c,d)
		{
			
		//Sets coordinates for the blood vessel's endpoints. 
		
		this.point1.x = a;
		this.point1.y = b;	
		this.point2.x = c;
		this.point2.y = d;
		
		}
		
			
	}
