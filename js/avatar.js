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

    const photoPreview = document.createElement('img');
    photoPreview.src = previewHousingImage;

    photoPreview.alt = 'Фотография жилья';

    photoPreview.style.width = '40px';

    photoPreview.style.height = '44px';

    photoPreview.style.display = 'block';

    photoPreview.style.margin = '13px auto';

    previewSecond.append(photoPreview);

  }
});

export {previewFirst, previewSecond};


