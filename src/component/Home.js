import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, Row } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import { fetchExercises, deleteExercise } from '../redux/action/ExerciseAction';
import { dropdownLinkState } from '../common/linkstate/LinkState';
import Dropdown from '../common/component/Dropdown';
import {
    CHEST_TYPE,
    SHOULDER_TYPE,
    BACK_TYPE,
    LEG_TYPE,
    DEFAULT_VALUE
} from '../const/exerciseType';

function mapStateToProps(state) {
    return (
        { data: state.ExerciseListReducer }
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchExercises: (key) => {
            dispatch(fetchExercises(key));
        },
        deleteExercise: (key) => {
            dispatch(deleteExercise(key));
        } 
    }
}

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          selectedType: null,
          types: [DEFAULT_VALUE, CHEST_TYPE, BACK_TYPE, SHOULDER_TYPE, LEG_TYPE],
          selectedTypeDescription: DEFAULT_VALUE.description,
        };
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentWillMount() {
        console.log('Component will mount...');

        const { fetchExercises } = this.props;
        fetchExercises(this.state.selectedType);
        console.log(this.props.data.exercises);
    }

    componentWillUpdate(nextProps, nextState) {
        const { fetchExercises } = this.props;
        if (this.state.selectedType !== nextState.selectedType) {
            fetchExercises(nextState.selectedType);
        }
        console.log(this.props.data.exercises);
    }

    deleteExercise(key) {
        this.props.deleteExercise(key);
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <Col lg={12}>
                    <Row>
                        <Col lg={3} className="pull-right">
                            <Dropdown items={this.state.types} 
                                    description={this.state.selectedTypeDescription} 
                                    valueLink={dropdownLinkState(this, 'selectedType', 'selectedTypeDescription')} />
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        { data.exercises && data.exercises.length !== 0 ? 
                            <ExerciseList exercises={ data.exercises } deleteHandler={ this.deleteExercise }></ExerciseList>
                            : <h3>Exercises is empty</h3>
                        }
                    </Row>
                </Col>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);