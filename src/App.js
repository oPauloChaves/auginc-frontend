import React from 'react';
import { Admin, fetchUtils, Resource } from 'admin-on-rest';

import restClient from './rest/client';
import authClient, { TOKEN_KEY } from './rest/auth';
import translations from './i18n';
import Menu from './Menu';

import Dashboard from './Dashboard';
import { EmployeeList, EmployeeEdit } from './employees';
import { BrandList } from './brands';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem(TOKEN_KEY);
  options.headers.set('Authorization', token);
  return fetchUtils.fetchJson(url, options);
}
const apiRestClient = restClient("http://localhost:8080/api", httpClient);

const App = () => (
  <Admin
    title="Auginc"
    restClient={apiRestClient}
    authClient={authClient}
    dashboard={Dashboard}
    menu={Menu}
    messages={translations}
  >
    <Resource name="employees" list={EmployeeList} edit={EmployeeEdit} />
    <Resource name="brands" list={BrandList} />
  </Admin>
);

export default App;
