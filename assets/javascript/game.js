var theme = new Audio("assets/audio/theme.mp3");
theme.play();
var correct = 0;
var incorrect = 0;
var timedOut = 0;
var time = 20;
var start = false;
var currentQuestion = 1;
var timeResult = 5000;
var timing = setInterval(timer, 1000);
// Declare questions in an array
var questions = [
  "What do they call a Quarter Pounder with Cheese in France?",
  "Why does Tony Rocky Horror now speak with a speech impediment?",
  "What did Brett take from Marsellus Wallace?",
  "Which Bible verse is Jules 'quoting'?",
  "What does Mia overdose on?",
  "Where did Butch's dad hide his watch while a prisoner in Vietnam?",
  "Why is Marsellus Wallce trying to kill Butch?",
  "What is in the briefcase?"
];

// Declare options for each question in an array of arrays
var options = [
  ["Kilogram with Cheese", "Whopper", "Le Big Mac", "Royale with Cheese"],
  [
    "He was ran over by Butch",
    "He was shot in the face by Vincent",
    "He was thrown out a window for giving Mia Wallace a foot massage",
    "He was beaten up for stealing Marsellus Wallace's case"
  ],
  ["His wife", "A lot of money", "Drugs,", "A briefcase"],
  ["Ezekiel 17:25", "Ezekiel 25:17", "Ezekiel 25:15", "John 3:16"],
  ["Cocaine", "Meth", "Heroin", "Acid"],
  ["His shoe", "His mouth", "His underwear", "His butt"],
  [
    "He was supposed to throw a fight and didn't",
    "He stole money from him",
    "He had an affair with his wife",
    "He gave his wife a foot massage"
  ],
  ["Drugs", "Money", "Gold", "Unknown---not revealed"],
  ["","","",""]
];

// Declare the correct answers in a dictionary
var matrix = {
  1: "4",
  2: "3",
  3: "4",
  4: "2",
  5: "3",
  6: "4",
  7: "1",
  8: "4"
};
// Show results and update stats
function timeOut() {
  $(".option").off("click");
  time = 20;
  clearInterval(timing);
  showResultsArea();
  $(".message").html("Time Out!");
  $("#gif").attr("src", "assets/images/gifs/" + currentQuestion + ".gif");
  $(".correct").html(
    "The correct answer was: " +
      options[currentQuestion - 1][matrix[currentQuestion] - 1]
  );
  currentQuestion++;
  timedOut++;
  setTimeout(function() {
    play();
  }, timeResult);
}
// Display vars in the console log
function logStats() {
  console.clear();
  console.log("time :" + time);
  console.log("correct: " + correct);
  console.log("incorrect: " + incorrect);
  console.log("timed out: " + timedOut);
  console.log("current question: " + currentQuestion);
  console.log("Answer: " + options[currentQuestion - 1][parseInt(matrix[currentQuestion])-1]);
  console.log(`%c ~~~~~~~~~~~~~~~~~~~~~~~~~
| Did you lose something? |
 ~~~~~~~~~~~~~~~~~~~~~~~~~
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     || Made by Luis Suarez.`, "font-family:monospace");
}

//Function to check if an answer is correct
function checkAnswer(element) {
  answer = parseInt(element.currentTarget.id);
  showResultsArea();
  if (answer == matrix[currentQuestion]) {
    correct++;
    $(".message").html(
      options[currentQuestion - 1][element.target.attributes.value.nodeValue] +
        ", Correct!"
    );
    $("#gif").attr("src", "assets/images/gifs/" + currentQuestion + ".gif");
    $(".correct").empty();
    setTimeout(function() {
      play();
    }, timeResult);
  } else {
    incorrect++;
    $(".message").html(
      options[currentQuestion - 1][element.target.attributes.value.nodeValue] +
        ", Incorrect!"
    );
    $("#gif").attr("src", "assets/images/gifs/" + currentQuestion + ".gif");
    $(".correct").html(
      "The correct answer was: " +
        options[currentQuestion - 1][matrix[currentQuestion] - 1]
    );

    setTimeout(function() {
      play();
    }, timeResult);
  }
}

//Hide all but .welcome and .startButton
function showWelcomeArea() {
  $(".welcome").css("display", "unset");
  $(".startButton").css("display", "block");
  $(".question").css("display", "none");
  $(".options").css("display", "none");
  $(".time").css("display", "none");
  $(".results").css("display", "none");
}
//Hide all .question , .options and .time
function showQuestionArea() {
  $(".welcome").css("display", "none");
  $(".startButton").css("display", "none");
  $(".question").css("display", "unset");
  $(".options").css("display", "unset");
  $(".time").css("display", "inline-block");
  $(".results").css("display", "none");
}
//Hide all but .welcome and .results
function showResultsArea() {
  $(".welcome").css("display", "none");
  $(".startButton").css("display", "none");
  $(".question").css("display", "none");
  $(".options").css("display", "none");
  $(".time").css("display", "none");
  $(".results").css("display", "unset");
  $("#gif").css("display", "unset");
}
//Populate the current question
function populateQuestion(number) {
  $(".question").text(questions[number - 1]);
}

//Populate options for the current question
function populateOptions(number) {
  $(".options").css("display", "unset");
  $("#1").text("1) " + options[number - 1][0]);
  $("#2").text("2) " + options[number - 1][1]);
  $("#3").text("3) " + options[number - 1][2]);
  $("#4").text("4) " + options[number - 1][3]);
}

function timer() {
  logStats();
  time--;
  $(".seconds").text(time);
  if (time === 0) {
    timeOut();
  }
  if (time === 0) {
    clearInterval(timing);
  }
}

function restart() {
  logStats();
  clearInterval(timing);
  $(".option").off("click");
  correct = 0;
  incorrect = 0;
  timedOut = 0;
  time = 20;
  start = false;
  currentQuestion = 1;

  showWelcomeArea();
  $(".startButton").on("click", function() {
    $(".startButton").off("click");
    play();
  });
}

function play() {
  $(".seconds").text(time);
  timing = setInterval(timer, 1000);
  logStats();
  if (currentQuestion <= questions.length) {
    showQuestionArea();
    populateQuestion(currentQuestion);
    populateOptions(currentQuestion);

    $(".option").on("click", function(element) {
      clearInterval(timing);
      time = 20;

      checkAnswer(element);
      currentQuestion++;
      $(".option").off("click");
    });
  } else {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timing);
  $(".message").html("THANKS FOR PLAYING!");
  $("#gif").css("display", "none");
  $(".correct").html(
    "<br>Total Questions: " +
      questions.length +
      "<br>Correct Answers: " +
      correct +
      "<br>Incorrect Answers: " +
      incorrect +
      "<br>Timed Out: " +
      timedOut +
      "<br>Grade: " +
      correct / questions.length * 100 +
      "%" +
      '<div class="restartButton">RESTART</div>'
  );

  $(".restartButton").on("click", function() {
    $(".restartButton").off("click");
    restart();
  });
}

restart();
