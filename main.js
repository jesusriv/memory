var arrOfImages = ['imgs/down.jpg', 'imgs/bring.jpg', 
                   'imgs/color.jpg','imgs/crumb.jpg', 
                   'imgs/currents.jpg', 'imgs/every.jpg', 
                   'imgs/happy.jpg', 'imgs/shadow-work.jpg', 
                   'imgs/wings.jpg'];

function doubleImages(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    arr.push(arr[i]);
  }
  return arr;
}

doubleImages(arrOfImages);

function displayCards(arr) {
  // instead of a list, we're going to grab the empty div so we can add to it later
  var container = document.getElementById("container");

  // for each image in our array
  for (var i = 0; i < arr.length; i++) {
    // create a new HTML image element
    var newImgElement = document.createElement("img");
    // set the src of the img tag to be the name of the file
    newImgElement.src = arr[i];
    // give the element an id 
    newImgElement.id = i;
    // give the element a class so CSS can be applied to it
    newImgElement.className = "card";
    // add the element to the container div
    container.appendChild(newImgElement);
  }
}

function shuffleCards(arr) {
  for (var i = 0; i < arr.length; i++) {
    // get 2 random index values
    var idx1 = Math.floor(Math.random() * arr.length);
    var idx2 = Math.floor(Math.random() * arr.length);

    // swap them in the array
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }
  return arr;
}

// let's shuffle the cards BEFORE we display them!
shuffleCards(arrOfImages);
displayCards(arrOfImages);

function hideACard(idx){
  var specifiedCard = document.getElementById(idx)
  specifiedCard.src = 'imgs/questionMark.png'
}

function hideAllCards(){
  for (var i = 0; i < arrOfImages.length; i++) {
    hideACard(i)
  }
}

window.setTimeout(hideAllCards, 2000)

var attempts = 0
function gameOver() {
  alert('GAME OVER!')
  window.setTimeout(startOver, 1000)
}

function startOver(){
  location.reload()
}

// generates message 
function message(condition){
  var para = document.getElementById('p');
  var text;
  if(condition == 'match'){
    text = document.createTextNode('They match!');
    para.appendChild(text);
  } else if(condition == 'no match'){
    text = document.createTextNode('Try again!');
    para.appendChild(text);
  } 
  var remove = () => para.removeChild(text);
  window.setTimeout(remove, 900)
}

var cardsPicked = []
function revealCard(event) {    // this time, the click event is going to be the input
  // the event actually contains the element (and all its attributes)
  // we'll use it to get the id of the element that was clicked
  var clickedImageId = event.target.id;

  // grab the element that was clicked on
  var clickedImage = document.getElementById(clickedImageId);
  // update the image's source to show a different picture
  clickedImage.src = arrOfImages[clickedImageId];

  cardsPicked.push(clickedImageId)
  if(cardsPicked.length == 2){
    if(arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]){
      cardsPicked = []
      message('match')
    } else {
      var hidePickedCards = function(){
        hideACard(cardsPicked[0]);
        hideACard(cardsPicked[1]);
        cardsPicked = []
        message('no match')
        attempts++
        if(attempts >= 5){
          gameOver()
        }
      }
      window.setTimeout(hidePickedCards, 1000);
    }
  }
}

var cards = document.getElementsByClassName("card");    // grab all the cards
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", revealCard);
}

