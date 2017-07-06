import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { translate, DashboardMenuItem } from 'admin-on-rest';

import { EmployeeIcon } from './employees';
import { BrandIcon } from './brands';
import { CustomerIcon } from './customers';
import { USER_KEY } from './rest/auth';

const user = JSON.parse(localStorage.getItem(USER_KEY));
const isAdmin = user && user.isAdmin;

const items = [];
items.push(isAdmin ? {name: 'employees', icon: <EmployeeIcon />} : null);
items.push({ name: 'brands', icon: <BrandIcon /> });
items.push({name: 'customers', icon: <CustomerIcon />});

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuTap, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onTouchTap={onMenuTap} />
        {items.map(item => {
          if (!item) return null;
          return (
            <MenuItem
                key={item.name}
                containerElement={<Link to={`/${item.name}`} />}
                primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                leftIcon={item.icon}
                onTouchTap={onMenuTap}
            />
          );
        })}
        <MenuItem
            containerElement={<Link to="/configuration" />}
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onTouchTap={onMenuTap}
        />
        {logout}
    </div>
);

const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale,
    })),
    translate,
);

export default enhance(Menu);
