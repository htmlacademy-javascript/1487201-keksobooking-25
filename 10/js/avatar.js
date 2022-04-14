const FILE_TYPES = ['jpeg', 'png', 'jpg'];

const fileChooser = document.querySelector('.ad-form-header__input');
const preview = document.querySelector('.avatar__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const mathes = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(mathes) {
    preview.src = URL.createObjectURL(file);
  }
});
