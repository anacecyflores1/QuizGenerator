// timer and scorebox global variables
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".startTimer");
var resetButton = document.querySelector(".resetButton");
var scoreBox = document.querySelector(".scoreBox");
var timerBox = document.querySelector(".TimerBox");
var quizBox = document.querySelector(".QuizBox");
var timer = document.querySelector("#timer");
// var currentScore = document.querySelector("#currentScore");
// quiz section global variables
var questionDisplay = document.querySelector("#questionT");
var choiceDisplay1 = document.querySelector("#choiceA");
var choiceDisplay2 = document.querySelector("#choiceB");
var choiceDisplay3 = document.querySelector("#choiceC");
var choiceDisplay4 = document.querySelector("#choiceD");
// High score & user initails

var submitBtn = document.getElementById("submit");

var highTitle = document.getElementById("high-title");

// Question Carousel (from student practice #18)
var currentQuestion = 0;
// 60 seconds given for the quiz
var startTime = 60;
// global scorbece variable
var score = 0;

// timer function
function timerStart() {
  let timeInterval;
  timeInterval = setInterval(function () {
    if (startTime >= 1) {
      startTime--;
      timer.textContent = startTime + " Time Left";
    } else {
      clearInterval(timeInterval);
      timer.textContent = "Quiz Over!";
    }
  }, 1000);
}

// Question Index
var questions = [
  {
    questionTitle: "HTML is considered as ______ ?",
    choiceA: "Programming language ",
    choiceB: "High Level Language",
    choiceC: "High Level Language",
    choiceD: "Markup Language",
    correctAnswer: "choiceD",
  },
  {
    questionTitle: "HTML uses____?",
    choiceA: "user-defined tags",
    choiceB: "predefined tags",
    choiceC: "Fixed tags defined by the language",
    choiceD: "tags for links only",
    correctAnswer: "choiceC",
  },
  {
    questionTitle:
      " If we want to set the style for just one element, which css selector will we use?",
    choiceA: "id ",
    choiceB: "text",
    choiceC: "class",
    choiceD: "name",
    correctAnswer: "choiceA",
  },
  {
    questionTitle: " Which organization defines Web standards?",
    choiceA: "Apple Inc. ",
    choiceB: "IBM Corporation",
    choiceC: "World Wide Web Consortium",
    choiceD: "Microsoft Corporation",
    correctAnswer: "choiceC",
  },
];
// Questions Function
function showQuestions() {
  questionDisplay.textContent = questions[currentQuestion].questionTitle;
  choiceDisplay1.textContent = questions[currentQuestion].choiceA;
  choiceDisplay2.textContent = questions[currentQuestion].choiceB;
  choiceDisplay3.textContent = questions[currentQuestion].choiceC;
  choiceDisplay4.textContent = questions[currentQuestion].choiceD;
}

// This function hides items in the beginning of quiz
function startQuiz() {
  var titleSection = document.querySelector(".TitleBox");
  console.log(titleSection);
  titleSection.classList.add("hide");

  timerBox.classList.remove("hide");
  quizBox.classList.remove("hide");
  showQuestions();
  timerStart();
  // iterate through questions
  document.querySelectorAll(".choiceButtons").forEach((item) => {
    item.addEventListener("click", (event) => {
      if (
        event.currentTarget.innerText ===
        questions[currentQuestion].correctAnswer
      ) {
        score++;
      } else {
        startTime -= 10;
      }
      currentQuestion++;
      if (currentQuestion > 3) {
        titleSection.classList.add("hide");
        scoreBox.classList.remove("hide");
        timerBox.classList.add("hide");
        quizBox.classList.add("hide");
        initialsInput();
      } else {
        showQuestions();
      }
    });
  });
}
function initialsInput() {
  console.log(startTime);
  score += startTime;
  var finalScore = localStorage.getItem("scoreHi");
  console.log(finalScore);

  if (finalScore === null) {
    highArray = [];
  } else {
    highArray = JSON.parse(finalScore);
  }

  // showScores();
}

function showScores() {
  var stringArray = JSON.stringify(highArray);
  localStorage.setItem("scoreHi", stringArray);

  var finalScore = localStorage.getItem("scoreHi");
  console.log(finalScore);
  var unRavel = JSON.parse(finalScore);

  for (var i = 0; i < unRavel.length; i++) {
    var userScore = document.createElement("li");
    userScore.textContent = unRavel[i];
    highTitle.appendChild(userScore);
  }
  console.log(unRavel);
}
// submit.addEventListener("click", function (e) {
//   // console.log(input.value);
// });

// Re-start quiz/timer
function restartQuiz() {
  // startQuiz();
  var titleSection = document.querySelector(".TitleBox");
  console.log(titleSection);
  titleSection.classList.remove("hide");
  scoreBox.classList.add("hide");
  timerBox.classList.add("hide");
  quizBox.classList.add("hide");
  showQuestions();
  timerStart();
}
// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", restartQuiz);
submit.addEventListener("click", function (e) {
  if (input.value === "") {
    alert("Please Enter your initials!");
    return;
  }
  console.log(input.value);
  newGrade = `${input.value} Score: ${score}`;

  highArray.push(newGrade);
  scoreBox.classList.remove("hide");
  submitBtn.style.display = "none";

  showScores();
});

clearBtn.addEventListener("click", clearScore);

function clearScore() {
  localStorage.clear();
}
