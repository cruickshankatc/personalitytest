//VARIABLES
let body = document.body;
let mainSection = document.getElementById("mainQuestions"); 
let answers = mainSection.getElementsByTagName("input"); //Grabs the input/radio values. All are grabbed regardless of the question they fall under
let answers2 = tieBreakerQuestions.getElementsByTagName("input");
let result = [];

//RESULTS SCREEN
let resultScreen = document.getElementById("resultScreen");
let resultSpan = document.getElementById("resultSpan");

//CHARACTER ARRAY
let theCharacters = [
	{
		name: "cryofire",
		count: 0,
		faction: "decepticon",
	},
	{
		name: "landmine",
		count: 0,
		faction: "autobot",
	},
	{
		name: "dunerunner",
		count: 0,
		faction: "autobot",
	},
	{
		name: "brainstorm",
		count: 0,
		faction: "autobot",
	},
	{
		name: "triggerhappy",
		count: 0,
		faction: "decepticon",
	},
	{
		name: "starscream",
		count: 0,
		faction: "decepticon",
	},
]

//MAIN FUNCTIONS
/** Performed when 'Submit' is clicked. Adds to 'theCharacters.count' if 'theCharacters.name' 
 * equals a class in the answers
 */
function submitForm() { 	
  // Extract the checked input elements
  const checkedInputs = Array.from(answers).filter(input => input.checked);
	// Extracts the classNames from the checked input elements
	classNames = checkedInputs.reduce((result, n) => {
		const x = n.className.split(" ");
		return result.concat(x);
	}, []);

	/** 
	*Matches the elements in classNames with theCharacters.names which correspond. Every time 
	*an element in classNames equals theCharacters.name, theCharacters.count is increased. 
	*/
	classNames.forEach((className) => {
		const matchedCharacter = theCharacters.find((character) => character.name === className);
		if (matchedCharacter) {
			matchedCharacter.count++;
		}
	});

	tallyingUp();
}

/**
 * Tallies together the counts (i.e. points) that each character has. If one character has more
 * points than all the others he is announced as your match. If multiple characters share the 
 * same high score then tieBreaker() runs.
 */
function tallyingUp() { 
	/**
	 * Searches for theCharacters array for the character (i.e. object) with the highest count.
	 * That character is added to result[]
	 * If multiple characters have the same high score they all added to result[]
	 */
	let highestCount = Math.max.apply(Math, theCharacters.map(function(o) { return o.count; }));
	result.push(...theCharacters.filter(n => n.count === highestCount));

	//Clears the screen for either the Tie Breaking Question or the Results Screen
	mainQuestions.style.display = "none";

	/**
	 * If result[] has only one item the Results Screen is presented (i.e. "You are CharacterX!")
	 * If result[] contains two or more items tieBreaker() runs
	 */
	if (result.length < 2) {
		let resultName = capFirstLetter(result[0].name);
		factionColor(result[0].faction);
		resultScreen.style.display = "block";
		resultSpan.innerHTML = resultName;
	} else {
		tieBreaker();
	}
}

/**
 * If result[] contains more than one item - that is to say - if the user is equally like two
 * or more characters this function runs.
 * A single question is presented and only answers corresponding to the user's top characters 
 * (i.e. those characters named in result[]) are possible options
 */
function tieBreaker () {
	/**
	 * Clears the space within id="tieBreakerQuestions" so no answers are visible.
	 * By the default there answers for each character so we must first clear the space because
	 * we only want answers for specific characters
	 */
	tieBreakerQuestions.style.display = "block";

	//Grab all responses (i.e. the paragraphs) within id="tieBreakerQuestions"
	let tieBreakerParagraphs = Array.from(tieBreakerQuestions.getElementsByTagName("p"));
	
	/**
	 * Finds out which responses (paragraphs) have a className equal to one of the items in 
	 * result[] and makes those paragraphs visible as options with the display "block"
	 */
	tieBreakerParagraphs.forEach((paragraph) => {
		const matchingResult = result.find((r) => paragraph.className === r.name);
		if (matchingResult) {
			paragraph.style.display = "block";
		}
	});
}

/**
 * I didn't revise this function at all.
 * I plan to remove it, and simply revise submitForm() to work for both the main 
 * questions and the Tie Breaking question
 */
function submitForm2 () {
	for (answer of answers2) {
		if (answer.checked) {
			let resultName = capFirstLetter(answer.className);;
			resultScreen.style.display = "block";
			resultSpan.innerHTML = resultName;
			body.innerHTML = `<p>You are <span id="resultName">${resultName}!</span></p>`
		}
	}
}

/**
 * "Refreshes" the page and allows the user to start over.
 * Sets all of the variables back to their default values
 */
function reset () {
	tieBreakerQuestions.style.display = "none";
	resultScreen.style.display = "none";
	mainSection.style.display = "block";

	//RESETS
	//Results array
	result = []; 
	
	//Each character's "points" or "count"
	theCharacters.forEach((character) => {character.count = 0});

	//Bubbles (radio buttons)
	Array.from(answers).forEach((answer) => {answer.checked = false});
}

//SECONDARY FUNCTIONS
function capFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function factionColor(str) {
	if (str == "autobot") {
		resultSpan.style.color = "red";
	} else if (str == "decepticon") {
		resultSpan.style.color = "purple";
	}
}