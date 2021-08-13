import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../layouts/pages/dashboard/common/Header';
import Nav from '../layouts/pages/dashboard/common/Nav';
import QuickActions from '../layouts/pages/dashboard/common/QuickActions';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !auth ? (
                <Redirect to="/login" />
            ) : (
                <Fragment>
                    <Header />
                    <Nav user={props.user} />
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
