const adForm = document.querySelector('.ad-form');
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');
const typeOfHousing = adForm.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1000,
  connect: 'lower',
  format: {
    to: (value) => value,
    from: (value) => parseFloat(value)
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

typeOfHousing.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: valueElement.min,
  });
});

valueElement.addEventListener('blur', () => {
  sliderElement.noUiSlider.updateOptions({
    start: valueElement.value,
  });
});

if(adForm.classList.contains('ad-form--disabled')) {

  sliderElement.setAttribute('disabled', true);

  sliderElement.noUiSlider.updateOptions({
    keyboardSupport: false,
  });
}

export {sliderElement, valueElement};
