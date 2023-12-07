	class levelParams
	{
		
		/* This class is used to store the parameters which characterize a game level. Instances will be fed into 
		member functions of the level generator class (when that's implemented) to tell it what it needs to
		generate. */
		
		difficulty = 1;				//governs how many blood vessels are placed
		levelType = "FULL"; 			//unused for now, will govern whether the level has restricted FOV and the mosaicing effect.
		
		SetParams(d) 				//I would set this through a constructor instead, but for whatever reason it doesn't work, I have to create a default levelParams and then call this.
		{
									
			
			this.difficulty = d;
		}

	}
