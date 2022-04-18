import {pristine} from './ad-form.js';

const adForm = document.querySelector('.ad-form');
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');

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
  pristine.validate();
});

valueElement.addEventListener('blur', () => {
  sliderElement.noUiSlider.updateOptions({
    start: valueElement.value,
  });
});

if(adForm.classList.contains('ad-form--disabled')) {

  sliderElement.disabled = true;

  sliderElement.noUiSlider.updateOptions({
    keyboardSupport: false,
  });
}

export {sliderElement, valueElement};
