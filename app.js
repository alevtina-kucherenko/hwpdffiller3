/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 1;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;

const diceElement1 = document.querySelector('#dice1');
const diceElement2 = document.querySelector('#dice2');

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  const dice1 = generateDiceValue();
  const dice2 = generateDiceValue();

  diceElement1.src = `dice-${dice1}.png`;
  diceElement2.src = `dice-${dice2}.png`;
  diceElement1.style.display = 'block';
  diceElement2.style.display = 'block';

  if (dice1 !== RESET_VALUE && dice2 !== RESET_VALUE) {
    current += dice1 + dice2;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= 20) {
      alert(`Player ${activePlayer} won!!!`);
    }
    
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

function generateDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}
