import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DropdownButton, MenuItem, Col, Row } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import { fetchExercises, deleteExercise } from './ExerciseAction';
import {
    CHEST_TYPE,
    SHOULDER_TYPE,
    BACK_TYPE,
    LEG_TYPE
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
          types: [] ,
          selectedType: null,
          selectedTypeDescription: '-- Workout Type --'
        };
        this.deleteExercise = this.deleteExercise.bind(this);
        this.onExerciseTypeChange = this.onExerciseTypeChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            types: [{description: '-- Workout Type --'}, CHEST_TYPE, BACK_TYPE, SHOULDER_TYPE, LEG_TYPE]
        })
        const { fetchExercises } = this.props;
        fetchExercises(this.state.selectedType);
    }

    onExerciseTypeChange(id, description){
        const { fetchExercises } = this.props;
        this.setState({
            selectedType: id,
            selectedTypeDescription: description
        }, () => {
            fetchExercises(this.state.selectedType)
        });
    }

    deleteExercise(key) {
        this.props.deleteExercise(key);
    }

    render() {
        const { data } = this.props;
        let menus = this.state.types.map((item, i)=> {
            return (
                <MenuItem key={item.id} onSelect={() => this.onExerciseTypeChange(item.id, item.description)} key={i}>{item.description}</MenuItem>
            )
        });
        return (
            <div>
                <Col lg={12}>
                    <Row>
                        <Col lg={3} className="pull-right">
                            <DropdownButton
                                id="input-dropdown-addon"
                                title={this.state.selectedTypeDescription} >
                                { menus }
                            </DropdownButton>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        { data.exercises ? 
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