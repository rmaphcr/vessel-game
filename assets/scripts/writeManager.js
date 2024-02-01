class writeManager
{
	//this class handles writing the array of level record JSONs into a csv, which can then be downloaded by the user
	//I should make it work for any list of same-class JSON strings, so I won't need to keep messing with this if I change the members of the level record class later
	
	constructor()
	{
		
	}
	
	prepareCSV(arr)
	{
		//function containing the entire process of converting the array to a CSV
		//where arr is an array of JSON strings created from the same object class
		//returns an array containing other arrays
		//the first of these inner arrays contains the keys
		//all arrays afterwards will contain the values
		
		let exportArray = [this.getHeader(arr)] //begins by writing the header.
		var currentLine = "";
		
		for (var i = 0;i < arr.length ; i++)
		{
			currentLine = this.getLine(arr,i);
			exportArray.push(currentLine);
		}
		
		return exportArray;
	}
	
	newLine()
	{
		//moves to a new line
	}
	
	getHeader(arr)
	{
		//produces the header at the top of the CSV file
		//parses the first JSON in the array and makes a list of its member keys,to put at the top of the csv
		//should return an array of the JSON keys
		
		console.log(Object.keys(JSON.parse(arr[1])))
		return Object.keys(JSON.parse(arr[1]))
	}
	
	getLine(arr,whichIndex)
	{
		//produces a single line, containing info on the JSON object stored at whichIndex
		//should return a string of this JSON's values in order
		console.log(Object.values(JSON.parse(arr[whichIndex])))
		return Object.values(JSON.parse(arr[whichIndex]))
	}
	
	download()
	{
		//turns the csv into a blob and downloads it
	}
	
}
