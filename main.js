var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var circles = document.querySelectorAll('.circle');
var info = document.querySelector('.info');
var board = document.querySelector('.board');
var colors = ['red', 'yellow', 'green', 'blue'];
var j = 0;
var turn = 1;
var sequenceCurrent = []; //filled for testing

//make circle clicked compare to sequence not circle incremented.
window.onload = function() {
function gameLoop() {
  info.innerHTML = 'Turn 1';
  sequenceAdd();
  sequencePlay();
  for (var i = 0; i < circles.length; i++) {
      circles[i].onclick = function(e) {
        var circle = this.value;
        colorPlay(circle);
        for (var i = 0; i < sequenceCurrent.length ; i++) {
          if (circle !== sequenceCurrent[j]) {
            j=0;
            info.innerHTML = "Try again";
            board.classList.add('no-click');
            setTimeout(function(){
              noClick(turn);
              sequencePlay();
            }, 1000);
            break;
          } else if (j === sequenceCurrent.length-1) {
            j=0;
            sequenceAdd();
            turn++
            noClick(turn);
            setTimeout(function() {
            sequencePlay();
          }, 1000);
          break;
          } else {
            j++;
            break;
          }
        }
      }
    }
  }


function noClick(time) {
  board.classList.add('no-click');
  info.classList.add('info-scroll');
  setTimeout(function() {
  info.innerHTML = 'Turn ' + (turn);
},500);
  setTimeout(function() {
    board.classList.remove('no-click');
    info.classList.remove('info-scroll');
  }, time*1000);
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
    setTimeout(function(){
      gameLoop();
    },2000);
  }
}
