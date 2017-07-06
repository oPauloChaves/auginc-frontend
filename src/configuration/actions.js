// From: https://github.com/marmelab/admin-on-rest-demo
export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = theme => ({
    type: CHANGE_THEME,
    payload: theme,
});
