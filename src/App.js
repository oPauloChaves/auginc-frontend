import React from 'react';
import { Admin, fetchUtils, Resource } from 'admin-on-rest';

import restClient from './rest/client';
import authClient, { TOKEN_KEY } from './rest/auth';
import themeReducer from './themeReducer';
import customRoutes from './routes';
import translations from './i18n';
import Menu from './Menu';
import Layout from './Layout';

import Dashboard from './Dashboard';
import { EmployeeList, EmployeeEdit } from './employees';
import { CustomerList, CustomerEdit, CustomerCreate } from './customers';
import { BrandList } from './brands';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem(TOKEN_KEY);
  options.headers.set('Authorization', token);
  return fetchUtils.fetchJson(url, options);
}

let API_URL = 'https://mysterious-lake-47764.herokuapp.com/api';
if (process.env.NODE_ENV !== 'production') {
  API_URL = 'http://localhost:8080/api';
}

const apiRestClient = restClient(API_URL, httpClient);

const App = () => (
  <Admin
    title="Auginc"
    restClient={apiRestClient}
    authClient={authClient}
    dashboard={Dashboard}
    customReducers={{ theme: themeReducer }}
    customRoutes={customRoutes}
    menu={Menu}
    appLayout={Layout}
    messages={translations}
  >
    <Resource name="employees" list={EmployeeList} edit={EmployeeEdit} />
    <Resource name="brands" list={BrandList} />
    <Resource name="customers" list={CustomerList} edit={CustomerEdit} create={CustomerCreate} />
  </Admin>
);

export default App;
