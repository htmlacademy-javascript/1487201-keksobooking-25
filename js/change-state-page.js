const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formFields = document.querySelectorAll('fieldset, .map__filter');

const setDisableState = () => {
  formFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const setDisabledForm = () => {
  setDisableState();
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
};

const setAktiveForm = () => {
  setDisableState();
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
};

export {setDisabledForm, setAktiveForm};
