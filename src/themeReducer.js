// From: https://github.com/marmelab/admin-on-rest-demo/blob/master/src/themeReducer.js
import { CHANGE_THEME } from './configuration/actions';

export default (previousState = 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};
