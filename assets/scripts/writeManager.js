class writeManager
{
	//this class handles writing the array of level record JSONs into a csv, which can then be downloaded by the user
	//I should make it work for any list of same-class JSON strings, so I won't need to keep messing with this if I change the members of the level record class later
	
	constructor()
	{
		
	}
	
	writeCSV(arr)
	{
		//function containing the entire process of converting the array to a CSV
		//where arr is an array of JSON strings created from the same object class
		//returns an array containing other arrays
		//the first of these inner arrays contains the keys
		//all arrays afterwards will contain the values
		
		
		let exportArray = [writeHeader(arr)] //begins by writing the header.
		var currentLine = "";
		
		for (var i = 0;i < arr.length() ; i++)
		{
			newLine()	//moves to new line
			currentLine = writeLine(i);
			exportArray.push(currentLine);
		}
		
		return exportArray;
	}
	
	newLine()
	{
		//moves to a new line
	}
	
	writeHeader(arr)
	{
		//produces the header at the top of the CSV file
		//parses the first JSON in the array and makes a list of its member keys,to put at the top of the csv
		//should return an array of the JSON keys
	}
	
	writeLine(whichIndex)
	{
		//produces a single line, containing info on the JSON object stored at whichIndex
		//should return a string of this JSON's values in order
	}
	
	download()
	{
		//turns the csv into a blob and downloads it
	}
	
}
