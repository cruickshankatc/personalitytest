let body = document.body;
let mainSection = document.getElementById("mainQuestions"); 
let answers = mainSection.getElementsByTagName("input"); //Grabs the input/radio values. All are grabbed regardless of the question they fall under
let answers2 = tieBreakerQuestions.getElementsByTagName("input");

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



function submitForm() { //Performed when 'Submit' is clicked. Adds to 'theCharacters.count' if 'theCharacters.name' equals a class in the answers
	let classArray; //Array that holds name of every character corresponding to the answer. Values replaced on every loop through a new question
	for (answer of answers) {
		if (answer.checked) {
			classArray = answer.className.split(" "); //Accounts for possibility of multiple characters corresponding to one answer
			for (classes of classArray) {
				for (character of theCharacters) {
					if (classes == character.name) { //Whatever characters are within 'classArray' will be matched to corresponding name in 'theCharacters' and that character's count will be increased
						character.count++;
					}
				}
			}	
		}		
	}
	tallyingUp();
}


let highestCount;
let result = [];

function tallyingUp() { 
	highestCount = Math.max.apply(Math, theCharacters.map(function(o) { return o.count; }));
	for (x = 0; x < theCharacters.length; x++) {
		if (theCharacters[x].count == highestCount) {
			result.push(theCharacters[x]);
		}
	}

	mainQuestions.style.display = "none";

	if (result.length < 2) {
		body.innerHTML = `<p>You are ${result[0].name}!</p>`
		console.log(`You are ${result[0].name}!`);
	} else {
		console.log(`Now for the tie breaker question!`);
		tieBreaker();
	}
}


function tieBreaker () {
	tieBreakerQuestions.style.display = "block";
	let tbs = tieBreakerQuestions.getElementsByTagName("p");
	for (x = 0; x < tbs.length; x++) {
		for (y = 0; y < result.length; y++) {
			if (tbs[x].className == result[y].name) {
				tbs[x].style.display = "block";
			}
		}
	}
}

function submitForm2 () {
	for (answer of answers2) {
		if (answer.checked) {
			console.log(`You are ${answer.className}!`);
			body.innerHTML = `<p>You are ${answer.className}!</p>`
		}
	}
}