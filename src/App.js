import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import NavBar from './component/NavBar';
import Home from './component/Home';
import AddExercise from './component/exercise/AddExercise';
import EditExercise from './component/exercise/EditExercise';
import StartExercise from './component/log/StartExercise';
import Login from './component/login/Login';
import { fakeAuth } from './component/login/auth';
import PrivateRoute from './component/login/PrivateRoute';

class Main extends Component {
  logout() {
    fakeAuth.signout((isAuthenticated) => {
      if (!isAuthenticated) {
        localStorage.clear();
        this.forceUpdate();
      }
    });
  }

  render() {
    let user = {};
    user = JSON.parse(localStorage.getItem('user'));

    return (
      <div>
        {(fakeAuth.isAuthenticated || (user && user.accessToken)) ? <header><NavBar logoutHandler={this.logout.bind(this)} /></header> : null}
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/edit/exercise/:param' component={EditExercise} />
        <PrivateRoute path='/log/start/:param' component={StartExercise} />
        <PrivateRoute path='/add/exercise' from='/add/exercise' component={AddExercise} />
      </div>
    )
  }
}

export default Main;