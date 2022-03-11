const AVATARS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];
const TITLES = [
  'Квартира',
  'Загородный дом',
  'Отель',
  'Апартаменты',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'чисто',
  'уютно',
  'просторно',
  'хороший вид из окна',
  'высокие потолки',
  'евроремонт',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min +1)) + min;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomFloat = (min, max, digit) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(digit);
};

const getRandomArrayElement = (array) => array[getRandomInt (0, array.length-1)];
const getRandomArray = (array) => shuffleArray(array).slice(getRandomInt (0, array.length-1));

const createNotice = () => {
  const randomPrice = getRandomInt (0, 10**7);
  const randomRooms = getRandomInt (0, 10);
  const randomGuests = getRandomInt (0, 10**2);
  const randomLat = getRandomFloat (35.65000, 35.70000, 5);
  const randomLng = getRandomFloat (139.70000, 139.80000, 5);

  const author = {};
  const randomInt = getRandomInt (0, AVATARS.length-1);
  const getRandomNoRepeatArrayElement = (array) => array[randomInt];
  author.avatar = `img/avatars/user${  getRandomNoRepeatArrayElement(AVATARS)  }.png`;
  AVATARS.splice(randomInt, 1);

  const offer = {};
  offer.title = getRandomArrayElement(TITLES);
  offer.address = `${  randomLat  }, ${  randomLng  }`;
  offer.price = randomPrice;
  offer.type = getRandomArrayElement(TYPES);
  offer.rooms = randomRooms;
  offer.guests = randomGuests;
  offer.checkin = getRandomArrayElement(CHECKINS);
  offer.checkout = getRandomArrayElement(CHECKOUTS);
  offer.features = getRandomArray(FEATURES);
  offer.description = getRandomArray(DESCRIPTION);
  offer.photos = getRandomArray(PHOTOS);

  const location = {};
  location.lat = randomLat;
  location.lng = randomLng;

  return {
    author,
    offer,
    location,
  };
};

const similarArrayNotices = Array.from({length: 10}, createNotice);

export {similarArrayNotices};
