const bodyRef = document.querySelector('body');
const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButtonRef.addEventListener("click", () => {
  timerId = setInterval(() => {
      bodyRef.style.backgroundColor = getRandomHexColor();
    startButtonRef.disabled = true;
  }, 1000);
});

stopButtonRef.addEventListener("click", () => {
  clearInterval(timerId);
  startButtonRef.disabled = false;
});
