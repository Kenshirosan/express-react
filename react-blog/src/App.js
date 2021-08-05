import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { headerLinks } from './components/data/data';
import Register from './components/forms/Register';
import Login from "./components/forms/Login";
import Article from './components/layouts/pageComponents/Article';
import Header from './components/layouts/Header';
import Main from './components/layouts/pages/Main';
import Footer from './components/layouts/Footer';
import ArticleOfTheDayComponent from './components/layouts/pageComponents/ArticleOfTheDayComponent';

const App = () => {
    return (
        <Fragment>
            <Router>
                <Header links={headerLinks} />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/article/:id" component={Article} />
                    <Route
                        path="/featured/:id"
                        component={ArticleOfTheDayComponent}
                    />
                </Switch>
                <Footer />
            </Router>
        </Fragment>
    );
};

export default App;
