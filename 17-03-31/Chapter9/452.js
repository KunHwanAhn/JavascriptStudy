function reblur(eventObj) {
  var image = eventObj.target;

  image.src = image.id + 'blur.jpg';
}

function showAnswer(eventObj) {
  var image = eventObj.target;

  image.src = image.id + '.jpg';
}

function init() {
  var images = document.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    images[i].onmouseover = showAnswer;
    images[i].onmouseout = reblur;
  }
}

window.onload = init;
