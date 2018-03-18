import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './App.css';

import NavBar from './component/NavBar';
import Home from './component/Home';
import AddExercise from './component/exercise/AddExercise';
import EditExercise from './component/exercise/EditExercise';
import StartExercise from './component/log/StartExercise';
import Login from './component/login/Login';
import { fakeAuth } from './component/login/auth';

const appTokenKey = "appToken";

function mapStateToProps(state) {
  return (
    { data: state.ExerciseListReducer }
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
  }
  logout() {
    fakeAuth.signout((isAuthenticated) => {
      if (!isAuthenticated) {
        localStorage.setItem(appTokenKey, '0');
        this.forceUpdate();
      }
    });
  }

  render() {
    if (fakeAuth.isAuthenticated || localStorage.getItem(appTokenKey) === '1') {
      console.log(fakeAuth.isAuthenticated, localStorage.getItem(appTokenKey));
      return (
        <div>
          <header><NavBar logoutHandler={this.logout.bind(this)} /></header>
          <div>
            <Route exect path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/edit/exercise/:param' component={EditExercise} />
            <Route path='/log/start/:param' component={StartExercise} />
            <Route path='/about' render={() => <h1>Under construction!</h1>} />
            <Route path='/add/exercise' component={AddExercise} />
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <Route exact path='/login' component={Login} />
        <Redirect to='/login' />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(Main);