import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from 'admin-on-rest';
import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'jwt_token';
export const USER_KEY = 'user';
export const ADMIN = 'ADMIN';
export const MANAGER = 'MANAGER';
export const USER = 'USER';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request('http://localhost:8080/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(jwtDecode(token)));
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem(TOKEN_KEY) ? Promise.resolve() : Promise.reject();
  }
  return Promise.reject('Unkown method');
};

export const authUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

export const isAdminUser = () => {
  const user = authUser();

  if (!user || !user.roles) return false;

  for (let role of user.roles) {
    if (role === ADMIN) return true;
  }

  return false;
}
