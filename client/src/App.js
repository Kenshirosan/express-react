import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
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
import { HopefullyUsefullInfos } from './components/layouts/pages/blog/HopefullyUsefullInfos';
import CreateRoles from './components/layouts/pages/dashboard/CreateRoles';
import { fetchData } from './utilities';
import StepsLinks from './components/layouts/pages/blog/StepsLinks';

const App = () => {
    // Penser au composant 404 NotFound, ou un composant qui gère les erreurs HTTP
    const [user, setUser] = useState({ email: '' });
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        fetchData('/api/users/auth').then(data => {
            if (data.user) {
                setUser(data.user);
            }
        });
        setToken(localStorage.getItem('token'));
    }, []);

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
                    <PublicRoute exact path="/steps" component={StepsLinks} />
                    <PublicRoute
                        path="/steps/infos"
                        component={HopefullyUsefullInfos}
                    />
                    <PublicRoute exact path="/steps/:steps" component={Steps} />
                    {/* Route privées */}
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        auth={token}
                        component={Dashboard}
                    />
                    <PrivateRoute
                        path="/profile/me"
                        auth={token}
                        component={UserInfo}
                    />
                    {user.role?.name === 'author' ||
                    user.role?.name === 'admin' ? (
                        <PrivateRoute
                            exact
                            path="/dashboard/categories"
                            auth={token}
                            component={CreateCategory}
                        />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                    {user.role?.name === 'author' ||
                    user.role?.name === 'admin' ? (
                        <PrivateRoute
                            exact
                            path="/dashboard/articles"
                            auth={token}
                            component={Test}
                        />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                    {user.role?.name === 'author' ||
                    user.role?.name === 'admin' ? (
                        <PrivateRoute
                            exact
                            path="/dashboard/roles"
                            auth={token}
                            component={CreateRoles}
                        />
                    ) : (
                        <Redirect to="/dashboard" />
                    )}
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    );
};

export default App;
