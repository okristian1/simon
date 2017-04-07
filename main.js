var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var circles = document.querySelectorAll('.circle');
var info = document.querySelector('.info');
var colors = ['red', 'yellow', 'green', 'blue'];

var sequenceCurrent = ['red', 'green', 'blue', 'yellow']; //filled for testing

//make circle clicked compare to sequence not circle incremented.

window.onload = function() {

function gameLoop() {
  var j = 0;
  for (var i = 0; i < circles.length; i++) {
      circles[i].onclick = function(e) {
        var circle = this.value;
        for (var i = 0; i < sequenceCurrent.length ; i++) {
          console.log(j, sequenceCurrent.length, circle, sequenceCurrent[j]);
          console.log(sequenceCurrent);
          if (j === sequenceCurrent.length-1) {
            j=0;
            sequenceAdd();
            console.log(sequenceCurrent);
            break;
          } else if (circle !== sequenceCurrent[j]) {
            j=0;
            info.innerHTML = "Try again";
            break;
          } else {
            j++;
            break;
          }
        }
      }
    }
  }

sequenceCurrent.length

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


red.onclick = function() {
  redAudio.play()
  }
yellow.onclick = function() {
  yellowAudio.play()
  }
blue.onclick = function() {
  blueAudio.play()
  }
green.onclick = function() {
  greenAudio.play()
  }

gameLoop();

}
