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

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray};
