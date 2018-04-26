var correct = 0;
var incorrect = 0;
var timedOut = 0;
var time = 20;
var start = false;
var currentQuestion = 0;

// Declare questions in an array
var questions = [
  "What do they call a Quarter Pounder with Cheese in France?",
  "Why does Tony Rocky Horror now speak with a speech impediment?",
  "What did Brett take from Marsellus Wallace?",
  "Which Bible verse is Jules 'quoting'?",
  "What does Mia overdose on?",
  "Where did Butch's dad hide his pocketwatch while a prisoner in Vietnam?",
  "Why is Marsellus Wallce trying to kill Butch?",
  "What is in the briefcase?",
];

// Declare options for each question in an array of arrays
var options = [
  ["Kilogram with Cheese", "Whopper", "Le Big Mac", "Royale with Cheese"],
  ["He was ran over by Butch","He was shot in the face by Vincent", "He was thrown out a window for giving Mia Wallace a foot massage", "He was beaten up for stealing Marsellus Wallace's case"],
  ["His wife","A lot of money","Drugs,","A briefcase"],
  ["Ezekiel 17:25","Ezekiel 25:17","Ezekiel 25:15","John 3:16"],
  ["Cocaine","Meth","Heroin","Acid"],
  ["His shoe","His mouth","His underwear","His butt"],
  ["He was supposed to throw a fight and didn't","He stole money from him","He had an affair with his wife","He gave his wife a foot massage"],
  ["Drugs","Money","Gold","Unknown---not revealed"],
];

// Declare the correct answers in a dictionary 
var matrix = {
  1: "4",
  2: "3",
  3: "4",
  4: "2",
  5:"3",
  6:"4",
  7:"1",
  8:"4",

};

// Hold the main from runing until page is loaded
$(document).ready(function() {
  play();


// Recursive function to play
  function play() {
    if (start == false) {
      showWelcome();
      $(".startButton").on("click", function() {
        start = true;

        $(".startButton").off("click");

        play();
      });
    } else {
      var interval = setInterval(function() {
        time--;
        $(".seconds").text(time);
        if (time == 0) {
          showResults();
          $(".message").html("Time Out!");
          $("#gif").attr(
            "src",
            "assets/images/gifs/" + currentQuestion + ".gif"
          );
          $(".correct").html(
            "The correct answer was: " +
              options[currentQuestion - 1][matrix[currentQuestion] - 1]
          );
          clearInterval(interval);
          timedOut++;
          setTimeout(function() {
            play();
          }, 8000);
        }
      }, 1000);
      currentQuestion++;
      showQuestion();
      populateQuestion(currentQuestion);
      populateOptions(currentQuestion);
      time = 20;
      $(".options").on("click", function(element) {
        clearInterval(interval);
        checkAnswer(element);
      });
    }
  }


  //Function to check if an answer is correct
  function checkAnswer(element) {
    if (element.target.id == matrix[currentQuestion]) {
      showResults();
      $(".message").html(
        options[currentQuestion - 1][
          element.target.attributes.value.nodeValue
        ] + ", Correct!"
      );
      $("#gif").attr("src", "assets/images/gifs/" + currentQuestion + ".gif");

      correct++;
      setTimeout(function() {
        play();
      }, 2000);
    } else {
      showResults();
      $(".message").html(
        options[currentQuestion - 1][
          element.target.attributes.value.nodeValue
        ] + ", Incorrect!"
      );
      $("#gif").attr("src", "assets/images/gifs/" + currentQuestion + ".gif");
      $(".correct").html(
        "The correct answer was: " +
          options[currentQuestion - 1][matrix[currentQuestion] - 1]
      );

      incorrect++;
      setTimeout(function() {
        play();
      }, 2000);
    }
  }
  //Hide all but .welcome and .startButton 
  function showWelcome() {
    $(".welcome").css("display", "unset");
    $(".startButton").css("display", "block");
    $(".question").css("display", "none");
    $(".options").css("display", "none");
    $(".time").css("display", "none");
    $(".results").css("display", "none");
  }
  //Hide all .question , .options and .time 
  function showQuestion() {
    $(".welcome").css("display", "none");
    $(".startButton").css("display", "none");
    $(".question").css("display", "unset");
    $(".options").css("display", "unset");
    $(".time").css("display", "inline-block");
    $(".results").css("display", "none");
  }
  //Hide all but .welcome and .results
  function showResults() {
    $(".welcome").css("display", "none");
    $(".startButton").css("display", "none");
    $(".question").css("display", "none");
    $(".options").css("display", "none");
    $(".time").css("display", "none");
    $(".results").css("display", "unset");
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
});
