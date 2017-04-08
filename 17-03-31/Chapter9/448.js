var tick = true;

function ticker() {
  if (tick) {
    console.log('똑');
    tick = false;
  } else {
    console.log('딱');
    tick = true;
  }
}

function init() {
  setInterval(ticker, 1000);
}

window.onload = init;
