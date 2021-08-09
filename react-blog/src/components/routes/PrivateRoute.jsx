import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../layouts/pageComponents/dashboard/Header';
import Nav from '../layouts/pageComponents/dashboard/Nav';
import QuickActions from '../layouts/pageComponents/dashboard/QuickActions';

const PrivateRoute = ({ component: Component, auth: { email }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !email ? (
                <Redirect to="/login" />
            ) : (
                <Fragment>
                    <Header />
                    <Nav />
                    <div className="container-fluid">
                        <div className="row">
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <QuickActions />
                                <Component {...props} />
                            </main>
                        </div>
                    </div>
                </Fragment>
            )
        }
    />
);

export default PrivateRoute;
