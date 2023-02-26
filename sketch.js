const numLines = 25;
const lineColors = [];
const lineSpeeds = [];

const width = visualViewport.width;
const height = visualViewport.height;

const sinValues = [];
const cosValues = [];

function setup() {
  createCanvas(width, height);
  angleMode(DEGREES);

  // set up color palette for given number of lines (numLines)
  for (let i = 0; i < numLines; i++) {
    const hue = map(i, 0, numLines - 1, 0, 360);
    lineColors.push(color(`hsb(${hue}, 80%, 80%)`));
  }

  // set up line speeds 
  for (let i = 0; i < numLines; i++) {
    lineSpeeds.push((i + 1) / 5);
  }

  // precompute sin and cos values
  for (let i = 0; i < 360; i++) {
    let angle = i * DEG_TO_RAD;
    sinValues[i] = sin(angle);
    cosValues[i] = cos(angle);
  }
}

// draw to canvas
function draw() {
  background(0, 0, 30);
  translate(width / 2, height / 2);

  for (let [i, lineColor] of lineColors.entries()) {
    let lineSpeed = lineSpeeds[i]; 
    let radius = 200 + i * 50; 
    let angle = frameCount * lineSpeed;

    // draw lines
    stroke(lineColor);
    strokeWeight(2);
    let lineX = radius * sin(angle);
    let lineY = -radius * cos(angle);
    line(0, 0, lineX, lineY);

    // draw circles
    fill(lineColor);
    stroke(lineColor);
    strokeWeight(1.25);
    ellipse(lineX, lineY, 10, 10);
    
}

    // display framerate in top left corner
    fill(255, 255, 255);
    noStroke();
    text(`FPS: ${floor(frameRate())}`, -width / 2 + 10, -height / 2 + 30);
}
    // main loop
    function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();