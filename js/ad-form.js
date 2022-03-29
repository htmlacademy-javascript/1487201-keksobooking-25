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

// Проверка огранечение по максимальному значению input price
function validatePrice (value) {
  return value <= 100000;
}

pristine.addValidator(adForm.querySelector('#price'), validatePrice, 'Максимальное значение 100 000', 2, true);

// Проверка валидности формы при отправке

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    console.log('Форма отправлена!');
  } else {
    console.log('Ошибка в заполнении формы!');
  }
});

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
