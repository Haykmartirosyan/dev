import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './views/Login/Login';
import NotFound from './views/NotFound/NotFound'
import PrivateRoute from './PrivateRoute'
import Dashboard from './views/user/Dashboard/Dashboard';

const Main = props => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <Route component={NotFound}/>
    </Switch>
);
export default Main;
