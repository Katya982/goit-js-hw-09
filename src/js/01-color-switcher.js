
    const refs = {
startBtn: document.querySelector('button[data-start]'),
stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', start);
refs.stopBtn.addEventListener('click', stop);

let intervalId = null;

function start() {
    changeColor();
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(changeColor, 1000);
}

function stop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

//   refs.startBtn.addEventListener('click', () => {
//    refs.startBtn.disabled = true;
//    refs.stopBtn.disabled = false;

//    intervalId = setInterval(() => {
//     document.body.style.background = getRandomHexColor();
//   }, 1000);
// });

//   refs.stopBtn.addEventListener('click', () => {
//    clearInterval(intervalId);
//    refs.startBtn.disabled = false;
//    refs.stopBtn.disabled = true;
// });
