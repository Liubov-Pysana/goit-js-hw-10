// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delay = document.querySelector('[name=delay]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delayMs = delay.value;
  const shouldResolve =
    document.querySelector('input[name="state"]:checked').value === 'fulfilled';

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delayMs);
      } else {
        reject(delayMs);
      }
    }, delayMs);
  }).then(onSuccess, onError);
});

function onSuccess(delayMs) {
  console.log('success: ' + delayMs);
  iziToast.show({
    backgroundColor: '#66FF66',
    message: `✅ Fulfilled promise in ${delayMs}ms`,
    position: 'topRight',
  });
}
function onError(delayMs) {
  console.log('error: ' + delayMs);
  iziToast.show({
    backgroundColor: '#FF6666',
    message: `❌ Rejected promise in ${delayMs}ms`,
    position: 'topRight',
  });
}
