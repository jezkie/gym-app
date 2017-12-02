import React, { Component } from 'react';
import './App.css';

import NavBar from './component/NavBar';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <NavBar />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main;
