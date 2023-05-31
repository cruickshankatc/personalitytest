let body = document.body;
let answers = document.getElementsByTagName("input"); //Grabs the input/radio values. All are grabbed regardless of the question they fall under

let theCharacters = [
	{
		name: "cryofire",
		count: 0,
	},
	{
		name: "landmine",
		count: 0,
	},
	{
		name: "dunerunner",
		count: 0,
	},
	{
		name: "brainstorm",
		count: 0,
	},
	{
		name: "triggerhappy",
		count: 0,
	},
	{
		name: "starscream",
		count: 0,
	},
]

function submitForm() {
	for (answer of answers) {
		if (answer.checked) {
			for (character of theCharacters) {
				if (answer.className == character.name) {
					character.count++;
				}
			}		
		}
	}	
	tallyingUp();	
}

function tallyingUp() {
	let result = [];
	result[0] = {
		name: null,
		count: 0,
	};
	for (char1 of theCharacters) {
		for (char2 of theCharacters) {
			if (char1.count > char2.count) {
				if (char1.count > result[0].count) {
					result[0] = char1;
				} else if (char1.count == result[0].count && char1.name != result[0].name) /*THIS WILL NEED TO BE ALTERED AS MORE QUESTIONS ARE ADDED!*/ {
					result.push(char1);
				}
			}
		}
	}
	
	if (result.length < 2) {
		console.log(`You are ${result[0].name}!`);
	} else {
		console.log(`Now for the tie breaker question!`);
	}
}