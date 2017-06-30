import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  SimpleList,
  TextField,
  ReferenceField
} from 'admin-on-rest';

import Icon from 'material-ui/svg-icons/social/person';

export const BrandIcon = Icon;

export const BrandList = (props) => (
  <List {...props} sort={{ field: 'id', order: 'ASC' }} perPage={10}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.commission}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="commission" />
          <ReferenceField label="Employee" source="employee_id" reference="employees">
            <TextField source="fullname" />
          </ReferenceField>
        </Datagrid>
      }
    />
  </List>
);
