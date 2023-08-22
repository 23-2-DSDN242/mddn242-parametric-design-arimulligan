const canvasWidth = 960;
const canvasHeight = 500;

/*
 * my three variable per letter are:
 *
   size: radius of the second circle (in pixels)
   offsetx: x offset (in pixels) of the second circle
            relative to the first one
   offsety: y offset (in pixels) of the second circle
            relative to the first one
 *
 */

const letterA = {
  "size": 100,
  "offsetx": -100,
  "offsety": 0,
  "circleOffset": 0,
  "count": 1
}

const letterB = {
  "size": 70,
  "offsetx": -50,
  "offsety": 50,
  "circleOffset": 0,
  "count": 2
}

const letterC = {
  "size": 50,
  "offsetx": 0,
  "offsety": 150,
  "circleOffset": 300,
  "count": 1
}

const backgroundColor  = "#caf0f8";
const strokeColor      = "#03045e";

const darkBlue  = "#white";

function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  // color/stroke setup
  stroke(darkBlue);
  strokeWeight(0);

  // with no animation, redrawing the screen is not necessary
  noLoop();
}

function draw () {
  // clear screen
  background(backgroundColor);

  // compute the center of the canvas
  let center_x = canvasWidth / 2;
  let center_y = canvasHeight / 2;

  // draw the letters A, B, C from saved data
  drawLetter(center_x - 250, center_y, letterA);
  drawLetter(center_x      , center_y, letterB);
  drawLetter(center_x + 250, center_y, letterC);
}

function drawLetter(posx, posy, letterData) {
  // determine parameters for second circle
  let size2 = letterData["size"];
  let pos2x = posx + letterData["offsetx"];
  let pos2y = posy + letterData["offsety"];
  let circleOffset = letterData["circleOffset"];
  let count = letterData["count"];

  // draw triangles 
  translate(circleOffset*1.2, circleOffset*3.5);
  rotate(circleOffset);
  fill(darkBlue);
  for (let i=1; i<=5; i++){
    if (i % 2 ==0 ){fill(backgroundColor);}
    else{fill(darkBlue);}
    triangle(30+pos2x-size2, 75+pos2y, 58+pos2x, 20+pos2y-size2, 86+pos2x+size2, 75+pos2y);
    size2 -= 20;
    let posyyy = pos2y;
    let posxxx = pos2x;
    for (let i=1; i<=count; i++){
      triangle(30+posxxx-size2, 75+posyyy, 58+posxxx, 20+posyyy-size2, 86+posxxx+size2, 75+posyyy);
      posyyy -= i * 100;
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
