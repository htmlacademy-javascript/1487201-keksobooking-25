import {createNotices} from './data.js';
import {showCard} from './card.js';
import './ad-form.js';

const cards = createNotices(10);

showCard(cards[5]);
