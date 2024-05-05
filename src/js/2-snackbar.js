import iziToast from "izitoast";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const delay = parseInt(delayInput.value);

    const stateInput = document.querySelector('input[name="state"]:checked');
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve(delay) : reject(delay);
        }, delay);
    });

    promise.then((delay) => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`
        });
    }).catch((delay) => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`
        });
    });
    form.reset();
});