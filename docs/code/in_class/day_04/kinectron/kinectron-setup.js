let w = 1280;
let h = 720;

let kinectron;


function setup(){
    let canvas = createCanvas(w, h);
    canvas.parent("#sketch");
    background(56, 56, 56);

    kinectron = new Kinectron("10.72.25.59");
    kinectron.makeConnection();

    kinectron.startTrackedBodies(drawBody);

}

function draw(){

}

function drawBody(body){

    background(56, 56, 56);

    for(let i = 0; i < body.joints.length; i++){
        
        //blendMode(MULTIPLY);
        fill(mouseX, mouseY, random(255),100);

        let x = body.joints[i].depthX * width;
        let y = body.joints[i].depthY * width;

        ellipse(x, y, 20);
        //x--;

    }

}