import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import PintailDesign from './components/Boards/PintailDesign';
import DropDesign from './components/Boards/DropDesign';
import Boards from './components/Boards/Boards';
import SelectedBoard from './components/Boards/SelectedBoard';
import Design from './components/Custom/Design';
import BoardGrip from './components/Custom/BoardGrip';
import Trucks from './components/Custom/Trucks';
import Wheels from './components/Custom/Wheels';
import Pictures from './components/Custom/Pictures';
import User from './components/User/User';
import Register from './components/User/Register';
import Cart from './components/Cart/Cart';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route path = '/about' component = {About}/>
        <Route path = '/pintail-boards' component = {PintailDesign}/>
        <Route path = '/drop-boards' component = {DropDesign}/>
        <Route path = '/boards' component = {Boards}/>
        <Route path = '/board/:boardname' component = {SelectedBoard}/>
        <Route path = '/customize' component = {Design}/>
        <Route path = '/board-grip' component = {BoardGrip}/>
        <Route path = '/trucks' component = {Trucks}/>
        <Route path = '/wheels' component = {Wheels}/>
        <Route path = '/graphics' component = {Pictures}/>
        <Route path = '/order-history' component = {User}/>
        <Route path = '/register' component = {Register}/>
        <Route path = '/cart' component = {Cart}/>
    </Switch>
)