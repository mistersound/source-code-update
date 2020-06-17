//Load Modules
var fs = require('fs'); //file system module



function map(file) { 
//Begin Script

 var outputs = [];

 fs.readFile(file, function (err, inputText) {

	if (err) throw err;

	//inputText is a buffer
	var text = inputText.toString();

	// split the contents by new line
   	const lines = text.split(/\r?\n/);
	const FED_2016 = 3;
	const L_2016 = 5;
	
	//var outputs = [];
	for (let i = 1; i < lines.length; i++) {
 	  	
  		var line = lines[i];
		var cells = line.split(";");
		var fed_2016 = cells[FED_2016];
		var l_2016 = cells[L_2016];
	//	console.log("key=" + fed_2016 + ", val=" + l_2016);
		var output =  fed_2016 + "," + l_2016;
		
		
		outputs.push(output);
	}
	reduce(outputs);

});
//return outputs;

} 

function reduce(data) {

	var outputs = data;

	var keys = [];
	var values = [];

	for (let j = 0; j < outputs.length; j++) {	
	
		var element = outputs[j].split(",");
	
	
		if(!keys.includes(element[0])){
		
			keys.push(element[0]);
			var index = keys.indexOf(element[0]);
			values[index]= 0;
		}

	
		index = keys.indexOf(element[0]);
		values[index] = parseInt(values[index]) + parseInt(element[1]);		
	}

	for (let j = 0; j < keys.length; j++) {	
		console.log(+ keys[j] + "," + values[j]);
	}

}

var inval = [];
inval = map(process.argv[2]);
//console.log(typeof(inval));
//console.log(inval[0]);
//reduce(inval);

