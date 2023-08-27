import {
    DEFAULT_DISPLAY_TIME,
    errorTextEl,
    errorEl
} from '../common.js';


const renderError = (message = 'Something when wrong') => {
    errorTextEl.textContent = message;
        errorEl.classList.add('error--visible');
        setTimeout(() => {
            errorEl.classList.remove('error--visible');
        }, DEFAULT_DISPLAY_TIME);
}

export default renderError;