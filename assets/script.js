const questions = [
    {
        question: "Which green is usually found in a Caesar salad",
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

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        
    });
}

startQuiz();