import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import { fetchExercise, updateExercise } from '../../redux/action/ExerciseAction';
import ExerciseForm from './ExerciseForm';
import {
    CHEST_TYPE,
    SHOULDER_TYPE,
    BACK_TYPE,
    LEG_TYPE,
    DEFAULT_VALUE
} from '../../const/exerciseType';

function mapStateToProps(state) {
    return (
        { data: state.ExerciseListReducer }
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchExercise: (key) => {
            dispatch(fetchExercise(key));
        },
        updateExercise: (exercise) => {
            dispatch(updateExercise(exercise));
        }
    }
}

class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.state = {
            key: '',
            name: '',
            sets: '',
            reps: '',
            type: '',
            types: [DEFAULT_VALUE, CHEST_TYPE, BACK_TYPE, SHOULDER_TYPE, LEG_TYPE],
            selectedTypeDescription: DEFAULT_VALUE.description,
            selectedType: ''
        }
    }

    componentWillMount() {
        const key = this.props.match.params.param;
        const { fetchExercise } = this.props;
        fetchExercise(key);
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        const { exercise } = data;
        if (exercise) {
            this.setState({
                ...this.state, ...exercise,
                selectedType: exercise.type,
                selectedTypeDescription: this.getTypeDescription(exercise.type)
            });
        }
    }

    getTypeDescription(type) {
        let description = this.state.types.filter(obj => {
            return obj.id === type;
        }).map((obj) => {
            return obj.description;
        })
        return description;
    }

    save(e) {
        e.preventDefault();
        const { updateExercise } = this.props;
        const exercise = Object.assign({}, this.state);
        updateExercise(exercise);
    }

    render() {
        return (
            <div>
                <BlockUi tag='div' blocking={!this.props.data.loaded}>
                    <ExerciseForm saveHandler={this.save} _this={this} loaded={this.props.data.loaded} />
                </BlockUi>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(EditExercise);