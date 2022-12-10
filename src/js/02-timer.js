import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputDateRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minsRef = document.querySelector('span[data-minutes]');
const secsRef = document.querySelector('span[data-seconds]');
const nowDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  dateFormat: "Y-m-d H:i",
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
      console.log(selectedDates[0]);
     // inputDateRef.value = selectedDates[0];
  },
};
const timer = {
    start() {
        const startTime = new Date("2022-12-16 17:57");
    
        setInterval(() => {
            const currentTime = Date.now();
            console.log(UpdateClockFace(convertMs(startTime - currentTime)));
        }, 1000);
    },
}
timer.start();
flatpickr("#datetime-picker", options);

function checkDate(dt) {
  if (Date.parse(dt) - nowDate < 0) {
    alert("sdfdg");
    return;
  }
}

function UpdateClockFace({days,hours, minutes, seconds}) {
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minsRef.textContent = `${minutes}`;
    secsRef.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}