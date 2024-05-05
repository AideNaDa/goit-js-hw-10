import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
let userSelectedDate = null;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    validateSelectedDate();
  },
};

flatpickr(input, options);

function validateSelectedDate() {
  if (!userSelectedDate) {
    buttonStart.disabled = true;
    return;
  }

  const currentDate = new Date();
  if (userSelectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimer(endTime) {
  const timeLeft = endTime - new Date();

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    renderTimer(0);
    return (input.disabled = false);
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  renderTimer({ days, hours, minutes, seconds });
}

function renderTimer({
  days = '0',
  hours = '0',
  minutes = '0',
  seconds = '0',
}) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function handleStartButtonClick() {
  const selectedDate = new Date(input.value);

  buttonStart.disabled = true;
  input.disabled = true;
  countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
  updateTimer(selectedDate);
}

buttonStart.addEventListener('click', handleStartButtonClick);
