function quizQuestion(question, choices, correctAnswer) {
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}

var allQuestions = [
  new quizQuestion("What does CSS stand for?", ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], 0),
  new quizQuestion("How do you write and IF statement in JavaScript?", ["if i == 5 then", "if i = 5", "if (i == 5)", "if i == 5 then"], 2),
  new quizQuestion("Which of the following jQuery method get the text contents of an element?", ["text()", "getText()", "getContent()", "none of the above"], 0),
  new quizQuestion("Which sign does jQuery use asa shortcut for jQuery?", ["%", "?", "$", "&"], 2),
  new quizQuestion("What scripting language is jQuery written in?", ["VBScript", "C#", "C++", "JavaScript"], 3),

];

var currentquestion = 0;
var correctAnswers = 0;

function setQuestions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $(".options:eq(0)").prop('checked', true);
}

function checkAnswer() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers++;
  }
}

$(document).ready(function () {

  var $jumbotron = $(".jumbotron");
  var $start = $("#start");
  var $progressbar = $("#progressbar");
  var $next = $("#next");
  var $result = $("#result");

  $jumbotron.hide();
  $start.click(function () {
    $jumbotron.fadeIn();
    $(this).hide();
  });

  $(function () {
    $progressbar.progressbar({
      max: allQuestions.length - 1,
      value: 0
    });
  });

  setQuestions();

  $next.click(function () {
    event.preventDefault();
    checkAnswer();
    currentquestion++;
    $(function () {
      $progressbar.progressbar({
        value: currentquestion
      });
    });
    if (currentquestion < allQuestions.length) {
      setQuestions();
      if (currentquestion == allQuestions.length - 1) {
        $next.html("Submit");
        $next.click(function () {
          $jumbotron.hide();
          $result.html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
          $result.fadeIn(1500);
        });

      }

    };
  });
});