function showAnswer() {
  var image = document.getElementById('zero');
  image.src = 'zero.jpg';
}

function init() {
  var image = document.getElementById('zero');

  image.onclick = showAnswer;
}

window.onload = init;
