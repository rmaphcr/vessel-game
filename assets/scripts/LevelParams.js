	class levelParams
	{
		
		/* This class is used to store the parameters which characterize a game level. Instances will be fed into 
		member functions of the level generator class (when that's implemented) to tell it what it needs to
		generate. */
		
		constructor(difficulty,camSize) 
		{	
			this.difficulty = difficulty; 	//Number of blood vessels to generate
			this.camSize = camSize;			//Size of camera aperture (proportional to half screen width)
		}

	}
