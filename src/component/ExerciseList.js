import React from 'react';
import defaultImg from '../images/default.svg';
import addIcon from '../images/Add-icon.png';
import { LinkContainer } from 'react-router-bootstrap';

import { Thumbnail, Button, Row, Grid, Col } from 'react-bootstrap';

const ExerciseList = ({ exercises, deleteHandler }) => {
    let exerciseArr = [];
    // tranfer data from firebase to ARRAY because firebase is inconsistenly
    // returning Object instead of ARRAY
    for (var i in exercises) {
        exerciseArr.push(exercises[i]);
    }
    let exerciseList = exerciseArr.map((item, i) => {
        return (
            <Col xs={10} xsOffset={1} md={5} mdOffset={1} lg={3} key={i}>
                <Thumbnail src={defaultImg}>
                    <a onClick={() => deleteHandler(item.id)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </a>
                    <h3>{item.name}</h3>
                    <Button bsStyle="primary">Start</Button>&nbsp;
                    <Button bsStyle="default">Edit</Button>
                </Thumbnail>
            </Col>
        )
    })
    return (
        <Grid>
            <Row>
                <Col xs={10} xsOffset={1} md={5} mdOffset={1} lg={3}>
                <LinkContainer to='/add/exercise/Hello'>
                    <Thumbnail src={addIcon}>
                    </Thumbnail>
                </LinkContainer>
                </Col>
                {exerciseList}
            </Row>
        </Grid>
    )
};

export default ExerciseList;