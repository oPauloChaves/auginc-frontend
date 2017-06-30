import React from 'react';
import {
  Datagrid,
  List,
  Edit,
  Responsive,
  SimpleList,
  SimpleForm,
  TextField,
  EmailField,
  EditButton,
  DisabledInput,
  TextInput
} from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/social/person';

export const EmployeeIcon = Icon;

export const EmployeeList = (props) => (
  <List {...props} sort={{ field: 'id', order: 'ASC' }} perPage={10}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.fullname}
          secondaryText={record => record.email}
          tertiaryText={record => new Date().toLocaleDateString()}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="fullname" />
          <EmailField source="email" />
          <TextField source="title" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export const EmployeeEdit = (props) => (
    <Edit title="Edit Employee" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <TextInput source="title" />
            <TextInput source="phone" />
        </SimpleForm>
    </Edit>
);
