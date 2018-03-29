import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fakeAuth } from './auth';

class PrivateRoute extends Component {
    
    render() {
        let user = {};
        user = JSON.parse(localStorage.getItem('user'));

        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={(props) => (
                fakeAuth.isAuthenticated || (user && user.accessToken) ? (<Component {...props} />) :
                    (<Redirect to={{ pathname: '/login', state: { from: this.props.from } }} />)
            )} />
        );
    }
};

export default PrivateRoute;