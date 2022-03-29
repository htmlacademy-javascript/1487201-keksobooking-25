const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const showCard =(card) => {

  const mapCanvasElement = cardTemplate.cloneNode(true);

  const popupAvatar = mapCanvasElement.querySelector('.popup__avatar');

  if (!card.author.avatar) {
    popupAvatar.classList.add('hidden');
  } else {
    popupAvatar.src = `img/avatars/user${ card.author.avatar  }.png`;
  }

  const popupTitle = mapCanvasElement.querySelector('.popup__title');

  if (!card.offer.title) {
    popupTitle.classList.add('hidden');
  } else {
    popupTitle.textContent = card.offer.title;
  }

  const popupTextAddress = mapCanvasElement.querySelector('.popup__text--address');

  if (card.offer.address.includes(NaN)) {
    popupTextAddress.classList.add('hidden');
  } else {
    popupTextAddress.textContent = card.offer.address;
  }

  const popupTextPrice = mapCanvasElement.querySelector('.popup__text--price');

  if (!card.offer.price) {
    popupTextPrice.classList.add('hidden');
  } else {
    popupTextPrice.textContent = `${  card.offer.price  } ₽/ночь`;
  }

  const typesOfHousing = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const popupType = mapCanvasElement.querySelector('.popup__type');

  if (!card.offer.type) {
    popupType.classList.add('hidden');
  } else {
    popupType.textContent = typesOfHousing[card.offer.type];
  }

  const popupTextCapacity = mapCanvasElement.querySelector('.popup__text--capacity');

  if (!card.offer.rooms || !card.offer.guests) {
    popupTextCapacity.classList.add('hidden');
  } else {
    popupTextCapacity.textContent = `${  card.offer.rooms  } комнаты для ${  card.offer.guests  } гостей`;
  }

  const popupTextTime = mapCanvasElement.querySelector('.popup__text--time');

  if (!card.offer.checkin || !card.offer.checkout) {
    popupTextTime.classList.add('hidden');
  } else {
    popupTextTime.textContent = `Заезд после ${  card.offer.checkin  }, выезд до ${  card.offer.checkout  }`;
  }

  const featuresList = mapCanvasElement.querySelector('.popup__features');
  const featuresItems = featuresList.querySelectorAll('.popup__feature');
  const features = card.offer.features;

  if (features.length === 0) {featuresList.classList.add('hidden');
  } else {
    featuresItems.forEach((featuresItem) => {
      const isNecessary = features.some((feature) => featuresItem.classList.contains(`popup__feature--${  feature}`));
      if(!isNecessary) {
        featuresItem.remove();
      }
    });}

  const popupDescription = mapCanvasElement.querySelector('.popup__description');

  if (card.offer.description.length === 0) {
    popupDescription.classList.add('hidden');
  } else {
    popupDescription.textContent = card.offer.description;
  }

  const photosList = mapCanvasElement.querySelector('.popup__photos');
  const photosItems = card.offer.photos;

  photosList.innerHTML = ' ';

  if (photosItems.length === 0) {
    photosList.classList.add('hidden');
  } else {
    photosItems.forEach((photosItem) => {photosList.insertAdjacentHTML('beforeend', `<img src=" ${  photosItem  } " class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`);
    });}

  mapCanvas.appendChild(mapCanvasElement);
};

export {showCard};
