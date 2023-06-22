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

let classArray;

function submitForm() {
	for (answer of answers) {
		if (answer.checked) {
			classArray = answer.className.split(" ");
			for (classes of classArray) {
				for (character of theCharacters) {
					if (classes == character.name) {
						character.count++;
					}
				}
			}		//REMOVAL STARTS HERE
		}		
	}
	tallyingUp();
}

let result = [];
function tallyingUp() {

	result[0] = {
		name: null,
		count: 0,
	};
	for (char1 of theCharacters) {
		for (char2 of theCharacters) {
			if (char1.count > char2.count) {
				if (char1.count > result[0].count) {
					result[0] = char1;
				} else if (char1.count == result[0].count) {
					for (res of result) {
						if (char1.name == res.name) {
							x = true;
						} else if (char1.name != res.name) {
							x = false;
						}
					}
					if (x == false) {
						result.push(char1);
					}
				}
			}
		}
	}

	mainQuestions.style.display = "none";

	if (result.length < 2) {
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
		}
	}
}