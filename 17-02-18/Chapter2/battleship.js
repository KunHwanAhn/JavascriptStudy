var guess,
    hits = 0,
    guesses = 0,
    stats,
    randomLoc = Math.floor(Math.random() * 5);

var LOCATION1 = randomLoc,
    LOCATION2 = randomLoc + 1,
    LOCATION3 = randomLoc + 2;

var isSunk = false;

while (isSunk === false) {
  guess = parseInt(prompt('준비, 조준, 발사! (0에서 6까지 중 추측한 숫자를 입력하세요):'), 0);

  if (guess < 0 || guess > 6) {
    alert('Invalid Input');
  } else {
    guesses++;

    if (guess === LOCATION1 || guess === LOCATION2 || guess === LOCATION3) {
      alert('명중!');
      hits++;

      if (hits === 3) {
        isSunk = true;
        alert('전함 침몰!');
      }
    } else {
      alert('실패!');
    }
  }
}

stats = '총 ' + guesses + '번 발사했습니다. 명중률: ' + (3 / guesses);
alert(stats);