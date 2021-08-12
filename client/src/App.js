import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Article from './components/layouts/pages/blog/Article';
import Main from './components/layouts/pages/blog/Main';
import Footer from './components/layouts/Footer';
import ArticleOfTheDayComponent from './components/layouts/pages/blog/ArticleOfTheDayComponent';
import Dashboard from './components/layouts/pages/dashboard/Dashboard';
import UserInfo from './components/layouts/pages/dashboard/UserInfo';
import CreateCategory from './components/layouts/pages/dashboard/CreateCategory';
// !! Import et renommage du composant Articles : Ce composant n'est pas export default ! (Voir fichier Articles.jsx) !!
import { CreateArticle as Test } from './components/layouts/pages/dashboard/CreateArticle';
import Steps from './components/layouts/pages/blog/Steps';
import { Test as TestExpress } from './components/layouts/pages/blog/Test';
import CreateRoles from './components/layouts/pages/dashboard/CreateRoles';
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
                    <PublicRoute path="/steps" component={Steps} />
                    <PublicRoute path="/test" component={TestExpress} />
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
                        component={UserInfo}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/categories"
                        auth={user}
                        component={CreateCategory}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/articles"
                        auth={user}
                        component={Test}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/roles"
                        auth={user}
                        component={CreateRoles}
                    />
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    );
};

export default App;
