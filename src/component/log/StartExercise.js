import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Label, Segment, Container, Menu } from 'semantic-ui-react';

import { fetchExercise } from '../../redux/action/ExerciseAction';

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
    }
}

class StartExercise extends Component {
    componentWillMount() {
        const key = this.props.match.params.param;
        const { fetchExercise } = this.props;
        fetchExercise(key);
    }

    renderSets(sets, reps) {
        const result = [];
        for (var i = 0; i < sets; i++ ) {
            result.push(<Menu.Item key={i}>{reps}</Menu.Item>);
        }

        return <Menu vertical fluid color='red' style={{padding: '10px'}}>{result}</Menu>
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
                            <Label.Detail>150 lbs</Label.Detail>
                            </Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
                { this.renderSets(exercise.sets, exercise.reps) }

            </Segment>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(StartExercise);