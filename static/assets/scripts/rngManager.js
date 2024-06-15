class RNGManager
{
	constructor(scene)
	{
		this.scene = scene
		this.lastSeed = null
	}
	
	Reset(designatedSeed = null) //creates a new seed and sows it into the scene's RNG generator
	{
		if (typeof designatedSeed != 'string')
		{
			var seed = (Date.now() * Math.random()).toString()
		}
		
		else
		{
			var seed = designatedSeed;
		}
		
		this.scene.currentSeed = seed;
		this.scene.RNG.sow(seed);
		this.lastSeed = seed;
		
	}
}
