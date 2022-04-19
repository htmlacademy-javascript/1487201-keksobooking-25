import {request} from './api.js';
import {setActiveForm} from './change-state-page.js';
import {filterData} from './filter.js';
import {debounce, onError} from './util.js';
import {showCard} from './card.js';

const MAX_OFFERS = 10;
const RERENDER_DELAY = 500;
const ROUNDING_COORDINATES = 5;

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

const mapFilters = document.querySelector('.map__filters');

let adverts = [];

const map = L.map('map-canvas');

L.tileLayer(
  settingsMap.tileLayer,
  {
    attribution: settingsMap.attribution,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: settingsMainPin.iconUrl,
  iconSize: [settingsMainPin.iconWidth, settingsMainPin.iconHeight],
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

const transmitsAddressStarting = (location) => `${parseFloat(location.getLatLng().lat.toFixed(ROUNDING_COORDINATES))}, ${parseFloat(location.getLatLng().lng.toFixed(ROUNDING_COORDINATES))}`;

const addressValueStarting = transmitsAddressStarting(mainPinMarker);
const resetAddress = () => {
  address.value = addressValueStarting;
};

resetAddress();

mainPinMarker.on('moveend', (evt) => {
  address.value = transmitsAddressStarting(evt.target);
});

const icon = L.icon({
  iconUrl: settingsPin.iconUrl,
  iconSize: [settingsPin.iconWidth, settingsPin.iconHeight],
  iconAnchor: [settingsPin.anchorAxisOx, settingsPin.anchorAxisOy],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (arrayCard) => {
  const marker = L.marker(
    {
      lat: arrayCard.location.lat,
      lng: arrayCard.location.lng,
    },
    {
      icon,
    });

  marker
    .addTo(markerGroup)
    .bindPopup(showCard(arrayCard));
};

const createMarkerGroup = (arrayCards) => {
  arrayCards.forEach((arrayCard) => {
    createMarker(arrayCard);
  });
};


const onMapFiltersChange = () => {
  markerGroup.clearLayers();
  createMarkerGroup(filterData(adverts));
};

const resetMap = () => {
  markerGroup.clearLayers();
  createMarkerGroup(adverts.slice(0, MAX_OFFERS));
};

const onSuccess = (arrayCards) => {

  adverts = arrayCards.slice();

  createMarkerGroup(adverts.slice(0, MAX_OFFERS));

  mapFilters.addEventListener('change', debounce(onMapFiltersChange, RERENDER_DELAY));
};

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

map.on('load', () => {
  setActiveForm();

  request(onSuccess, onError, 'GET');
})
  .setView({
    lat: settingsMap.lat,
    lng: settingsMap.lng,
  }, settingsMap.zoom);

export {resetSettingsMap, resetAddress, resetMap};
