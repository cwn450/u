x = 0;
y = 0;

screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  createCanvas(screen_width,screen_height-150);
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please say a number";  
  recognition.start();
} 
 
recognition.onresult = function(event) {


 content = event.results[0][0].transcript;

 to_number = Number(content);

 if(Number.isInteger(to_number)){
  document.getElementById("status").innerHTML  = "Started drawing apple.";
  draw_apple = "set";
 }
 else{
  document.getElementById("status").innerHTML = "The speech has not recognized a number."
 }
}



function draw() {
  if(draw_apple == "set")
  {
    draw_apple = "";
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random()*1650);
      y = Math.floor(Math.random()*screen_height*0.78);
      image(apple, x, y, 50,50);
      document.getElementById("status").innerHTML = to_number + " apples drawn";
      speak();  
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = document.getElementById("status").value;
}

