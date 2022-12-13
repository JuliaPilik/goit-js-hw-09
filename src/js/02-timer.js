import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputDateRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minsRef = document.querySelector('span[data-minutes]');
const secsRef = document.querySelector('span[data-seconds]');
btnStartRef.disabled = true;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: "Y-m-d H:i",
  onClose(selectedDates) {

    if (checkDate(selectedDates[0])) {

      btnStartRef.disabled = false;

      btnStartRef.addEventListener("click", () => {

        const startTime = selectedDates[0].getTime();
        btnStartRef.disabled = true;
        inputDateRef.disabled = true;

        timerId = setInterval(() => {
          
          const currentTime = Date.now();
          if  ((startTime - currentTime) > 0) {
            UpdateClockFace(convertMs(startTime - currentTime));
          } else {
            clearInterval(timerId);
          }
        }, 1000);
       
      });
    } else {
      btnStartRef.disabled = true;
  }
      
  },
};

flatpickr("#datetime-picker", options);

function checkDate(dt) {
  const nowDate = new Date();
  const dtInMs = dt.getTime();
  if ((dtInMs - nowDate.getTime()) < 0) {
    alert("Please choose a date in the future");
    return false;
  }
  return true;
}

function UpdateClockFace({days,hours, minutes, seconds}) {
    daysRef.textContent = `${pad(days)}`;
    hoursRef.textContent = `${pad(hours)}`;
    minsRef.textContent = `${pad(minutes)}`;
    secsRef.textContent = `${pad(seconds)}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
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