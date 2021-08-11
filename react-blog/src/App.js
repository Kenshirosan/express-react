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
import Category from './components/layouts/pages/Category';
// !! Import et renommage du composant Articles : Ce composant n'est pas export default ! (Voir fichier Articles.jsx) !!
import { Articles as Test } from './components/layouts/pages/Articles';

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
                        exact
                        path="/dashboard"
                        auth={user}
                        component={Dashboard}
                    />
                    <PrivateRoute
                        path="/profile/me"
                        auth={user}
                        component={Profile}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/categories"
                        auth={user}
                        component={Category}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/articles"
                        auth={user}
                        component={Test}
                    />
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    );
};

export default App;
