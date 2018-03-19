import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fakeAuth } from './auth';

const appTokenKey = "appToken";

class PrivateRoute extends Component {
    render() {
        return (
            <Route exact={this.props.exact} path={this.props.path} render={(props) => (
                fakeAuth.isAuthenticated || localStorage.getItem(appTokenKey) === '1' ? (<this.props.component />) :
                    (<Redirect to={{ pathname: '/login', state: { from: this.props.from } }} />)
            )} />
        );
    }
};

export default PrivateRoute;