import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, ControlLabel, Panel, Grid, Row } from 'react-bootstrap';

import { linkState } from '../common/LinkState';
import TextInput from '../common/TextInput';
import { createExercise } from './ExerciseAction';

function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExercise: (exercise) => {
            dispatch(createExercise(exercise));
        }
    }
}

class AddExercise extends Component {
    constructor(props){
        super(props);
        this.save = this.save.bind(this);

        this.state = {
            name: '',
            sets: 0,
            reps: 0
        }
    }

    componentWillMount() {
        console.log('Component will mount', this.props);
    }

    save(e){
        e.preventDefault();
        console.log('Current state on save', this.state)

        const { createExercise } = this.props;
    }

    render() {
        console.log(this.props.match.params.param);
        return (

            <form onSubmit={this.save}>
                <FormGroup controlId='name'>
                    <Col componentClass={ControlLabel}>
                        Name
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(this, 'name')} placeholder='Exercise name' type='text'/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='sets'>
                    <Col componentClass={ControlLabel}>
                        Sets
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(this, 'sets')} type='number'/>
                    </Col>
                </FormGroup>
                <FormGroup controlId='reps'>
                    <Col componentClass={ControlLabel}>
                        Reps
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(this, 'reps')} type='number'/>
                    </Col>
                </FormGroup>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AddExercise);