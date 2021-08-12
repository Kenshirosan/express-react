import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../layouts/pages/blog/Header';

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
