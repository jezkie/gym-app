import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fakeAuth } from './auth';

const appTokenKey = "appToken";

class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={(props) => (
                fakeAuth.isAuthenticated || localStorage.getItem(appTokenKey) === '1' ? (<Component {...props} />) :
                    (<Redirect to={{ pathname: '/login', state: { from: this.props.from } }} />)
            )} />
        );
    }
};

export default PrivateRoute;