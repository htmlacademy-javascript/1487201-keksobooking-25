import './ad-form.js';
import './slider.js';
import {getBallons} from './map.js';
import {getData} from './api.js';
import {showModalWindowSuccess, showModalWindowError} from './modal-windows.js';
import {setUserFormSubmit} from './ad-form.js';

getData(getBallons);

setUserFormSubmit(showModalWindowSuccess, showModalWindowError);
