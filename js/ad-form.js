const adForm = document.querySelector('.ad-form');

const MAXIMUM_VALUE_PRICE = 100000;

const pristine = new Pristine(adForm, {
  classTo: 'validation-check',
  errorTextParent: 'validation-check',
});

Pristine.addMessages('ru', {
  required: 'Обязательное поле',
  minlength: 'Длина текста от 30 до 100 символов',
  // eslint-disable-next-line no-template-curly-in-string
  min: 'Минимум ${1}',
});

Pristine.setLocale('ru');

//Сценарий получения соответствия количества спальных мест количеству комнат

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

//Сценарий получения влияния поля «Тип жилья» на минимальное значение поля «Цена за ночь»

const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');

// Проверка огранечение по минимальному значению input price

const priceOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// eslint-disable-next-line prefer-template
const getMinValue = () => 'Минимум ' + priceInput.min;

const validateMinPrice = (value) => parseInt(value, 10) >= parseInt(priceInput.min, 10);

pristine.addValidator(priceInput, validateMinPrice, getMinValue, 2, true);

typeSelect.addEventListener('change', () => {
  priceInput.placeholder = priceOfHousing[typeSelect.value];
  priceInput.min = priceOfHousing[typeSelect.value];
  pristine.validate();
});

// Проверка огранечение по максимальному значению input price
function validateMaxPrice (value) {
  return value <= MAXIMUM_VALUE_PRICE;
}

pristine.addValidator(priceInput, validateMaxPrice, 'Максимум 100 000', 2, true);

// Синхронизация полей «Время заезда» и «Время выезда»
const timein = adForm.querySelector('#timein');
const timeinOptions = timein.querySelectorAll('option');

const timeout = adForm.querySelector('#timeout');
const timeoutOptions = timeout.querySelectorAll('option');

timein.addEventListener('change', () => {
  timeoutOptions.forEach((item) => {
    if(timein.value === item.value) {
      timeout.value = item.value;
    }
  });
});

timeout.addEventListener('change', () => {
  timeinOptions.forEach((item) => {
    if(timeout.value === item.value) {
      timein.value = item.value;
    }
  });
});


// Проверка валидности формы при отправке

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    console.log('Форма отправлена!');
  } else {
    console.log('Ошибка в заполнении формы!');
  }
});

