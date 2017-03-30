function reblur(image) {
  image.src = image.id + 'blur.jpg';
}

function showAnswer(eventObj) {
  var image = eventObj.target;

  image.src = image.id + '.jpg';

  setTimeout(reblur, 2000, image);
}

function init() {
  var images = document.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    images[i].onclick = showAnswer;
  }
}

window.onload = init;
