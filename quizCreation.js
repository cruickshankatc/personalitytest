console.log(quiz[0].question);
console.log(quiz[0].answers[3]);

let question1 = document.createElement("p");
question1.innerHTML = quiz[0].question;


function createQuiz() {
  mainSection.appendChild(question1);
}