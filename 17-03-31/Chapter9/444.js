function showCoords(eventObj) {
  var coords = document.getElementById('coords'),
      x, y;

  x = eventObj.pageX;
  y = eventObj.pageY;

  coords.innerHTML = '지도 좌표: ' + x + ', ' + y;
}

function init() {
  var map = document.getElementById('map');

  map.onmousemove = showCoords;
}

window.onload = init;
