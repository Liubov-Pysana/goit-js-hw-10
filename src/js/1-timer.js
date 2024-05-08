import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
const datePicker = document.querySelector('#datetime-picker');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let timerInterval;
// const greet = () => {
//   console.log('Hello!');
// };

// const intervalId = setInterval(greet, 3000);

// clearInterval(intervalId);

function updateTimerUI() {
  const today = new Date();
  let differenceInMs = userSelectedDate.getTime() - today.getTime();
  if (differenceInMs <= 0) {
    clearInterval(timerInterval);
    datePicker.disabled = false;
    differenceInMs = 0;
  }

  const timeToCountDown = convertMs(differenceInMs);
  console.log(timeToCountDown);

  timerDays.innerHTML = addLeadingZero(timeToCountDown.days);
  timerHours.innerHTML = addLeadingZero(timeToCountDown.hours);
  timerMinutes.innerHTML = addLeadingZero(timeToCountDown.minutes);
  timerSeconds.innerHTML = addLeadingZero(timeToCountDown.seconds);
}

startButton.addEventListener('click', e => {
  startButton.disabled = true;
  datePicker.disabled = true;

  timerInterval = setInterval(updateTimerUI, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userClickedDate = selectedDates[0];
    const today = new Date();
    if (userClickedDate > today) {
      userSelectedDate = userClickedDate;
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.show({
        backgroundColor: '#FF6666',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }

    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
