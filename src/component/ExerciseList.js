import React from 'react';
import defaultImg from '../images/default.svg';
import addIcon from '../images/Add-icon.png';
import { LinkContainer } from 'react-router-bootstrap';

import { Thumbnail, Button, Row, Grid, Col } from 'react-bootstrap';

const ExerciseList = ({ exercises, deleteHandler }) => {
    let exerciseList = exercises.map((item, i) => {
        return (
            <Col xs={10} xsOffset={1} md={5} mdOffset={1} lg={3} key={i}>
                <Thumbnail src={defaultImg}>
                    <a onClick={() => deleteHandler(item.key)}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </a>
                    <h3>{item.name}</h3>
                    <Button bsStyle="primary">Start</Button>&nbsp;
                    <LinkContainer to={`/edit/exercise/${item.key}`}>
                        <Button bsStyle="default">Edit</Button>
                    </LinkContainer>
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