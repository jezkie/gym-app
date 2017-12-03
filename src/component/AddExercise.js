import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Col, ControlLabel/*, Form, Panel, Grid, Row*/ } from 'react-bootstrap';

import { linkState, dropdownLinkState } from '../common/linkstate/LinkState';
import TextInput from '../common/component/TextInput';
import Dropdown from '../common/component/Dropdown';
import { createExercise } from './ExerciseAction';
import {
    CHEST_TYPE,
    SHOULDER_TYPE,
    BACK_TYPE,
    LEG_TYPE,
    DEFAULT_VALUE
} from '../const/exerciseType';

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
            reps: 0,
            types: [DEFAULT_VALUE, CHEST_TYPE, BACK_TYPE, SHOULDER_TYPE, LEG_TYPE],
            selectedTypeDescription: DEFAULT_VALUE.description,
            type: null
        }

        // this.clearInputs = this.clearInputs.bind(this);
    }

    componentWillMount() {
        console.log('Component will mount', this.props);
    }

    save(e){
        e.preventDefault();
        console.log('Current state on save', this.state)

        const { createExercise } = this.props;

        createExercise({
            name: this.state.name,
            sets: this.state.sets,
            reps: this.state.reps,
            type: this.state.type
        });

       this.clearInputs();
    }

    clearInputs(){
        this.setState({
            name: '',
            sets: 0,
            reps: 0,
            type: null,
            selectedTypeDescription: DEFAULT_VALUE.description
        });
    }

    render() {
        console.log(this.props.match.params.param);

        return (
            
            <form onSubmit={this.save}>
                <Col lg={2} lgOffset={4} md={4} mdOffset={4}>
                    <FormGroup controlId='type'>
                        <Col componentClass={ControlLabel}>
                            Type
                        </Col>
                        <Col>
                            <Dropdown items={this.state.types} 
                                description={this.state.selectedTypeDescription} 
                                valueLink={dropdownLinkState(this, 'type', 'selectedTypeDescription')} />
                        </Col>
                    </FormGroup>
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
                </Col>
            </form>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AddExercise);