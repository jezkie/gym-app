import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import NavBar from './component/NavBar';
import Home from './component/Home';
import ExerciseStore from './store';
import AddExercise from './component/AddExercise';

class Main extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div>
          <Provider store={ExerciseStore}>
            <div>
              <Route exact path='/' component={Home} />
              <Route path='/add/exercise/:param' component={AddExercise} />
              <Route path='/about' render={() => <h1>Under construction!</h1>} />
            </div>
          </Provider>
        </div>
      </div>
    );
  }
}

export default Main;
