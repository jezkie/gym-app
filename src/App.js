import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import './App.css';

import NavBar from './component/NavBar';
import Home from './component/Home';
import AddExercise from './component/AddExercise';
import EditExercise from './component/EditExercise';

function mapStateToProps(state) {
  return (
    { data: state.ExerciseListReducer }
  );
}

class Main extends Component {
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/add/exercise/:param' component={AddExercise} />
          <Route path='/edit/exercise/:param' component={EditExercise} />
          <Route path='/about' render={() => <h1>Under construction!</h1>} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Main);