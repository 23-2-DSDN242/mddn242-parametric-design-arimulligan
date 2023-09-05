/* these are optional special variables which will change the system */
var systemBackgroundColor = "#F2D399";
var systemLineColor = "#732A24";
var systemBoxColor = "#00c800";

/* internal constants */
const redish  = "#A6360D";
const hay  = "#D9A74A";
const yellowish = '#F2C84B';
const darkBrown = '#732A24';
const brown  = "#A65B1B";

const colorList = [hay, redish, darkBrown];

/*
 * Draw the letter given the letterData
 *
 * Letters should always be drawn with the
 * following bounding box guideline:
 * from (0,0) to (100, 200)
 */
function drawLetter(letterData) {
  // color/stroke setup
  noStroke();

  // determine parameters for the letter 
  let triangleX = letterData["triangleX"];
  let triangleY = letterData["triangleY"];
  let rect1X = letterData["rect1X"];
  let rect1Y = letterData["rect1Y"];
  let rect2X = letterData["rect2X"];
  let rect2Y = letterData["rect2Y"];
  let snakeX = letterData["snakeX"];
  let snakeY = letterData["snakeY"];
  let snakeLength = letterData["snakeLength"];
  let snakeRot = letterData["snakeRot"];
  let rect1Rot = letterData["rect1Rot"];
  let rect2Rot = letterData["rect2Rot"];
  let triangleRot = letterData["triangleRot"];

  for (let i = 0; i < 3; i++){
    // change each color 
    fill(colorList[i]);
    let addedSize = i * 15;
    // draw triangle 
    polygon(triangleX, triangleY, 50 - addedSize, 50 - addedSize, 3, 7, triangleRot);
    
    if (i == 2){break;} // so last colour doesn't show up 
    // draw rectangles
    polygon(rect1X, rect1Y, 20 - addedSize, 50 - addedSize, 4, 10, rect1Rot);
    polygon(rect2X, rect2Y, 20 - addedSize, 50 - addedSize, 4, 10, rect2Rot);
  }

  // draw a snake
  drawSnake(snakeLength, snakeX, snakeY, snakeRot);
}

function interpolate_letter(percent, oldObj, newObj) {
  let new_letter = {};
  new_letter["triangleX"] = map(percent, 0, 100, oldObj["triangleX"], newObj["triangleX"]);
  new_letter["triangleY"] = map(percent, 0, 100, oldObj["triangleY"], newObj["triangleY"]);
  new_letter["rect1X"] = map(percent, 0, 100, oldObj["rect1X"], newObj["rect1X"]);
  new_letter["rect1Y"] = map(percent, 0, 100, oldObj["rect1Y"], newObj["rect1Y"]);
  new_letter["rect2X"] = map(percent, 0, 100, oldObj["rect2X"], newObj["rect2X"]);
  new_letter["rect2Y"] = map(percent, 0, 100, oldObj["rect2Y"], newObj["rect2Y"]);
  new_letter["snakeX"] = map(percent, 0, 100, oldObj["snakeX"], newObj["snakeX"]);
  new_letter["snakeY"] = map(percent, 0, 100, oldObj["snakeY"], newObj["snakeY"]);
  new_letter["snakeLength"] = map(percent, 0, 100, oldObj["snakeLength"], newObj["snakeLength"]);
  new_letter["snakeRot"] = map(percent, 0, 100, oldObj["snakeRot"], newObj["snakeRot"]);
  new_letter["rect1Rot"] = map(percent, 0, 100, oldObj["rect1Rot"], newObj["rect1Rot"]);
  new_letter["rect2Rot"] = map(percent, 0, 100, oldObj["rect2Rot"], newObj["rect2Rot"]);
  new_letter["triangleRot"] = map(percent, 0, 100, oldObj["triangleRot"], newObj["triangleRot"]);
  return new_letter;
}

var swapWords = [
  "ABBAABBA",
  "CAB?CAB?",
  "BAAAAAAA"
]

/** A primitive function for rounded polygonal shape 
 * Polygon is circumscribed in a circle of radius 'size'
 * Round corners radius is specified.
 * @param x - x center of polygon
 * @param y - y center of polygon
 * @param sizeX - width of polygon (radius of circumscribed circle)
 * @param sizeY - height of polygon (radius of circumscribed circle)
 * @param sides - number of polygon sides
 * @param radius - radius of rounded corners
 * @param res - angular resolution of each corner in points (default 5)
 * @param rot - global rotation applied to shape (default 0)
 * @author Gilles Gonon - http://gilles.gonon.free.fr , then I (Ari) edited the parameters
 * @license GPL
 */
function polygon(x, y, sizeX, sizeY, sides = 3, radius = 0, rot=0) {
  angleMode(RADIANS);
  // Polygon is drawned inside a circle
  // Angle of 1 corner of polygon
  let apoly = (sides > 2 ? (sides - 2) * PI : TWO_PI) / sides;
  // Radius angle
  let aradius = sides > 2 ? PI - apoly : PI;
  // distance between vertex and radius center
  let r = 2 * radius * sin(HALF_PI - 0.5 * apoly); 
  push();
  
  let res = 10;
  // Start drawing
  translate(x, y);
  rotate(rot);
  beginShape();
  for (let a = 0; a < sides; a++) {
      // Rotation for polygon vertex
      let rot = a * TWO_PI / sides;
      if (radius) {
          // Vertex coordinates
          let cx = (sizeX - r) * cos(rot);
          let cy = (sizeY - r) * sin(rot);
          for (let i = 0; i < res; i++) {
              let rotrad = rot + i*aradius/(res-1) - 0.5*aradius;
              let px = radius * cos(rotrad);
              let py = radius * sin(rotrad);
              vertex(cx + px, cy + py);
          }
      } else {
          let dx = sizeX * cos(rot);
          let dy = sizeY * sin(rot);
          vertex(dx, dy);
      }
  }
 endShape(CLOSE);
 pop();
}

/**
 * Draws a snake using arc.
 * @param numArcs Number of arcs / or length of snake
 * @param startX  x-coord
 * @param startY y-coord
 * @author Arianna Mulligan
 */
function drawSnake(numArcs, startX, startY, rotation) {
  let segmentSize = 20; // Size of each segment
  let spacing = 5; // Spacing between arcs
  push();
  translate(startX, startY);
  rotate(rotation);
  noFill();
  stroke(brown);
  strokeWeight(5);
  for (let i = 0; i < numArcs; i++) {
    let x =  (i * (segmentSize + spacing));

    // Determine the arc angles based on whether i is even or odd
    let startAngle, endAngle, y;
    if (i % 2 === 0) {
      y = 0;
      startAngle = PI + QUARTER_PI;
      endAngle = -QUARTER_PI;
    } else {
      y = -(segmentSize + spacing + 6);
      startAngle = QUARTER_PI;
      endAngle = -PI - QUARTER_PI;
    }
    
    // Draw the arc to create a curved appearance
    arc(x, y, segmentSize * 2, segmentSize * 2, startAngle, endAngle);
  }
  // head
  let xhead = - segmentSize +5;
  let yhead = - segmentSize +4;
  fill(brown);
  ellipse(xhead, yhead, 10, 5);
  
  // tongue
  strokeWeight(2);
  line(xhead, yhead, xhead -10, yhead);
  line(xhead -10, yhead, xhead -12, yhead+2);
  line(xhead -10, yhead, xhead -12, yhead-2);
  
  // eyes
  stroke("#F2D399"); // background
  circle(xhead, yhead +3, 1);
  circle(xhead, yhead -3, 1);
  pop();
}