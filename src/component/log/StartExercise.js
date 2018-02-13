import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Label, Segment, Container, Menu } from 'semantic-ui-react';
import moment from 'moment';

import { fetchExercise } from '../../redux/action/ExerciseAction';
import { logExercise } from '../../redux/action/LogExerciseAction';

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
        logExercise: (exercise) => {
            dispatch(logExercise(exercise));
        }
    }
}

class StartExercise extends Component {
    constructor(props) {
        super(props);
        const d = new Date();
        this.state = {
            weight: 150,
            unit: 'lbs',
            date: moment(d).format('L')
        }

        // this.logExercise = this.logExercise.bind(this);
    }

    componentWillMount() {
        const key = this.props.match.params.param;
        const { fetchExercise } = this.props;
        fetchExercise(key);
    }

    renderSets(sets, reps) {
        const result = [];
        for (var i = 0; i < sets; i++) {
            result.push(<Menu.Item key={i} onClick={this.logExercise.bind(this, i)}>{reps}</Menu.Item>);
        }

        return <Menu vertical fluid color='red' style={{ padding: '10px' }}>{result}</Menu>
    }

    logExercise(set) {
        const { data } = this.props;
        const { exercise } = data;
        const { logExercise } = this.props;
        //log exercise here
        const logObj = Object.assign({},
            //object destructuring and property shorhand
            (({ name, reps }) => ({ name, reps }))(exercise),
            this.state,
            { set: set + 1 });
        console.log(logObj);
        logExercise(logObj);
        //start rest time
    }

    render() {
        const { data } = this.props;
        const { exercise } = data;
        return (
            <Container text>
                <Segment color='red' textAlign='center'>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated='left' width={4}>
                                <Header as='h4'>
                                    {exercise.name}
                                </Header>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                                <Label>
                                    Weight
                            <Label.Detail>{this.state.weight} lbs</Label.Detail>
                                </Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    {this.renderSets(exercise.sets, exercise.reps)}

                </Segment>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(StartExercise);