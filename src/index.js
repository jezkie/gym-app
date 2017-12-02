import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';

import './index.css';
import Main from './App';

ReactDOM.render(
    <BrowserRouter>
        <Route path='/' component={Main} />
    </BrowserRouter>
    , document.getElementById('root'));

