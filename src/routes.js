import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Boards from './components/Boards/Boards';
import Design from './components/Custom/Design';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route path = '/about' component = {About}/>
        <Route path = '/boards' component = {Boards}/>
        <Route path = '/customize' component = {Design}/>
    </Switch>
)