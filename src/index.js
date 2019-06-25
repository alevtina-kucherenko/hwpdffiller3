/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
import Gamer from './modules/gamer';
import {updateStorage, getDataFromLocalStorage, setDataToLocalStorage} from  './modules/storage';
import {generateDiceValue} from './modules/utils';
import './style.css';

import img1 from './assets/dice-1.png';
import img2 from './assets/dice-2.png';
import img3 from './assets/dice-3.png';
import img4 from './assets/dice-4.png';
import img5 from './assets/dice-5.png';
import img6 from './assets/dice-6.png';


const imageMap = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];
const RESET_VALUE = 2;
const DEFAULT_GAME_LIMIT = 100;


let players;
let activePlayer = 0;
let current = 0;
let limit = DEFAULT_GAME_LIMIT;
let isFirstRoll = true;

const diceElement1 = document.querySelector('#dice1');
const diceElement2 = document.querySelector('#dice2');

const limitContainer = document.querySelector('.limit-container');
const limitInput = document.querySelector('#limit');

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';

  resetGameLimit();
  isFirstRoll = true;
  current = 0;

  players = generatePlayers();
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  const dice1 = generateDiceValue();
  const dice2 = generateDiceValue();

  if (isFirstRoll) {
    setGameLimit();
    isFirstRoll = false;
  }

  diceElement1.src = imageMap[dice1-1];
  diceElement2.src = imageMap[dice2-1];
  diceElement1.style.display = 'block';
  diceElement2.style.display = 'block';

  if (dice1 !== RESET_VALUE && dice2 !== RESET_VALUE && dice1 !== dice2) {
    current += dice1 + dice2;
    document.getElementById('current-'+activePlayer).textContent = current;

    const newPlayerScore = players[activePlayer].getScore() + current;

    if (newPlayerScore >= limit) {
      players[activePlayer].setScore(newPlayerScore);
      updateStorage(players, activePlayer);
      alert(`Player ${players[activePlayer].name} won!!!`);
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
  const newScore = players[activePlayer].getScore() + current;
  players[activePlayer].setScore(newScore);
  document.querySelector(`#score-${activePlayer}`).textContent = players[activePlayer].getScore();
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('.btn-list').addEventListener('click', function () {
  const object = getDataFromLocalStorage();
  const sortedPlayers = Object
    .entries(object)
    .sort(function (a, b) {
      return a[1] - b[1];
    })
    .reverse();

  let message = '';

  for(let player of sortedPlayers) {
    message += `${player[0]} - ${player[1]}\n`
  }

  alert(message);
});

function resetGameLimit() {
  limit = DEFAULT_GAME_LIMIT;
  limitInput.value = limit;
  limitContainer.classList.remove('disabled');
  limitInput.removeAttribute('disabled');
}

function setGameLimit() {
  if (limitInput.value) {
    limit = limitInput.value;
  }

  limitInput.value = 'Лимит игры: ' + limit;
  limitContainer.classList.add('disabled');
  limitInput.setAttribute('disabled', 'true');
}



function generatePlayers() {
  let playerNames = getPlayerNames();
  return [new Gamer(playerNames[0]), new Gamer(playerNames[1])];
}


function getPlayerNames() {
  let player1 = prompt('Введите имя первого игрока:', 'игрок 1');
  player1 = checkPlayerName(player1, 'игрок 1');

  let player2 = prompt('Введите имя второго игрока:', 'игрок 2');
  player2 = checkPlayerName(player2, 'игрок 2');

  document.getElementById('name-0').innerHTML = player1;
  document.getElementById('name-1').innerHTML = player2;

  return [player1, player2];
}

function checkPlayerName(playerName, defaultName) {
  const playersFromStorage = getDataFromLocalStorage();

  if (!playerName) {
    playerName = defaultName;
  }

  if (playersFromStorage && playersFromStorage[playerName]) {
    const useExistingName = confirm(`Игрок с именем ${playerName} уже существует. Вы можете продолжить нажав OK или использовать стандартное имя игрока нажав Cancel.`);

    return useExistingName ? playerName : defaultName;
  } else {
    return playerName;
  }
}