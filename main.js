Status = "";
Objects = [];
ObjectName = "";

function preload()
{

}

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 500, 400);

    if(Status != "")
    {

        objectDetector.detect(video, gotResult);

        for(var i = 0; i < Objects.length; i++)
        {
            fill('ffebf400');
            percentage = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percentage + "%", Objects[i].x + 15, Objects[i].y + 15);
            noFill();
            stroke('ffebf400');
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);

            if(Objects[i].label == ObjectName)
            {
                video.stop();
        
                document.getElementById("ObjectStatusH3").innerHTML = "Object has been Detected";

                var synth = window.speechSynthesis;
                var spechData = "object mentioned is found";
                var utterThis = new SpeechSynthesisUtterance(spechData);
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("ObjectStatusH3").innerHTML = "Object can not be Detected";   
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("StatusH3").innerHTML = "Status : Detecting Objects"

    ObjectName = document.getElementById("objectNameInput").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    
    Status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        Objects = results;
    }
}