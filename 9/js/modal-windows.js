import {isEscapeKey} from './util.js';
import {resetFormAndMap} from './ad-form.js';

const body = document.body;

const success = document.querySelector('#success').content.querySelector('.success');

const error = document.querySelector('#error').content.querySelector('.error');

body.appendChild(success);
success.classList.add('hidden');

body.appendChild(error);
error.classList.add('hidden');


const showModalWindowSuccess =() => {

  success.classList.remove('hidden');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      success.classList.add('hidden');
    }
  });

  document.addEventListener('click', () => {
    success.classList.add('hidden');
  });

  resetFormAndMap();
};


const showModalWindowError =() => {

  error.classList.remove('hidden');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      error.classList.add('hidden');
    }
  });

  document.addEventListener('click', () => {
    error.classList.add('hidden');
  });
};


export {showModalWindowSuccess, showModalWindowError};

