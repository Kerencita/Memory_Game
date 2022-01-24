const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //I CHANGED IT TO ID INSTEAD OF A CLASS
    newDiv.id = color;
    newDiv.classList.add('card')
    // newDiv.style.backgroundColor = color;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//THIS LIST IS FOR LOCAL STORAGE
let savedScores = [];

let List = [];
let temp = ''
let moveCounter = 0
// TODO: Implement this function!
function handleCardClick(event) {
  event.target.style.backgroundColor = event.target.id
  if (temp == ''){
    temp = event.target.previousSibling
    List.push(event.target)
  }
  if (event.target.previousSibling != temp){
    List.push(event.target)
    temp = ''
  }
  if (List.length == 2){
    checkMatch(List[0], List[1])
  }

}

function checkMatch(a,b){
  if(a.id == b.id){
    console.log('cards match!');
    a.style.opacity = 0.5
    b.style.opacity = 0.5
    updateMoveCounter()
    removeListener(a.id)
    List = []
    setTimeout(function(){
      checkGameOver()
    }, 1000);
  } else {
    console.log('no match :(');
    updateMoveCounter()
    List = []
    setTimeout(function(){
      hideCards(a,b);
    }, 1000);
  }
}

function removeListener (n){
  let a = `#${n}`
  let cards = document.querySelectorAll(a);
  for (let card of cards){
    card.removeEventListener("click", handleCardClick)
  }
}

function hideCards(a,b){
  a.style.backgroundColor = 'gray'
  b.style.backgroundColor = 'gray'
}

function updateMoveCounter (){
  moveCounter += 1
  document.querySelector('h3').textContent = `Number of Moves: ${moveCounter}`
}

function checkGameOver (){
  let counter = 0
  let allCards = document.querySelectorAll("div")
  for (let card of allCards){
    if(card.style.backgroundColor !== 'gray'){
      counter +=1
    }
    if (counter == 10){
      savedScores.push(moveCounter)
      localStorage.setItem('savedscore', JSON.stringify(savedScores))
      alert("GAME OVER!")
      window.location.reload()
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

if(localStorage.getItem('savedscore')){
  savedScores = JSON.parse(localStorage.getItem('savedscore'));
  let bestScore = Math.min(...savedScores);
  document.querySelector('h4').textContent = `Best Score: ${bestScore}`
}

//TIMER FEATURE GOTTEN FROM STACKOVERFLOW//
// var timerVar = setInterval(countTimer, 1000);
// var totalSeconds = 0;
// function countTimer() {
//            ++totalSeconds;
//            var hour = Math.floor(totalSeconds /3600);
//            var minute = Math.floor((totalSeconds - hour*3600)/60);
//            var seconds = totalSeconds - (hour*3600 + minute*60);
//            if(hour < 10)
//              hour = "0"+hour;
//            if(minute < 10)
//              minute = "0"+minute;
//            if(seconds < 10)
//              seconds = "0"+seconds;
//            document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
//         }

