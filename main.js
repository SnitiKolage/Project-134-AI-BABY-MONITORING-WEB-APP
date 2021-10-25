img = "";
objects = [];
statuss = "";

function preload() {
    img = loadImage('140827126-pretty-child-in-pajamas-sleep-at-night-healthy-sleep-white-bed-pillow-and-sheets-sweet-baby-boy-with.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video.createCapture();
    video.size(640, 420);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:DetectingObjects";
}

function modelLoaded() {
    console.log("modelLoaded");
    statuss = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results)
    objects = results;

}

function draw() {
    image(video, 0, 0, 640, 420);
    if (statuss != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);


        for (var i = 0; i < objects.length; i++) {
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;
            document.getElementById("status").innerHTML = "Status:object Detected";
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}