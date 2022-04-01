import {createNotices} from './data.js';
import {showCard} from './card.js';
import './ad-form.js';
import {getBallons} from './map.js';
import './change-state-page.js';
import './slider.js';

getBallons(createNotices(10), showCard);
