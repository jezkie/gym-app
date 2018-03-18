import React, { Component } from 'react';
import { FormGroup, Col, ControlLabel, Button, Form, FormControl, Checkbox } from 'react-bootstrap';
import { fakeAuth } from './auth';
import { Redirect } from 'react-router-dom';


const appTokenKey = "appToken";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { redirectToReferer: false }
        this.login = this.login.bind(this);
    }
    login(event) {
        event.preventDefault();
        console.log('called...')
        fakeAuth.authenticate((isAuthenticated) => {
            this.setState(
                { redirectToReferer: isAuthenticated }
            );
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferer } = this.state;
        if (redirectToReferer) {
            localStorage.setItem(appTokenKey, '1');
            return (<Redirect to={from} />)
        }

        return (
            <div>
                <Form horizontal onSubmit={this.login}>
                 <Col lg={6} lgOffset={3}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </FormGroup>
              
                </Col>
                </Form>
            </div>

        );
    }
}

export default Login;