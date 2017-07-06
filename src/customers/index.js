import React from 'react';
import {
  Datagrid,
  List,
  Edit,
  Create,
  Responsive,
  SimpleList,
  TextField,
  EmailField,
  EditButton,
  DisabledInput,
  TextInput,
  TabbedForm,
  FormTab,
  SelectInput
} from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/social/person';

export const CustomerIcon = Icon;

const choices = [
  {state: "Acre", name: "AC"},
  {state: "Alagoas", name: "AL"},
  {state: "Amapá", name: "AP"},
  {state: "Amazonas", name: "AM"},
  {state: "Bahia", name: "BA"},
  {state: "Ceará", name: "CE"},
  {state: "Distrito Federal", name: "DF"},
  {state: "Espírito Santo", name: "ES"},
  {state: "Goiás", name: "GO"},
  {state: "Maranhão", name: "MA"},
  {state: "Mato Grosso", name: "MT"},
  {state: "Mato Grosso do Sul", name: "MS"},
  {state: "Minas Gerais", name: "MG"},
  {state: "Pará", name: "PA"},
  {state: "Paraíba", name: "PB"},
  {state: "Paraná", name: "PR"},
  {state: "Pernambuco", name: "PE"},
  {state: "Piauí", name: "PI"},
  {state: "Rio de Janeiro", name: "RJ"},
  {state: "Rio Grande do Norte", name: "RN"},
  {state: "Rio Grande do Sul", name: "RS"},
  {state: "Rondônia", name: "RO"},
  {state: "Roraima", name: "RR"},
  {state: "Santa Catarina", name: "SC"},
  {state: "São Paulo", name: "SP"},
  {state: "Sergipe", name: "SE"},
  {state: "Tocantins", name: "TO"}
];

export const CustomerList = (props) => (
  <List {...props} sort={{ field: 'id', order: 'ASC' }} perPage={10}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => `${record.first_name} ${record.last_name}`}
          secondaryText={record => record.email}
          tertiaryText={record => new Date().toLocaleDateString()}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />
          <TextField source="phone" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export const CustomerCreate = (props) => (
  <Create title="Create Customer" {...props}>
    <TabbedForm>
      <FormTab label="Dados Pessoais">
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <TextInput source="email" />
        <TextInput source="title" />
        <TextInput source="phone" />
      </FormTab>
      <FormTab label="resources.address.name">
        <TextInput source="address.street" label="resources.address.fields.street" />
        <TextInput source="address.street2" label="resources.address.fields.street2" />
        <TextInput source="address.houseNumber" label="resources.address.fields.number" />
        <TextInput source="address.zipCode" label="resources.address.fields.zipcode" />
        <TextInput source="address.city" label="resources.address.fields.city" />
        <TextInput source="address.country" label="resources.address.fields.country" />
        <SelectInput
          label="resources.address.fields.state"
          source="address.federalState"
          choices={choices}
          optionText="state"
          optionValue="name" />
      </FormTab>
    </TabbedForm>
  </Create>
);

export const CustomerEdit = (props) => (
  <Edit title="Edit Customer" {...props}>
    <TabbedForm>
      <FormTab label="Dados Pessoais">
        <DisabledInput source="id" />
        <TextInput source="first_name" />
        <TextInput source="last_name" />
        <TextInput source="email" />
        <TextInput source="title" />
        <TextInput source="phone" />
      </FormTab>
      <FormTab label="resources.address.name">
        <TextInput source="address.street" label="resources.address.fields.street" />
        <TextInput source="address.street2" label="resources.address.fields.street2" />
        <TextInput source="address.houseNumber" label="resources.address.fields.number" />
        <TextInput source="address.zipCode" label="resources.address.fields.zipcode" />
        <TextInput source="address.city" label="resources.address.fields.city" />
        <TextInput source="address.country" label="resources.address.fields.country" />
        <SelectInput
          label="resources.address.fields.state"
          source="address.federalState"
          choices={choices}
          optionText="state"
          optionValue="name" />
      </FormTab>
    </TabbedForm>
  </Edit>
);
