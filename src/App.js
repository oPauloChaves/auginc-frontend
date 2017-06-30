import React from 'react';
import { Admin, Resource, fetchUtils } from 'admin-on-rest';

import restClient from './rest/client';
import authClient, { TOKEN_KEY } from './rest/auth';
import { EmployeeList } from './employees';

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
  >
    <Resource name="employees" list={EmployeeList} />
  </Admin>
);

export default App;
