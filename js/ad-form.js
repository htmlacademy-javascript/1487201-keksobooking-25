import {resetSettingsMap, resetAddress, onMapFiltersChange} from './map.js';
import {request} from './api.js';
import {sliderElement} from './slider.js';
import {previewFirst, previewSecond} from './avatar.js';
import {DEFAULT_VALUE, filters} from './filter.js';

const MAXIMUM_VALUE_PRICE = 100000;

const PREVIEW_FIRST_STARTING = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'validation-check',
  errorTextParent: 'validation-check',
});

Pristine.addMessages('ru', {

  required: 'Обязательное поле',

  minlength: 'Длина текста от 30 до 100 символов',

});

Pristine.setLocale('ru');

const capacitySelect = adForm.querySelector('#capacity');
const guestNumber = capacitySelect.querySelectorAll('option');
const roomNumber = adForm.querySelector('#room_number');

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = NumberOfGuests[roomValue].indexOf(guest.value) === -1;
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', onRoomNumberChange);

const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

const priceOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

typeSelect.addEventListener('change', () => {

  priceInput.placeholder = priceOfHousing[typeSelect.value];

  priceInput.min = priceOfHousing[typeSelect.value];

  priceInput.value = priceInput.min;

  sliderElement.noUiSlider.updateOptions({
    start: parseInt(priceInput.min, 10),
  });

  pristine.validate();
});

const getMinValue = () => `Минимум ${  priceInput.min}`;

const validateMinPrice = (value) => parseInt(value, 10) >= parseInt(priceInput.min, 10);

pristine.addValidator(priceInput, validateMinPrice, getMinValue, 2, true);

const validateMaxPrice = (value) => value <= MAXIMUM_VALUE_PRICE;

pristine.addValidator(priceInput, validateMaxPrice, 'Максимум 100 000', 2, true);

const timein = adForm.querySelector('#timein');

const timeout = adForm.querySelector('#timeout');

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

const resetFormAndMap = () => {
  resetSettingsMap();

  adForm.reset();

  priceInput.min = priceOfHousing[typeSelect.value];

  priceInput.value = priceInput.min;

  resetAddress();

  sliderElement.noUiSlider.set(priceInput.value);

  previewFirst.src = PREVIEW_FIRST_STARTING;
  previewSecond.innerHTML = '';

  filters.forEach((filter) => {
    filter.value = DEFAULT_VALUE;
  });

  onMapFiltersChange();
};

const setUserFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {

      request(onSuccess, onError, 'POST', new FormData(evt.target));

    }
  });
};

const adFormReset = adForm.querySelector('.ad-form__reset');

adFormReset.addEventListener('click', () => {

  resetFormAndMap();
});

export {setUserFormSubmit, resetFormAndMap, pristine};

