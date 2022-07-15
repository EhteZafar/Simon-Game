

var buttonColours = ["red", "blue", "green", "yellow"];

var clickedPattern = [];

var gamePattern = [];

var lvl = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + lvl);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var chosenColor = $(this).attr("id");
  clickedPattern.push(chosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(clickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {

      console.log("success");

      if (clickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      console.log("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }

}

function nextSequence() {
  clickedPattern = [];
  lvl++;
  $("#level-title").text("Level " + lvl);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
  animatePress(randomColor);
}

function playSound(audio) {
  var audio = new Audio("sounds/" + audio + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  lvl = 0;
  gamePattern = [];
  clickedPattern = [];
  started = false;
}
