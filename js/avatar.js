const FILE_TYPES = ['jpeg', 'png', 'jpg'];

const fileChooserFirst = document.querySelector('.ad-form-header__input');
const previewFirst = document.querySelector('.avatar__preview');

const fileChooserSecond = document.querySelector('.ad-form__input');
const previewSecond = document.querySelector('.ad-form__photo');

fileChooserFirst.addEventListener('change', () => {
  const file = fileChooserFirst.files[0];
  const fileName = file.name.toLowerCase();

  const mathes = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(mathes) {
    previewFirst.src = URL.createObjectURL(file);
  }
});

fileChooserSecond.addEventListener('change', () => {
  const file = fileChooserSecond.files[0];
  const fileName = file.name.toLowerCase();

  const mathes = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(mathes) {
    const previewHousingImage = URL.createObjectURL(file);
    previewSecond.innerHTML = `<img src="${previewHousingImage}" alt="Фотография жилья" width="40" height="44" style = "display: block; margin: 13px auto;">`;
  }
});

export {previewFirst, previewSecond};


