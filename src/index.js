import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import Main from './App';
import Home from './component/Home';
import ExerciseStore from './store';
import AddExercise from './component/AddExercise';

ReactDOM.render(
    <Provider store={ExerciseStore}>
        <BrowserRouter>
            <div>
                <Redirect from='/' to='/home'></Redirect>
                <Route path='/' component={Main} />
                <Route path='/home' component={Home} />
                <Route path='/add/exercise/:param' component={AddExercise} />
                <Route path='/about' render={() => <h1>Under construction!</h1>}/>
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));

