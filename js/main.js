import './slider.js';
import './ad-form.js';
import './avatar.js';
import {setDisabledForm} from './change-state-page.js';
import {showModalWindowSuccess, showModalWindowError} from './modal-windows.js';
import {setUserFormSubmit} from './ad-form.js';

setDisabledForm();
setUserFormSubmit(showModalWindowSuccess, showModalWindowError);
