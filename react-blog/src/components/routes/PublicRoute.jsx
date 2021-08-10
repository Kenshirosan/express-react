import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../layouts/Header';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Fragment>
                <Header />
                <Component {...props} />
            </Fragment>
        )}
    />
);

export default PublicRoute;
