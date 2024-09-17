function submitFormOld() { 	
	let classArray; 
	for (answer of answers) {
		if (answer.checked) {
			classArray = answer.className.split(" "); 
			for (classes of classArray) {
				for (character of theCharacters) {
					if (classes == character.name) { 
						character.count++;
					}
				}
			}	
		}		
	}
	tallyingUp();
}

let classArray2

function submitForm() {
  
}