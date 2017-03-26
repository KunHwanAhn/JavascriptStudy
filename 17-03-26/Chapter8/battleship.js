var HIT = 'hit',
    FIRE_SUCCESS = '명중!',
    FIRE_FAIL = '실패했습니다.',
    SHIP_SUNK = '전함을 격침했습니다.',
    ALPHABET = ['A' , 'B', 'C', 'D', 'E', 'F', 'G'],
    ID_GUESS_INPUT = 'guessInput',
    ID_FIRE_BUTTON = 'fireButton';

var view,
    model,
    controller;

function parseGuess(guess) {
  var firstChar,
      row,
      column;

  if (guess === null || guess.length !== 2) {
    alert('입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요.');
  } else {
    firstChar = guess.charAt(0);
    row = ALPHABET.indexOf(firstChar);
    column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert('위칫값이 올바르지 않습니다.');
    } else if (row < 0 || row >= model.boardSize ||
               column < 0 || column >= model.boardSize) {
      alert('앗, 보드 바깥으로 벗어났어요.');
    } else {
      return row + column;
    }
  }

  return null;
}

view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById('messageArea');

    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    var cell = document.getElementById(location);

    cell.setAttribute('class', 'hit');
  },

  displayMiss: function (location) {
    var cell = document.getElementById(location);

    cell.setAttribute('class', 'miss');
  }
};

model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    { locations: [0, 0, 0], hits: ['', '', ''] },
    { locations: [0, 0, 0], hits: ['', '', ''] },
    { locations: [0, 0, 0], hits: ['', '', ''] }
  ],

  fire: function (guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i],
          index;

      index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = HIT;
        view.displayHit(guess);
        view.displayMessage(FIRE_SUCCESS);

        if (this.isSunk(ship)) {
          view.displayMessage(SHIP_SUNK);
          this.shipsSunk++;
        }

        return true;
      }

    }
    view.displayMiss(guess);
    view.displayMessage(FIRE_FAIL);

    return false;
  },

  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== HIT) {
        return false;
      }
    }

    return true;
  },

  generateShpLocations: function (argument) {
    var locations;

    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ships[i].locations = locations;
    }
  },

  generateShip: function () {
    var direction = Math.floor(Math.random() * 2),
        row, col,
        newShipLocations = [];

    if (direction === 1) {  // horizontal
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {  //vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }

    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {  // horizontal
        newShipLocations.push(row + '' + (col + i));
      } else {  //vertical
        newShipLocations.push((row + i) + '' + col);
      }
    }

    return newShipLocations;
  },

  collision: function (locations) {
    for (var i = 0; i < this.numSHips; i++) {
      var ship = model.ships[i];

      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }

    return false;
  }
};

controller = {
  guesses: 0,

  processGuess: function (guess) {
    var location = parseGuess(guess),
        hit;

    if (location) {
      this.guesses++;
      hit = model.fire(location);

      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage('여러분은 ' + this.guesses + '번 추측해 전함을 모두 격침했습니다.');
      }
    }
  }
};

function handleFireButton() {
  var guessInput,
      guess;

  guessInput = document.getElementById(ID_GUESS_INPUT);
  guess = guessInput.value;

  controller.processGuess(guess);
  guessInput.value = '';
}

function handleKeyPress(e) {
  var fireButton = document.getElementById(ID_FIRE_BUTTON);

  if (e.keyCode === 13) {
    fireButton.click();

    return false;
  }
}

function init() {
  var fireButton,
      guessInput;

  fireButton = document.getElementById(ID_FIRE_BUTTON);
  fireButton.onclick = handleFireButton;

  guessInput = document.getElementById(ID_GUESS_INPUT);
  guessInput.onkeypress = handleKeyPress;

  model.generateShpLocations();
}

window.onload = init;
