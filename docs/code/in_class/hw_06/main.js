let capture;
let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/r2Fe__qs/model.json";
let label;
let opacity;

let w = 640;
let h = 480;

let pumpkin;
let kinpump;
let pumpkinpump;
let nopumpkin;

function preload(){
  classifier = ml5.imageClassifier(imageModelURL);
  pumpkin = loadImage('pumpkin.png');
  kinpump = loadImage('kinpump.png');
  pumpkinpump = loadImage('pumpkinpump.png');
  nopumpkin = loadImage('nopumpkin.png');
}

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("sketch");
  
  let constraints = {audio:false,video:{width:{min:320,ideal:w,max:1920},height:{min:240,ideal:h,max:1080},frameRate: {min: 1.0, max: 60.0}}};
  
  frameRate(30);
  
  capture = createCapture(constraints);
  
  capture.hide();
  
  classifyVideo();
}

function draw() {
  background(220);
  
  noTint();
  image(capture, 0, 0);

  
  
  //rect(0, height/2, size, 50);
  if(label == "pumpkin"){
  tint(225, opacity);
  image(pumpkin, 0, 0);
  }
  
  if(label == "kinpump"){
  tint(225, opacity);
  image(kinpump, 0, 0);
  }
  
  if(label == "pumpkinpump"){
  tint(225, opacity);
  image(pumpkinpump, 0, 0);
  }
  
  if(label == "no pumpkinpump"){
  tint(225, opacity);
  image(nopumpkin, 0, 0);
  }

  textSize(30);
  textAlign(CENTER);
  text(label, 320, 400);
  fill(242, 145, 80);
  stroke(0);
  strokeWeight(5);
}

function classifyVideo(){
  
  classifier.classify(capture, gotResults);
  
}

function gotResults(error, results){

  if (error){
    console.error(error);
    return;
  }
  
  label = results[0].label;
  
  opacity = map(results[0].confidence, 0, 1, 0, 255);
                 
  //console.log(results);
  
  classifyVideo();
}