/*******
 * define this "sliderInfo" variable
 * have an entry for each slider you want
 * and each row should be:
 * ["object_field", minimum_bound, maximum_bound]
 */
const sliderInfo = [
  ["triangleX", 0, 200],
  ["triangleY", 0, 200],
  ["rect1X", 0, 200],
  ["rect1Y", 0, 200],
  ["rect2X", 0, 200],
  ["rect2Y", 0, 200],
  ["snakeX", -30, 200],
  ["snakeY", 0, 200],
  ["snakeLength", 0, 20],
  ["snakeRot", 0, 360],
  ["rect1Rot", 0, 360],
  ["rect2Rot", 0, 360],
  ["triangleRot", 0, 360]
];

// PROBABLY DON'T NEED TO EDIT ANYTHING ELSE. STOP HERE.

const numSliders = sliderInfo.length;

if (typeof systemBackgroundColor === 'undefined') {
    var systemBackgroundColor = "#e3eded";
}

// this will use variables if they are already defined
// var systemBackgroundColor = systemBackgroundColor || "#e3eded";

// for the background texture
const BASE_R = 242;
const BASE_G = 211;
const BASE_B = 153;

// if everything is defined above, this should just work
function sliderToDataObject() {
  let obj = {};
  for (let i=0; i<numSliders; i=i+1) {
    o_name = sliderInfo[i][0]
    bounds_low = sliderInfo[i][1]
    bounds_high = sliderInfo[i][2]
    obj[o_name] = map(param_sliders[i].value(), 0, 100, bounds_low, bounds_high);
  }
  return obj;
}

let param_sliders = [];

let main_canvas = null;

const canvasWidth = 960;
const canvasHeight = 500;

let debugBox = false;

let backgroundPic;

function setup () {
  // create the drawing canvas, save the canvas element
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  backgroundPic = createGraphics(canvasWidth, canvasHeight);
  textured(30000); // now only runs once

  // rotation in degrees (more slider friendly)
  angleMode(DEGREES);

  for(let i=0; i<numSliders; i++) {
    let cur_row = select("#row" + (i+1))
    cur_row.show();
    let cur_slider = createSlider(0, 100, 50)
    let containerString = "slider" + (i+1) + "Container"
    cur_slider.parent(containerString);
    param_sliders.push(cur_slider);
  }

  button = createButton('show data');
  button.mousePressed(buttonPressedEvent);
  button.parent(buttonContainer);
}

function buttonPressedEvent() {
  let obj = sliderToDataObject();
  json = JSON.stringify(obj, null, 2);
  alert(json);
}

function draw () {
  // clear screen
  background(systemBackgroundColor);
  image(backgroundPic, 0, 0);

  // compute the center of the canvas
  let center_x = canvasWidth / 2;
  let center_y = canvasHeight / 2;

  // draw the letters A, B, C from saved data
  push();
  scale(2);
  translate(width/4 - 50, 25);

  if (debugBox) {
    noFill()
    strokeWeight(4);
    stroke(0, 200, 0);
    rect(0, 0, 100, 200);
  }

  let obj = sliderToDataObject();
  drawLetter(obj);
  pop();
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
  else if (key == 'd') {
    debugBox = !debugBox;
    // console.log("debugBox is now: " + debugBox);
    redraw();
  }
  else if (key == ' ') {
    let obj = sliderToDataObject();
    json = JSON.stringify(obj, null, 2);
    console.log(json);
  }
}

/**
 * Function which makes background look textured and like an old piece of paper.
 * @param density how old do you want the paper to look? AKA how many lines there are.
 * @author inspired from Jonathan Freeman
 * @link https://github.com/freethejazz/generative-watercolor/blob/develop/src/scripts/index.js
 */
function textured(density){
  for(let i = 0; i < density; i++) {
    backgroundPic.stroke(
      BASE_R - Math.random() * 15,
      BASE_G - Math.random() * 15,
      BASE_B - Math.random() * 15
    );

    let x1 = Math.random() * canvasWidth;
    let y1 = Math.random() * canvasHeight;
    let theta = Math.random() * 2 * Math.PI;
    let segmentLength = Math.random() * 5 + 2;
    let x2 = Math.cos(theta) * segmentLength + x1;
    let y2 = Math.sin(theta) * segmentLength + y1;

    // make the edges darker for a 'worn out' vibe
    if (x1 < 20 || x1 > (canvasWidth - 20) || y1 < 20 || y1 > (canvasHeight - 20)){
      backgroundPic.stroke(
        BASE_R - Math.random() * 35,
        BASE_G - Math.random() * 35,
        BASE_B - Math.random() * 35
      )
    }

    backgroundPic.line(x1, y1, x2, y2);
  }
}