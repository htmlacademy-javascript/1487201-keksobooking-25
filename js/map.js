const adForm = document.querySelector('.ad-form');

const map = L.map('map-canvas');

const mainPinStartingLat = 35.6894875;
const mainPinStartingLng = 139.6917064;

map.setView({
  lat: mainPinStartingLat,
  lng: mainPinStartingLng,
}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: mainPinStartingLat,
    lng: mainPinStartingLng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const address = adForm.querySelector('#address');

address.placeholder = `${parseFloat(mainPinMarker.getLatLng().lat.toFixed(5))}, ${parseFloat(mainPinMarker.getLatLng().lng.toFixed(5))}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${parseFloat(evt.target.getLatLng().lat.toFixed(5))}, ${parseFloat(evt.target.getLatLng().lng.toFixed(5))}`;
});

const adFormSubmit = adForm.querySelector('.ad-form__submit');
const adFormReset = adForm.querySelector('.ad-form__reset');

const resetSettingsMap = () => {
  mainPinMarker.setLatLng({
    lat: mainPinStartingLat,
    lng: mainPinStartingLng,
  });

  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);
};

adFormReset.addEventListener('click', () => {
  resetSettingsMap();
});

adFormSubmit.addEventListener('submit', () => {
  resetSettingsMap();
});

//Генерация меток объявлений на карте

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getBallons = (arrayCards, createPopup) => {

  arrayCards.forEach((arrayCard) => {
    const marker = L.marker(
      {
        lat: arrayCard.location.lat,
        lng: arrayCard.location.lng,
      },
      {
        icon,
      });

    marker.addTo(map).bindPopup(createPopup(arrayCard));
  });
};

export {map, getBallons};


/*
import {createNotices} from './data.js';
import {showCard} from './card.js';

const cards = createNotices(10);

cards.forEach((card) => {
  const marker = L.marker(
    {
      lat: card.location.lat,
      lng: card.location.lng,
    },
    {
      icon,
    });

  marker.addTo(map).bindPopup(showCard(card));
});
*/
