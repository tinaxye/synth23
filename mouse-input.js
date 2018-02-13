/*
var freqA = 174;
var freqS = 196;
var freqD = 220;
var freqF = 246;
var oscA, oscS, oscD, oscF;
*/

/*
!!!!
First few notes of Spirited Away - Always With Me
A - S - D - A - G - D - S - G
!!!!
*/

//reshaped as arrays for easy expansion
//Tbh, a dictionary would be even better LOL
//base frequencies
var freqs = [130, 146, 164, 174, 196, 220, 246, 261];
var oscs = [];
var octave = 1;
var range = 0;

var names = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'];
//corresponding notes matched with frequency
var piano = ['f', 'g', 'a', 'b', 'c'];
//arrays for playing and key press booleans
var playing = [false, false, false, false, false, false, false, false];
var keyPress = [false, false, false, false, false, false, false, false];
//controls rising and falling of the knobs
var lengths = [0, 0, 0, 0, 0, 0, 0, 0];

function setup() {
  print(typeof names);
  createCanvas(playing.length * 100, 300);
  //backgroundColor = color(255, 0, 255);
  textAlign(CENTER);
  noStroke();
  
  //Create and play all oscillator objects
  for (var i = 0; i < freqs.length; i += 1) {
    append(oscs, new p5.Oscillator());
    oscs[i].setType('triangle');
    oscs[i].freq(freqs[i]);
    oscs[i].amp(0);
    oscs[i].start();
  }
}

function draw() {
  background('lightgray');
  //process all oscillators in the array
  for (var i = 0; i < playing.length; i += 1) {
    
    push();
    //creates the slits behind the knobs
    stroke('gray');
    line(50 + 100 * i, 40, 50 + 100 * i, height/2 - 20);
    pop();
    aolorMode(HSB);
    if (keyPress[i]) {
      /*
      color is dependent on the number of oscillators present,
      the more oscillators there are, the less the range will be
      between different sliders.
      */
      /* 
      knob "lights up" with a color when the corresponding key
      is pressed.
      */
      fill((360/playing.length) * (i+1), 75, 50);
    	ellipse(50 + 100 * i, height/2 - 20 + lengths[i], 40, 40);
      //controls the rising action of the key
      if (lengths[i] > - (height/2 - 60))
      	lengths[i] -= 1;
    } else {
      //knob "turns off" when the corresponding key is pressed
      fill('gray');
      //controls the dropping action, rate is faster than rising
      if (lengths[i] < 0)
      	lengths[i] += 5;
    	ellipse(50 + 100 * i, height/2 - 20 + lengths[i], 40, 40);
    }
    text(names[i], 50 + 100 * i, height - 100);
	}
	push();
		stroke('gray');
		fill('gray');
		line(width/2 - 3 * width/8, height - 50, width/2 + 3 * width/8, height - 50);
		ellipse(width/2 + range * width/8, height - 50, 20, 20);
	pop();
	fill('gray');
	text('8va / mousewheelg', width/2, height - 20);
	text('-', width/2 - 3 * width/7, height - 46);
	text ('+', width/2 + 3 * width/7, height - 46);
  //background(backgroundColor)
  //text('click here,\nthen press a\n key to play', width / 2, 40);
}

function mouseWheel(event) {
	if (event.delta > 0) {
		if (octave > 1/8) {
			octave /= 2
			range -= 1
		}
	} else if (event.delta <= 0) {
		if (octave < 8) {
			octave *= 2
			range += 1
		}
	}
	for (var i = 0; i < freqs.length; i += 1) {
		oscs[i].freq(freqs[i] * octave);
	}
}

function keyPressed() {
  print("got key press for ", key);
  var index;
  if (key == 'A') {
    index = 0;
  } else if (key == 'S') {
    index = 1;
  } else if (key == 'D') {
    index = 2;
  } else if (key == 'F') {
    index = 3;
  } else if (key == 'G') {
    index = 4;
  } else if (key == 'H') {
    index = 5;
  } else if (key == 'J') {
    index = 6;
  } else if (key == 'K') {
    index = 7;
  }
  if (oscs[index]) {
    oscs[index].amp(0.5, 0.1);
    playing[index] = true;
    keyPress[index] = true;
  }
}

function keyReleased() {
  print("got key release for ", key);
  var index;
  if (key == 'A') {
    index = 0;
  } else if (key == 'S') {
    index = 1;
  } else if (key == 'D') {
    index = 2;
  } else if (key == 'F') {
    index = 3;
  } else if (key == 'G') {
    index = 4;
  } else if (key == 'H') {
    index = 5;
  } else if (key == 'J') {
    index = 6;
  } else if (key == 'K') {
    index = 7;
  }
  if (oscs[index]) {
    oscs[index].amp(0, 0.5);
    playing[index] = false;
    keyPress[index] = false;
  }
}
