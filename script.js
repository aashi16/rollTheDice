
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let btnNew = document.querySelector('.btn--new');
let dice = document.querySelector('.dice');
let rollDice = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let eliminate = false;

function init() {
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  dice.classList.add('hidden');
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  init();
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

//roll dice
rollDice.addEventListener('click', function () {
  if (playing) {
    let diceVal = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${diceVal}.png`;
    if (diceVal !== 1) {
      currentScore += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      eliminate = false;
    } else {
      eliminate = true;
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing && !eliminate) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      party.confetti(this, {
        count: party.variation.range(20, 80),
        size: party.variation.range(0.5, 1.25),
        // ... and more!
      });
    } else {
      switchPlayer();
    }
  }
});
