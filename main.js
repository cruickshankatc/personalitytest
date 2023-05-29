let body = document.body;
let answers = document.getElementsByTagName("input"); //Grabs the input/radio values. All are grabbed regardless of the question they fall under
let questions = document.getElementsByTagName("div"); //Each div marks a question.
let points = [];

//For Tallying
let allChars = [0, 0, 0, 0, 0, 0]; //For tallying purposes. Order is very important: allChars[0] = Cryofire, allChars[1] = Landmine, etc.
let allNames = ["Cryofire", "Landmine", "Dune Runner", "Brainstorm", "Triggerhappy", "Starscream"]; //At the end it simply announces who the winner is
let allNames2 = ["cryofire", "landmine", "dunerunner", "brainstorm", "triggerhappy", "starscream"]; //Just to match the names in points[] to tally up in the tallyingUp();

function submitForm() {	
	for (x=0; x < questions.length; x++) {
		for (y=0; y < questions[x].getElementsByTagName("input").length; y++) {
			if (questions[x].getElementsByTagName("input")[y].checked) {
				points[x] = answers[y].className; //Grabs the character name (stored in the className) of the checked option and stores it in the points[] array	
				console.log(points[x]);
			}
		}	
	}	
	tallyingUp();		
}
 
function tallyingUp () {
//Results from each question
//	var point;
	for (x = 0; x < questions.length; x++){
//		point = window["point" + x];
		for (y = 0; y < allChars.length; y++) {
			if (points[x] === allNames2[y]) {
				allChars[y]++;
			} 
		}
	}

 //Final Tally
	for (y = 0; y < allChars.length; y++) {
		if (Math.max(...allChars) === allChars[y]) {
			console.log("You are " + allNames[y]);
		}
	}

} 