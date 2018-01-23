import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

import ExerciseStore from './store';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={ExerciseStore}>
            <Route path='/' component={App} />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

