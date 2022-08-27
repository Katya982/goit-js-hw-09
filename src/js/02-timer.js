import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';

const refs = {    
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let intervalId = null;
let selectedDate = 0;
let deltaTime = 0;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {      
        selectedDate = selectedDates[0].getTime();      
        deltaTime = selectedDate - Date.now();
      
        if (selectedDate < Date.now()) {
            return;
      };

        refs.startBtn.disabled = false;
        updateInputValue();
    },
    onValueUpdate() {
        clearInterval(intervalId);
    },
};

flatpickr("#datetime-picker", options);
refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {    
    intervalId = setInterval(countDown, 1000);
    refs.startBtn.disabled = true;    
}

function countDown() {    
    deltaTime = selectedDate - Date.now();

    if (deltaTime < 0) {  
      clearInterval(intervalId);        
        return;
    }

    updateInputValue();
};

function updateInputValue() {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  refs.days.textContent = addNull(days);
  refs.hours.textContent = addNull(hours);
  refs.minutes.textContent = addNull(minutes);
  refs.seconds.textContent = addNull(seconds);
}

function addNull(value) {
    return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

