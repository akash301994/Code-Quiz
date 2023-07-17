
// array of question with either boolean value of true or false.
const questions = [
    {
        question: "Which green is usually found in a Caesar salad?",
        answers: [
            {text: "spinach", correct: false},
            {text: "romaine", correct: true},
            {text: "asparagus", correct: false},
            {text: "mint", correct: false},
        ]
    },
    {
        question: "Ray Charles was famous for playing which instrument?",
        answers: [
            {text: "violen", correct: false},
            {text: "drums", correct: false},
            {text: "guitar", correct: false},
            {text: "piano", correct: true},
        ]
        
    },
    {
        question: "Which country invented tea?",
        answers: [
            {text: "India", correct: false},
            {text: "China", correct: true},
            {text: "America", correct: false},
            {text: "Japan", correct: false},
        ]
    },
    {
        question: "how many wisdom teeth does the average adult have?",
        answers: [
            {text: "4", correct: true},
            {text: "5", correct: false},
            {text: "1", correct: false},
            {text: "none", correct: false},
        ]
    }
];

// selecters to target html elements

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const mainContainer = document.getElementById("app");

// global variables for timer. 
var count = 60;
var interval;

// this shows the quiz questions once start button is clicked. 
let show = function() {
    mainContainer.style.display = 'block';
    timerControl();
    document.querySelector('.quiz-intro').style.display = 'none';
}

let currentQuestionIndex = 0;
let score = 0;

//quiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

    }
startQuiz();



function timerControl() {

      interval = setInterval(function(){
        
      document.getElementById('count').textContent = 'Timer ' + count + ' seconds left';
      count--;
      if (count <= 0){
        clearInterval(interval);
        document.getElementById('count').innerHTML='Your time ran out!, please click next';
        
      }
    }, 1000);
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}
  
// sumbit scores and local storage function

function showScore (){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'initials');
    
    const button = document.createElement('button');
    
    button.textContent = 'submit'
    button.onclick = scores
    document.querySelector('#answer-buttons').innerHTML = ""
    document.querySelector('#answer-buttons').append(input, button);

}

function scores() {
    var initials = document.querySelector('#initials').value
    console.log(initials);
    var player = {
        name: initials, 
        scores: score
    }
    console.log(player)
    var playerHistory = JSON.parse(localStorage.getItem('history')) || [];
    playerHistory.push(player);
    localStorage.setItem('history', JSON.stringify(playerHistory));


}



function highScores() {
    var playerHistory = JSON.parse(localStorage.getItem('history')) || [];
    questionElement.innerHTML = 'Your Highscores!';
  
    var scoresContainer = document.getElementById('app');
  
    // Clear any existing content inside the app div
    scoresContainer.innerHTML = '';
  
    // Iterate over each player in playerHistory
    playerHistory.forEach(function (player) {
      var playerScore = document.createElement('p');
      playerScore.textContent = 'Player: ' + player.name + ' - Score: ' + player.scores;
      scoresContainer.appendChild(playerScore);
    });
  }



nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
})