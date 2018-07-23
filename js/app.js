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
       card.classList.add('open', 'show');
       openCards.push(this);

       // Call function to compare open cards
       compare(currentCard, previousCard);

     } else {
       card.classList.add('open', 'show');
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
       currentCard.classList.remove('open', 'show');
       previousCard.classList.remove('open', 'show');
     }, 550);
   }
 }

function youWon() {
  if (matchedCards.length === fullCards.length) {
    alert("YOU WON!!");
  }
}

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
