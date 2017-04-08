function timerHandler() {
  alert('5초가 지났습니다.');
}

function init() {
  setTimeout(timerHandler, 5000);
}

window.onload = init;
