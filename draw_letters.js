/* these are optional special variables which will change the system */
var systemBackgroundColor = "#caf0f8";
var systemLineColor = "#000090";
var systemBoxColor = "#00c800";

/* internal constants */
const darkBlue  = "#0077b6";
const lightBlue  = "#90e0ef";
const strokeColor  = "#03045e";

/** A primitive function for rounded polygonal shape 
 * Polygon is circumscribed in a circle of radius 'size'
 * Round corners radius is specified.
 * similar to circle(x,y,s) with extra parameters
 * @param x - x center of polygon
 * @param y - y center of polygon
 * @param size - size of polygon (radius of circumscribed circle)
 * @param sides - number of polygon sides
 * @param radius - radius of rounded corners
 * @param res - angular resolution of each corner in points (default 5)
 * @param rot - global rotation applied to shape (default 0)
 * @author Gilles Gonon - http://gilles.gonon.free.fr, then I (Ari) edited the parameters
 * @license GPL
 */
function polygon(x, y, size, sides = 3, radius = 0, rot=0) {
  // Polygon is drawned inside a circle
  // Angle of 1 corner of polygon
  let apoly = (sides > 2 ? (sides - 2) * PI : TWO_PI) / sides;
  // Radius angle
  let aradius = sides > 2 ? PI - apoly : PI;
  // distance between vertex and radius center
  let r = 2 * radius * sin(HALF_PI - 0.5 * apoly); push()
  // debug log
  // console.log('Polygon : sides '+sides+', apoly:'+degrees(apoly).toPrecision(4)+', aradius:'+degrees(aradius).toPrecision(4)+',distance from vertex for radius:'+rproj.toPrecision(4))
  let res = 5;
  // Start drawing
  push()
  translate(x, y)
  rotate(rot)
  beginShape()
  for (let a = 0; a < sides; a++) {
      // Rotation for polygon vertex
      let rot = a * TWO_PI / sides;
      if (radius) {
          // Vertex coordinates
          let cx = (size - r) * cos(rot);
          let cy = (size - r) * sin(rot);
          for (let i = 0; i < res; i++) {
              let rotrad = rot + i*aradius/(res-1) - 0.5*aradius;
              let px = radius * cos(rotrad);
              let py = radius * sin(rotrad);
              vertex(cx + px, cy + py);
              // circle(cx + px, cy + py, 0.15*i+2)
          }
          // circle(cx, cy, 0.15*a+2)
      } else {
          let dx = size * cos(rot);
          let dy = size * sin(rot);
          vertex(dx, dy);
          // circle(dx,dy, 0.15*a+2);
      }
  }
 endShape(CLOSE)
 pop()
}

/*
 * Draw the letter given the letterData
 *
 * Letters should always be drawn with the
 * following bounding box guideline:
 * from (0,0) to (100, 200)
 */
function drawLetter(letterData) {
  // color/stroke setup
  stroke(strokeColor);
  strokeWeight(4);

  // determine parameters for the letter 
  let triangleX = letterData["triangleX"];
  let triangleY = letterData["triangleY"];
  let rect1X = letterData["rect1X"];
  let rect1Y = letterData["rect1Y"];
  let rect2X = letterData["rect2X"];
  let rect2Y = letterData["rect2Y"];
  let circleX = letterData["circleX"];
  let circleY = letterData["circleY"];
  let rect1Rot = letterData["rect1Rot"];
  let rect2Rot = letterData["rect2Rot"];
  let triangleRot = letterData["triangleRot"];

  // draw triangle 
  fill(darkBlue);
  polygon(triangleX, triangleY, 100, 3, 0, triangleRot);
  
  // draw rectangles 
  polygon(rect1X, rect1Y, 50, 4, 0, rect1Rot);
  polygon(rect2X, rect2Y, 50, 4, 0, rect2Rot);

  // draw circle
  circle(circleX, circleY, 15);
}

function interpolate_letter(percent, oldObj, newObj) {
  let new_letter = {};
  new_letter["size"]    = map(percent, 0, 100, oldObj["size"], newObj["size"]);
  new_letter["offsetx"] = map(percent, 0, 100, oldObj["offsetx"], newObj["offsetx"]);
  new_letter["offsety"] = map(percent, 0, 100, oldObj["offsety"], newObj["offsety"]);
  return new_letter;
}

var swapWords = [
  "ABBAABBA",
  "CAB?CAB?",
  "BAAAAAAA"
]

