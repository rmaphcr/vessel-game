	//This class holds the coordinates of blood vessel end points.
	//it holds two point classes.
	
	class vesselCoordinates
	
	{

		constructor(a,b,c,d) 
		{

		this.point1 = new point(a,b); 	//First point
		this.point2 = new point(c,d);	//Second point
			
		}
		
		SetCoordinates(a,b,c,d)
		{
			
		//Sets coordinates of the blood vessel's endpoints. 
		
		this.point1.x = a;
		this.point1.y = b;	
		this.point2.x = c;
		this.point2.y = d;
		
		}
		
		GetCoordinates() 
		
		//Returns an array containing [point 1.x,point 1.y, point2.x, point2.y]
		{
		
		return [this.point1.x,this.point1.y,this.point2.x,this.point2.y];
		
		}
		
			
	}
