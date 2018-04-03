import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Label, Segment, Container, Menu } from 'semantic-ui-react';
import moment from 'moment';

import { setExerciseDetail } from '../../redux/action/ExerciseAction';
import { logExercise } from '../../redux/action/LogExerciseAction';
import Countdown from '../../common/util/Countdown';

function mapStateToProps(state) {
    return (
        { data: state.ExerciseListReducer }
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        logExercise: (exercise) => {
            dispatch(logExercise(exercise));
        },
        setExerciseDetail: (exercise) => {
            dispatch(setExerciseDetail(exercise));
        }
    }
}

class StartExercise extends Component {
    constructor(props) {
        super(props);
        const d = new Date();
        this.state = {
            date: moment(d).format('L'),
            finishedSets: [],
            showTimer: false
        }
        this.latestRetrieved = false;
        this.countDownFinishHandler = this.countDownFinishHandler.bind(this);
    }

    componentWillMount() {
        const { setExerciseDetail } = this.props;
        console.log(this.props.match.params);
        setExerciseDetail(this.props.match.params);
    }

    renderSets(sets, reps) {
        const result = [];
        for (var i = 0; i < sets; i++) {
            if (this.state.finishedSets.includes(i)) {
                result.push(<Menu.Item key={i} disabled onClick={this.logExercise.bind(this, i)}>{reps}</Menu.Item>);
            } else {
                result.push(<Menu.Item key={i} onClick={this.logExercise.bind(this, i)}>{reps}</Menu.Item>);
            }
        }
        return <Menu vertical fluid color='red' style={{ padding: '10px' }}>{result}</Menu>
    }

    logExercise(set) {
        const newArr = this.state.finishedSets.slice();
        newArr.push(set);

        if (this.state.showTimer) {
            this.setState({ showTimer: false }, () => { // this will unmount current timer and mount in the callback below
                this.setState({ showTimer: true, finishedSets: newArr })
            });
            // return; enable this instead if we don't want user to proceed without completing the rest time
        } else {
            this.setState({ showTimer: true, finishedSets: newArr });
        }

        const { data, logExercise } = this.props;
        const { exercise } = data;
        const { finishedSets, showTimer, ...includedFields } = this.state;
        const logObj = Object.assign({},
            //object destructuring and property shorhand
            (({ name, reps, type }) => ({ name, reps, type }))(exercise),
            includedFields,
            { set: set + 1 });
        console.log(logObj);
        logExercise(logObj);
    }

    countDownFinishHandler() {
        this.setState({ showTimer: false });
    }

    render() {
        const { data } = this.props;
        const { exercise } = data;
        const { showTimer } = this.state;

        return (

            <Container text>
                {showTimer ? <div id="timer"><Countdown countDownFinishHandler={this.countDownFinishHandler} /></div> : null}
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
                            <Label.Detail>{exercise.weight} {exercise.unit}</Label.Detail>
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