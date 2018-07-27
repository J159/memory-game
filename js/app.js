/*
 * Create a list that holds all of your cards
 */

const fullCards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt',
'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 const deck = document.querySelector('.deck');

// variable to hold cards
 let openCards = [];
 let matchedCards = [];

 // function to initialize game
 function init() {
   // shuffle(fullCards);
   for (let i = 0; i < fullCards.length; i++) {
     const card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class="${fullCards[i]}"></i>`;
     deck.appendChild(card);
     //Invokes click function
     click(card);
   }
 }

 // Card Event Listener function (flips card)
 function click(card) {
   card.addEventListener('click', function() {
     const currentCard = this;
     const previousCard = openCards[0];

     if (openCards.length === 1) {
       card.classList.add('open', 'show', 'disable');
       openCards.push(this);

       // Call function to compare open cards
       compare(currentCard, previousCard);

     } else {
       card.classList.add('open', 'show', 'disable');
       openCards.push(this);
     }

    // console log for testing purposes - will delete later
    console.log(card.innerHTML);
   })
 }

// Compares current and previous cards to determine match
 function compare(currentCard, previousCard) {
   if (currentCard.innerHTML === previousCard.innerHTML) {
     console.log('Match!');
     // Push matched cards into variable
     matchedCards.push(currentCard, previousCard);
     // Add match class to current/previous card
     currentCard.classList.add('match');
     previousCard.classList.add('match');
     // clear openCards when match is found
     openCards = [];

     // check if match is won
     youWon();

   } else {
     // clear openCards when match is not found
     openCards = [];
     // Allow 2nd card to display - timeout for 550ms
     setTimeout(function() {
       console.log('No Match~!');
       currentCard.classList.remove('open', 'show', 'disable');
       previousCard.classList.remove('open', 'show', 'disable');
     }, 550);
   }

   // Calls addMove function, adds move to move counter
   addMove();
 }

// Checks if game is complete
function youWon() {
  if (matchedCards.length === fullCards.length) {
    openModal();
  }
}

// Variables for move counter function
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;

// Adds move to move variable/counter
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  // Check Star Rating
  rating();
}

// Star Rating query selector
const starRating = document.querySelector('.stars');
// Star Rating function
function rating() {
  switch(moves) {
    case 10:
      starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>`;
      break;
    case 15:
      starRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
      break;
    case 20:
      starRating.innerHTML = ``;
      break;
  }
}

// restartBtn query selector
const restartBtn = document.querySelector('.restart');

// Click Event Listener: Restart game when clicking restart icon
restartBtn.addEventListener('click', function() {
  // Clears deck
  deck.innerHTML = "";
  // Reset Star Rating
  starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
  // Calls 'init' function to re-initialize game
  init();
  // Resets matchedCards and move variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
})

// Initialize game
init();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Modal Code */

// Get Modal element
const modal = document.getElementById('modal');
// Get modal close button
const closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for click on modal x button, calls closeModal function
closeBtn.addEventListener('click', closeModal);

// Listen for outside click, closes modal
window.addEventListener('click', outsideClick);

// function to display Modal
function openModal() {
  score();
  modal.style.display= 'block';
  // IN here we want to call a function that collects the star rating, moves, and timer
}

// Modal close button will close modal
function closeModal() {
  modal.style.display = 'none';
}

// function to close modal if clicked outside box
function outsideClick(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// TEST CODE:

const modalBody = document.getElementsByClassName('modal-body');

const modalScore = document.getElementById('modal-score');

function score() {
  modalScore.innerHTML = `Rating: ${starRating.innerHTML} Moves: ${movesContainer.innerHTML} Time:`
}

// Play Again query selector
const playAgain = document.querySelector('.modal-footer');

// Click Event Listener: Restart game when clicking Play Again footer
playAgain.addEventListener('click', function() {
  // Clears deck
  deck.innerHTML = "";
  // Reset Star Rating
  starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
  // Calls 'init' function to re-initialize game
  init();
  // Resets matchedCards and move variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  closeModal();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
