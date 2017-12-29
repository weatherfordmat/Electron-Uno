import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';

const Main = () => (
    <Router>
        <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route path="/game" component={App} />
        </Switch>
    </Router>
);

export default Main;