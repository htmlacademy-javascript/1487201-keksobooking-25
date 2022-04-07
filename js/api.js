import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    })

    .catch(() => {
      showAlert('Данные с сервера не загрузились. Попробуйте обновить страницу.');
    });
};

const sentData = (onSuccess, onError, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then(() => onSuccess())

    .catch(() => onError());
};

export{getData, sentData};
