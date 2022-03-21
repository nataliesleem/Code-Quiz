//Create a quiz class
//ADD A COUNTDOWN
let time = 0.5;
let quizTimeInMinutes = time * 60 * 60
let quizTime = quizTimeInMinutes / 60;
let scores = JSON.parse(localStorage.getItem("allScores")) || [];
console.log("init scores", scores);
const student = {username: 'natalie', score: 5}
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        } else if (!this.getQuestionIndex().isCorrectAnswer(answer)) {
            quizTime = quizTime - 5;
        }
        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }

}
// create a question class 
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }

}
//DISPLAY QUESTION
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;
        //show options
        let choices = quiz.getQuestionIndex().choices
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();

    }
};
//GUESS FUNCTION
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}
//SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}
//  SHOW SCORE
function showScores() {

    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>

    <div id="scoreInput">
    <h2>You Scored: <span id="score">${quiz.score}</span> of ${quiz.questions.length}</h2>
    <input id="username" placeholder="Enter your name">
    <br>
    <button id="save">Save</button>
    <br>
    </div>
    <ul id="scoreData">
    </ul>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `

    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
    
document.getElementById('save').addEventListener('click', saveScore)
}


function saveScore() {
    let score = document.getElementById("score").textContent; 
    let username = document.getElementById("username").value; 
    let data = {score: score, username: username}
    console.log("original array", scores);

    // console.log('save button was clicked!', username, score);
    scores.push(data);
    console.log("array after push", scores);
    localStorage.setItem("allScores", JSON.stringify(scores));

    displayScores();
}
function displayScores() {
    //localStorage.getItem("allScores")  /// [ natalie, 234, erik, 23947]
    let scoreInput = document.getElementById("scoreInput");
    scoreInput.classList.add("hidden");
    let scoreDiv = document.getElementById("scoreData");
    
    for (let i = 0; i < scores.length; i++) {
        let li = document.createElement("li");
        li.innerText = `username: ${scores[i].username} score: ${scores[i].score}`
        scoreDiv.appendChild(li);
    }
}


    
//CREATE QUIZ QUESTIONS
let questions = [
    new Question(
        "What do you use to style a page?", ["HTML", "CSS", "Javascript", "Styles"], "CSS"
    ),
    new Question(
        "In '.answers', what does the '.' represent?", ["A class", "An id", "A break", "Nothing"], "A class"
    ),
    new Question(
        "What do you use to style a page?", ["HTML", "CSS", "Javascript", "Styles"], "CSS"
    ),
    new Question(
        "What do you use to style a page?", ["HTML", "CSS", "Javascript", "Styles"], "CSS"
    ),
    new Question(
        "What do you use to style a page?", ["HTML", "CSS", "Javascript", "Styles"], "CSS"
    )
];
let quiz = new Quiz(questions);
//display question
displayQuestion();

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function () {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();

        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;

        }

    }, 1000)
}
startCountDown();




