import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  SimpleList,
  TextField,
} from 'admin-on-rest';

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
          <TextField source="email" />
          <TextField source="title" />
        </Datagrid>
      }
    />
  </List>
);
