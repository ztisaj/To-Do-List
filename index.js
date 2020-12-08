//add countdown
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

function timer(seconds){
  //clear existing timers if any
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds*1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(()=>{
    const secondsLeft = Math.round((then-Date.now())/1000);
    //check for stopping
    if(secondsLeft<0){
      clearInterval(countdown);
      return;
    }
    //display it
    displayTimeLeft(secondsLeft);
  },1000);
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds%60;
  const display = `${minutes}:${remainderSeconds<10?'0':''}${remainderSeconds}`;
  document.title = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Working on tasks until ${hour}:${minutes<10?'0':''}${minutes}h.`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(typeof mins);
  timer(mins*60);
  this.reset();
});


//a new task list item when clicking on the "Add" button
function newElement(){
  var li = document.createElement("li");
  var inputValue = document.getElementById("input").value;
  var text = document.createTextNode(inputValue);
  li.appendChild(text);
    if(inputValue===''){
      alert("Sometimes the smartest thing to do is to do nothing. Still, you have to write something.");
    } else {
      document.getElementById("tasks").appendChild(li);
    }

//adding the close mark next to list item
  document.getElementById("input").value="";
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  //closing - deleting task
  var close = document.getElementsByClassName("close");
  for(let i=0; i<close.length; i++){
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
