class KeyManager

//this thing just holds all the key variables, so you can check whether they're pressed in order to do stuff

{
	
	constructor(scene)
	{
		this.scene = scene;
		this.arrows = this.scene.input.keyboard.createCursorKeys();
		this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}
	
}
