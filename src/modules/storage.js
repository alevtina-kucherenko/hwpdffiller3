const STORAGE_KEY = 'players';
function updateStorage(players, activePlayer) {
  const playerName = players[activePlayer].name;
  let playersObject = getDataFromLocalStorage();

  if (playersObject) {
    playersObject[playerName] = playersObject[playerName] ? playersObject[playerName] + 1 : 1;
  } else {
    playersObject = {
      [playerName]: 1
    };
  }

  setDataToLocalStorage(playersObject);
}

function getDataFromLocalStorage() {
  const string = localStorage.getItem(STORAGE_KEY);
  return string ? JSON.parse(string) : undefined;
}

function setDataToLocalStorage(object) {
  const string = JSON.stringify(object);
  localStorage.setItem(STORAGE_KEY, string);
}

export {updateStorage, getDataFromLocalStorage, setDataToLocalStorage};