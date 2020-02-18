



let myCapture;


function setup() {
  let canvas = createCanvas(320, 240);
  canvas.parent("sketch");
  myCapture = createCapture(VIDEO);
  myCapture.hide();

}

function draw() {
  background(255);
  
  let mouseXlimited = constrain(mouseX, 0, 255);
  let mouseYlimited = constrain(mouseY, 0, 255);
  
  // fill('rgba(mouseXlimited, mouseYlimited, 50, 0.5)');
  // fill(mouseXlimited, mouseYlimited, 50, 100);
  
  //print(mouseYlimited);
  
  myCapture.loadPixels();
  
  // const stepSize = round(constrain(mouseX / 8, 6, 6));
  const stepSize = 10;
  
  for(let y = 0; y < height; y += stepSize){
    for(let x= 0; x < width; x += stepSize){
      const i = y * width + x;
      const darkness = (255 - myCapture.pixels[i * 4])/255;
      const radius = stepSize * darkness;
      // constrain(radius,0,100);

      if(radius < 3){
      push();
      translate(width,0);
      scale(-1,1);
      ellipse(x, y, radius, radius);
      pop();
        noFill();
        stroke(50);
        blendMode(ADD);
      }
      else if (radius>3 && radius<8){
        // constrain(darkness, 10, 20);
      push();
      translate(width,0);
      scale(-1,1);
        let scaledRadius = map(darkness, 0.,1.,1,3);
      rect(x, y, radius*scaledRadius, radius*scaledRadius);
      pop();
        fill(mouseXlimited, mouseYlimited, 150, 10);
        noStroke();
        blendMode(MULTIPLY);
      }
      else if (radius>8){
      push();
      translate(width,0);
      scale(-1,1);
        noStroke();
        // for (let i = 0; i < 10; i ++) {
        // ellipse(x, y, 20, 80);
        // rotate(PI/5);
        // }
        rect(x,y,10,10);
          pop();
        blendMode(MULTIPLY);
        fill(mouseXlimited, 200, mouseYlimited, 10);
        

      }
        
   }
  }
  


  // print(frameCount);
}

function mousePressed() {
  clear();
}



