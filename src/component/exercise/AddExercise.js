import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createExercise } from '../../redux/action/ExerciseAction';
import ExerciseForm from './ExerciseForm';
import {
    CHEST_TYPE,
    SHOULDER_TYPE,
    BACK_TYPE,
    LEG_TYPE,
    DEFAULT_VALUE
} from '../../const/exerciseType';
import MessageCommon from '../../common/component/MessageCommon';

function mapStateToProps(state) {
    return (
        { data: state.ExerciseListReducer }
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExercise: (exercise) => {
            dispatch(createExercise(exercise));
        }
    }
}

class AddExercise extends Component {
    constructor(props) {
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

    save(e) {
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

    clearInputs() {
        this.setState({
            name: '',
            sets: 0,
            reps: 0,
            type: null,
            selectedTypeDescription: DEFAULT_VALUE.description
        });
    }

    render() {
        const { data } = this.props;
        const { success } = data;
        const { error } = data;
        return (
            <div>
                <MessageCommon success={success} error={error} />
                <ExerciseForm saveHandler={this.save} _this={this} />
            </div>

        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AddExercise);