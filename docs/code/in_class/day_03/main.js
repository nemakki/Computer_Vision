let capture;
let w = 640;
let h = 480;
let extraCanvas;
let points = [];

let first;
let two;
let third;
let fourth;
let fifth;



function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("sketch");
  extraCanvas = createGraphics(w, h);
  extraCanvas.clear();
  capture = createCapture(VIDEO);
  capture.hide();
  
  first = createGraphics(w,h);
  two = createGraphics(400, 250);
  third = createGraphics(200, 150);
  fourth = createGraphics(50, 300);
  fifth = createGraphics(300,200);
}

function draw() {
  //background(255);
  
  first.background(0,15);

  image(first, 0, 0);

  
  two.background(20,10);
  image(two, 150, 75);
  
  third.background(100,1);
  image(third, 200, 50);
  
  image(fourth, 180, 20);
  
  fifth.background(150,5);
  image(fifth, 300, 250);
  
  capture.loadPixels();
  let pixels = capture.pixels;
  let darkestValue = 220;
  let avgX = 0;
  let avgY = 0;
  let count = 0;
  let brightestPixel = createVector(0, 0);
  let currX = 0;
  let currY = 0;
  
  for(let y = 0; y < capture.height; y++) {
    for(let x = 0; x < capture.width; x++) {
      
      let index = (y * capture.width + x)*4;
      
      let brightness = calculateBrightness(pixels, index);
      
      if(brightness >= darkestValue) {
        darkestValue = brightness;
        
        avgX+=x;
        avgY+=y;
        count++;
      }
    }
  }
  
  avgX = avgX/count;
  avgY = avgY/count;
  
  
  // push();
  // translate(w,0);
  // scale(-1,1);
  
      if(count > 4){
          points.push(new Point(avgX, avgY));
      }
  
      for(let i = 0; i < points.length; i++) {
      let p = points[i];
      
      p.drawFirst();
      p.drawSecond();
      p.drawThird();
      p.drawFourth();
      p.drawFifth();
        
      // p.updateFirst();
    }
  
  push();
    translate(w, 0);
    scale(-1, 1);
    //image(capture, 0, 0);
  pop();

  
  //pop();
  

  
}

function calculateBrightness(_pixels, _i) {
  let r = _pixels[_i];
  let g = _pixels[_i+1];
  let b = _pixels[_i+2];
  
  let total = r + g + b;
  
  return total/3.0;
  
}

class Point {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.age = 255;
    // this.size = this.age/8.0;
    this.color = 255;
    this.colorThird = 100;
    this.stroke = [0, 255, 255, 255];
    this.a = 10;
  }
  


  
  drawFirst(){
    this.color -= this.a;
    first.fill(this.color);
    first.noStroke();
    first.ellipse(this.pos.x, this.pos.y, 60)
    //first.rect(0, 0, w, h);
  }
  
  drawSecond(){
    two.noFill();
    this.color -= this.a;
    two.stroke(this.color);
    two.ellipse(this.pos.x - 150, this.pos.y - 75, 60);
  }
  
  drawThird() {
    this.colorThird -= this.a;
    third.fill(this.colorThird,10);
    third.stroke(this.pos.x, this.pos.y, random(255));
    third.ellipse(this.pos.x - 200, this.pos.y - 50, 20);
  }
  
  drawFourth(){
    fourth.fill(129, 181, 199, 40);
    fourth.stroke(161, 255, 250, 100);
    fourth.ellipse(this.pos.x - 180, this.pos.y - 20, 30);
  }
  
  drawFifth(){
    fifth.fill(random(255));
    fifth.rect(this.pos.x - 300, this.pos.y - 250, 15, 15);
  }
  
//     updateFirst(){
//     first.fill--;
//   }
}