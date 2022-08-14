objects=[];
img = "";
status = "";
function preload(){
img = loadImage("dog_cat.jpg");
}
function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function draw(){
image(video, 0, 0, 380, 380);
/*fill(116, 132, 204);
textSize(25);
textFont('Times New Roman')
text("Dog", 70, 70);
noFill();
stroke(116, 132, 204);
rect(60, 45, 450, 350);

fill(116, 132, 204);
textSize(25);
textFont('Times New Roman')
text("Cat", 255, 95);
noFill();
stroke(116, 132, 204);
rect(245, 75, 350, 330);*/
if(status != ""){
    objectDetector.detect(video, gotResults);
    r = random(255);
    g = random(255);
    b = random(255);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML = "Status: Object Detected";
        document.getElementById("numberOfObjects").innerHTML = "Number of Objects: "+objects.length;
        fill(r, g, b);
        textSize(25); 
        textFont('Times New Roman')
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+7, objects[i].y+18);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}
function modelLoaded(){
    console.log("model is ready");
    status = true;

}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        objects = results;
        console.log(results);
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: detecting objects";
}
