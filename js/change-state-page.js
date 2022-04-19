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
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
};

const setActiveForm = () => {
  setDisableState();
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
};

export {setDisabledForm, setActiveForm};
