$(document).ready(function() {
  var i = 0;
  var gameOn = false; // game off
  var userSeq = []; // stores user sequence
  var simonSeq = []; // stores game sequence
  var colorArr = ["green", "red", "yellow", "blue"]; // stores possible colors for sequence
  var id = 0;
  var level = 0;
  var strict = false;
  var boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
  ];
  //onoff switch
  $(".switcher").click(function() {
    if (gameOn === false) {
      $(".switch").css("right", "-20px");
      $(".count").text("00");
      $(".btn").css("cursor", "pointer");
      $(".count").css("color", "#dc0d29");
      gameOn = true;
    } else {
      level = 0;
      simonSeq = [];
      userSeq = [];
      strict = false;
      $(".switch").css("right", "0px");
      $(".count").text("--");
      $(".btn").css("cursor", "");
      $(".count").css("color", "#430710");
      $(".btn-warning").css("background", "#ffc107");
      gameOn = false;
      clearInterval(myInterval);
    }
  }); //end onoff switch
  //1 start board sequence
  $(".start").click(function() {
    // game needs to be on
    if (gameOn) {
      startSequence();
    }
  });
  //strict mode
  $(".strict").click(function() {
    // game needs to be on
    if (gameOn && strict === false) {
      strict = true;
      $(".btn-warning").css("background", "black");
    } else if (strict && gameOn) {
      strict = false;
      $(".btn-warning").css("background", "#ffc107");
    }
  });
  // user pad listener
  $(".colors").click(function() {
    if (gameOn) {
      id = $(this).attr("id");
      addColorSound(id);
      userSeq.push(id);
      //check user input
      if (!checkUserSeq()) {
        userSeq = [];
        displayError();
      }
      //check end of sequence
      if (userSeq.length === simonSeq.length && userSeq.length < 20) {
        level++;
        userSeq = [];
        startSequence();
      }
      // win check
      if (userSeq.length === 20) {
        $(".count").text("WIN!");
        simonSeq = [];
        level = 0;
      }
    }
  });
  // check UserInput == simonSequence
  function checkUserSeq() {
    for (var i = 0; i < userSeq.length; i++) {
      if (userSeq[i] !== simonSeq[i]) {
        return false;
      }
    }
    return true;
  }
  //error function
  function displayError() {
    $(".count").text("Err");
    // strict --> level = 0;
    if (strict) {
      level = 0;
      simonSeq = [];
      clearInterval(myInterval);
    }
    simonSeq.splice(-1, 1);
  }

  // create random color and push into simonSeq arr
  function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(colorArr[random]);
  }
  // play special sound for each color
  function playSound(id) {
    if (id === "green") {
      var sound = new Audio(boardSound[0]);
      sound.play();
    } else if (id === "red") {
      var sound = new Audio(boardSound[1]);
      sound.play();
    } else if (id === "yellow") {
      var sound = new Audio(boardSound[2]);
      sound.play();
    } else if (id === "blue") {
      var sound = new Audio(boardSound[3]);
      sound.play();
    }
  } // end sound function
  // add brightness and sound when color is pushed to sequence
  function addColorSound(id) {
    $("#" + id).css("filter", "brightness(1.6)");
    playSound(id);
    setTimeout(function() {
      $("#" + id).css("filter", "brightness(1.0)");
    }, 600);
  }
  //sequence
  function startSequence() {
    if (level < 10 && gameOn) {
      $(".count").text("0" + level);
    } else {
      $(".count").text(level);
    }
    getRandomNum();
    i = 0;
    var myInterval = setInterval(function() {
      id = simonSeq[i];
      addColorSound(id);
      i++;
      if (i === simonSeq.length) {
        clearInterval(myInterval);
      }
    }, 1000);
  }
});
