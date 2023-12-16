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
/**
 * Initiated when the "submit button" is clicked.
 * Makes sure all of the questions are answered.
 * If they are not the user isn't allowed to pass and is given a message
 * telling them to complete the answers.
 * If all the answers are given "submitForm()" is initiated.
 */
function allQuestionsChecked() {
	//Simply used to determine the number of questions (used in the for loop)
	let theQuestions = mainSection.getElementsByTagName("div");

	//Boolean used to see if every question has an answer
	let completedAllQuestions = true;

	//Grabs the alert message text (on page load this text is hidden)
	let alertMessage = document.getElementById("alert");
	
	//Loops through each question
	for (x = 0; x < theQuestions.length; x++) {
		/**
		 * Every question and subsequent answer grouping corresponds to a div 
		 * within the mainSection.
		 * This first variable grabs that div so we can isolate specific answer
		 * groups.
		 */
		let theQuestion = mainSection.getElementsByTagName("div")[x];

		//Creates a nodeList of all the answers for the current question
		let theAnswers = theQuestion.getElementsByTagName("input");
		let theCheck = false;

		/**
		 * Loops through each answer to see if anyone is checked. 
		 * 
		 * As soon as the loop reaches an answer that's checked it sets "theCheck"
		 * to true, breaks out of the current loop and moves onto the next 
		 * question. "theCheck" is once again set to false. Once again, as long as 
		 * the next question has an answer, "theCheck" will be set to true.
		 * 
		 * The loops will continue going through each question. When it finishes and
		 * breaks out of the loop by default it will reach an if statement which will
		 * determine if "completedAllQuestions" is true. This value is true by default
		 * and as long as all of the questions are answered it will never be changed.
		 * Thus, "submitForm()" is initiated.
		 * 
		 * However, if any question has no answer checked, then "theCheck remains".
		 * When the "theCheck" remains false even after all the answers in any given
		 * question are analyzed then "completedAllQuestions" is changed to false.
		 * 
		 * The larger loop (which goes through question after question) is immediately
		 * broken out of. "completedAllQuestions" is evaluated, seen as false and the
		 * user is prompted to finish answering the questions.
		 */
		for (y = 0; y < theAnswers.length; y++) {
			let theAnswer = theQuestion.getElementsByTagName("input")[y];
			if (theAnswer.checked) {
				theCheck = true;
				break;
			} else {
				continue
			}
		}

		//Evaluates "theCheck" for a true or false value
		if (theCheck === false) {
			console.log("need to answer all questions!")
			completedAllQuestions = false;
			break;
		} else {
			console.log("congrats!")
			continue;
		}
		
	}

	//Evaluates "completedAllQuestions" for a true or false value
	if (completedAllQuestions) {
		submitForm();
		alertMessage.style.visibility = "hidden";
	} else {
		console.log("oops!");
		alertMessage.style.visibility = "visible";
	}
}


/** Initiated by allQuestionsChecked(). Performed if every question has been answered. Adds to 'theCharacters.count' if 'theCharacters.name' 
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
	tieBreakerQuestions.style.display = "none";

	/**
	 * If result[] has only one item the Results Screen is presented (i.e. "You are CharacterX!")
	 * If result[] contains two or more items tieBreaker() runs
	 */
	if (result.length < 2) {
		let resultName = capFirstLetter(result[0].name);
		factionColor(result[0].faction);
		resultScreen.style.display = "block";
		body.style.backgroundColor = "#131313";
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
	body.style.backgroundColor = "#131313";

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
		} else {
			paragraph.style.display = "none";
		}
	});
}



function submitForm2 () {
	result = [];
	const checkedInput = Array.from(answers2).filter(input => input.checked);
	x = checkedInput[0].className;
	console.log(x);

	const matchedCharacter = theCharacters.find((character) => character.name === x);
			if (matchedCharacter) {
				matchedCharacter.count++;
			}		
	
	tallyingUp();
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
	
	//Each character's "points" or "count" are reset
	theCharacters.forEach((character) => {character.count = 0});

	//Inputs for main questions are reset
	Array.from(answers).forEach((answer) => {answer.checked = false});

	//Input for Tie Breaker question is reset
	Array.from(answers2).forEach((answer) => {answer.checked = false});
}

//SECONDARY FUNCTIONS
function capFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function factionColor(str) {
	if (str == "autobot") {
		resultSpan.style.color = "#c51818";
	} else if (str == "decepticon") {
		resultSpan.style.color = "#3a0b61";
	}
}