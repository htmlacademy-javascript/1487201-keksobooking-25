import {setDisabledForm, setAktiveForm} from './change-state-page.js';

import {showCard} from './card.js';
//Создание карты и меток

const settingsMap = {
  lat: 35.6894875,
  lng: 139.6917064,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  zoom: 12,

};

const settingsMainPin = {
  lat: 35.6894875,
  lng: 139.6917064,
  iconUrl: './img/main-pin.svg',
  iconWidth: 52,
  iconSizeHeight: 52,
  anchorAxisOx: 26,
  anchorAxisOy: 52,
};

const settingsPin = {
  lat: 35.6894875,
  lng: 139.6917064,
  iconUrl: './img/pin.svg',
  iconWidth: 40,
  iconSizeHeight: 40,
  anchorAxisOx: 20,
  anchorAxisOy: 40,
};

const adForm = document.querySelector('.ad-form');

setDisabledForm();

const map = L.map('map-canvas').on('load', () => {
  setAktiveForm();
});

map.setView({
  lat: settingsMap.lat,
  lng: settingsMap.lng,
}, settingsMap.zoom);

L.tileLayer(
  settingsMap.tileLayer,
  {
    attribution: settingsMap.attribution,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: settingsMainPin.iconUrl,
  iconSize: [settingsMainPin.iconWidth, settingsMainPin.iconHeyght],
  iconAnchor: [settingsMainPin.anchorAxisOx, settingsMainPin.anchorAxisOy],
});

const mainPinMarker = L.marker(
  {
    lat: settingsMainPin.lat,
    lng: settingsMainPin.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const address = adForm.querySelector('#address');

const addressValueStarting = `${parseFloat(mainPinMarker.getLatLng().lat.toFixed(5))}, ${parseFloat(mainPinMarker.getLatLng().lng.toFixed(5))}`;

const resetAddress = () => {
  address.value = addressValueStarting;
};

resetAddress();

mainPinMarker.on('moveend', (evt) => {
  address.value = `${parseFloat(evt.target.getLatLng().lat.toFixed(5))}, ${parseFloat(evt.target.getLatLng().lng.toFixed(5))}`;
});

//Генерация меток объявлений на карте

const icon = L.icon({
  iconUrl: settingsPin.iconUrl,
  iconSize: [settingsPin.iconWidth, settingsPin.iconHeyght],
  iconAnchor: [settingsPin.anchorAxisOx, settingsPin.anchorAxisOy],
});

const getBallons = (arrayCards) => {

  arrayCards.forEach((arrayCard) => {
    const marker = L.marker(
      {
        lat: arrayCard.location.lat,
        lng: arrayCard.location.lng,
      },
      {
        icon,
      });

    marker.addTo(map).bindPopup(showCard(arrayCard));
  });
};

//Функция сброса карты и главной метки к начальным настройкам

const resetSettingsMap = () => {

  map.closePopup();

  mainPinMarker.setLatLng({
    lat: settingsMainPin.lat,
    lng: settingsMainPin.lng,
  });

  map.setView({
    lat: settingsMap.lat,
    lng: settingsMap.lng,
  }, settingsMap.zoom);

};

export {getBallons, resetSettingsMap, resetAddress};

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
/*
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
*/
