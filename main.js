//color buttons
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
// all color circles
var circles = document.querySelectorAll('.circle');
//audio
var redAudio = new Audio('assets/simonSound1.mp3');
var greenAudio = new Audio('assets/simonSound2.mp3');
var blueAudio = new Audio('assets/simonSound3.mp3');
var yellowAudio = new Audio('assets/simonSound4.mp3');
var no = new Audio('assets/no.mp3');
//other selectors
var info = document.querySelector('.info');
var board = document.querySelector('.board');
var settings = document.querySelector('.settings');
var reset = document.querySelector('.reset');
var strict = false;
var colors = ['red', 'yellow', 'green', 'blue'];
var j = 0;
var turn = 1;
var win = 21;
var sequenceCurrent = [];

//make circle clicked compare to sequence not circle incremented.
window.onload = function() {
function gameLoop() {
  info.innerHTML = 'Turn 1';
  sequenceAdd();
  sequencePlay();
  clearInterval(counter);
  counter = setInterval(timer, 1000);
  for (var i = 0; i < circles.length; i++) {
      circles[i].onclick = function(e) {
        var circle = this.value;
        colorPlay(circle);
        for (var i = 0; i < sequenceCurrent.length ; i++) {
          if (circle !== sequenceCurrent[j]) {
            j=0;
            info.innerHTML = "Wrong";
            board.classList.add('no-click');
            error();
            if (strict) {
              turn = 1;
              sequenceCurrent = [];
              sequenceAdd();
            }
            setTimeout(function() {
              noClick(turn);
            },1000);
            setTimeout(function(){
              sequencePlay();
            }, 3000);
            clearInterval(counter);
            counter = setInterval(timer, 1000);
            count = 5+(turn*3-sequenceCurrent.length);
            break;
          } else if (j === sequenceCurrent.length-1) {
            j=0;
            sequenceAdd();
            turn++
            if (turn===win) {
              info.innerHTML = " You Win";
              break;
            }
            noClick(turn);
            setTimeout(function() {
            sequencePlay();
          }, 1000);
          clearInterval(counter);
          counter = setInterval(timer, 1000);
          count = 5+(turn*3-sequenceCurrent.length);
          break;
          } else {
            j++;
            break;
          }
        }
      }
    }
  }

  function timer() {
    count -= 1;
    console.log(count);
    if (count <= 0) {
      clearInterval(counter);
      error();
      info.innerHTML = 'Too <br> Slow'
      setTimeout(function() {
        info.innerHTML = 'Turn ' + (turn);
        sequencePlay();
        count = 5+(turn*3-sequenceCurrent.length);
        counter = setInterval(timer, 1000);
        return;
      }, 2000);
    }
  }

  var count = 6;
  var counter = setInterval(timer, 1000);
  clearInterval(counter);



function error() {
  var toBlink = document.querySelectorAll('.circle');
  for (var i = 0; i < toBlink.length; i++) {
    toBlink[i].classList.add('circle-error');
  }
  no.play();
  setTimeout(function() {
    for (var i = 0; i < toBlink.length; i++) {
    toBlink[i].classList.remove('circle-error');
    }
  }, 2000);
}

settings.onclick = function() {
  strict = strict === false ? true : false;
  settings.innerHTML = settings.innerHTML === "Strict Mode OFF" ? "Strict Mode ON" : "Strict Mode OFF";
}

reset.onclick = function() {
  sequenceCurrent = [];
  turn = 1;
  count = 5+(turn*3-sequenceCurrent.length);
  clearInterval(counter);
  gameLoop();
}

function noClick(turn) {
  board.classList.add('no-click');
  info.classList.add('info-scroll');
  setTimeout(function() {
  info.innerHTML = 'Turn ' + (turn);
},500);
  setTimeout(function() {
    board.classList.remove('no-click');
    info.classList.remove('info-scroll');
  }, 1000+(turn*1000));
}

function sequenceAdd() {
  var color = colors[Math.floor(Math.random()*colors.length)];
  sequenceCurrent.push(color);
}


function sequencePlay() {
  var len = sequenceCurrent.length;
  for(var i = 0; i < len; ++i) {
      if(sequenceCurrent[i]=== 'red') {
        setTimeout(function() {redAudio.play(); blink('red');}, i*1000);
      } else if (sequenceCurrent[i]=== 'yellow') {
        setTimeout(function() {yellowAudio.play(); blink('yellow');}, i*1000);
      } else if (sequenceCurrent[i]=== 'green') {
        setTimeout(function() {greenAudio.play(); blink('green');}, i*1000);
      } else if (sequenceCurrent[i]=== 'blue') {
        setTimeout(function() {blueAudio.play(); blink('blue');}, i*1000);
      }
  }
}


function blink(color) {
  var toBlink = document.getElementById(color)
  toBlink.classList.add('circle-blink');
  setTimeout(function() {
    toBlink.classList.remove('circle-blink');
  }, 300);
}

function colorPlay(color) {
  if (color === 'red') {
    redAudio.play();
  } else if (color === 'blue') {
    blueAudio.play();
  } else if (color === 'green') {
    greenAudio.play();
  } else if (color === 'yellow') {
    yellowAudio.play();
  }
}
var start = document.querySelector('.btn-start');
  start.onclick = function() {
    start.classList.add('start-hide');
    info.innerHTML = 'Starting';
    redAudio.volume = 0.0;
    blueAudio.volume = 0.0;
    greenAudio.volume = 0.0;
    yellowAudio.volume = 0.0;
    redAudio.play();
    blueAudio.play();
    greenAudio.play();
    yellowAudio.play();
    setTimeout(function(){
      redAudio.volume = 1.0;
      blueAudio.volume = 1.0;
      greenAudio.volume = 1.0;
      yellowAudio.volume = 1.0;
      gameLoop();
    },2000);
  }
}
