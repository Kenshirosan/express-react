import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Article from './components/layouts/pageComponents/Article';
import Main from './components/layouts/pages/Main';
import Footer from './components/layouts/Footer';
import ArticleOfTheDayComponent from './components/layouts/pageComponents/ArticleOfTheDayComponent';
import Dashboard from './components/layouts/pages/Dashboard';
import Profile from './components/layouts/pageComponents/Profile';

const App = () => {
    const [user] = useState(
        JSON.parse(localStorage.getItem('user')) || { email: '' }
    );
    // Penser au composant 404 NotFound, ou un composant qui gère les erreurs HTTP
    return (
        <Fragment>
            <Router>
                <Switch>
                    <PublicRoute exact path="/" component={Main} />
                    <PublicRoute path="/register" component={Register} />
                    <PublicRoute path="/login" component={Login} />
                    <PublicRoute path="/article/:id" component={Article} />
                    <PublicRoute
                        path="/featured/:id"
                        component={ArticleOfTheDayComponent}
                    />

                    {/* Route privées */}
                    <PrivateRoute
                        path="/dashboard"
                        auth={user}
                        component={Dashboard}
                    />
                    <PrivateRoute
                        path="/profile/me"
                        auth={user}
                        component={Profile}
                    />
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    );
};

export default App;
