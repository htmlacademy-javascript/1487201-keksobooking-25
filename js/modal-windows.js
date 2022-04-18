import {isEscapeKey} from './util.js';
import {resetFormAndMap} from './ad-form.js';

const body = document.body;

const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const removeModalWindow = () => {
  const overlay = document.querySelector('.overlay');

  const onDocumentEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      overlay.remove();
      document.removeEventListener('keydown', onDocumentEscKeyDown);
    }
  };

  document.addEventListener('keydown', onDocumentEscKeyDown);

  overlay.addEventListener('click', () => {
    overlay.remove();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  });
};

const showModalWindowSuccess =() => {

  body.appendChild(success);

  removeModalWindow();

  resetFormAndMap();
};


const showModalWindowError =() => {

  body.appendChild(error);

  removeModalWindow();
};


export {showModalWindowSuccess, showModalWindowError};

