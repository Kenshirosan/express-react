import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { headerLinks } from '../data/data';
import Header from '../layouts/Header';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Fragment>
                <Header links={headerLinks} />
                <Component {...props} />
            </Fragment>
        )}
    />
);

export default PublicRoute;
