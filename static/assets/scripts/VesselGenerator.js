class vesselGenerator //this class's methods are called to generate blood vessels in the current scene.
	{
		constructor(scene)
		{
			this.scene = scene
		}
		
		GenerateVessel(target)
		{
			
			//Creates a blood vessel for the target scene, between points created by a pointGenerator.
			//returns the blood vessel object.
			
			var endCol1 = endPointFalseColour; 		// colour of first point placed
			var endCol2 = endPointFalseColour; 		// colour of second point placed
			
			if (target)					// ensures the target vessel has 2 "true" ends.
			{
				endCol1 = endPointTrueColour;
				endCol2 = endPointTrueColour;
			}
				
			else
			{
				if (this.scene.RNG.between(1,3) == 3) 	//1 in 3 chance of decoy vessel having one "true" end 
				{
					endCol1 = endPointTrueColour;
				}
			}
				
			let generator = new pointGenerator(this.scene);
			let endPoints = generator.GenerateEndPoints(); 			//array containing the end points
			let midPoints = generator.GenerateMidPoints(endPoints); //array containing the mid points


			let newVessel = new bloodVessel(this.scene,endPoints,midPoints,endCol1,endCol2,target);
			newVessel.disturbMidPoints(midPointDisturbance);
				
			return newVessel;
		
		}
	}
