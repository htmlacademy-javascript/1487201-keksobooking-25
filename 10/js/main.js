import './ad-form.js';
import './slider.js';
import './avatar.js';
import {getBallons} from './map.js';
import {request} from './api.js';
import {showModalWindowSuccess, showModalWindowError} from './modal-windows.js';
import {setUserFormSubmit} from './ad-form.js';
import {showAlert} from './util.js';

request(getBallons, showAlert, 'GET');

setUserFormSubmit(showModalWindowSuccess, showModalWindowError);
