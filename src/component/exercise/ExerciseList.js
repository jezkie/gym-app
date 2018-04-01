import React from 'react';
import defaultImg from '../../images/default.svg';
import addIcon from '../../images/Add-icon.png';
import { LinkContainer } from 'react-router-bootstrap';
import { Item, Button } from 'semantic-ui-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import { Thumbnail, Row, Grid, Col } from 'react-bootstrap';

const ExerciseList = ({ exercises, deleteHandler }) => {
    let exerciseList = exercises.map((item, i) => {
        return (
            <Item key={i}>
                <Item.Content>
                    <Item.Header>
                        {item.name}
                    </Item.Header>
                    <Item.Description>
                        {item.sets} x {item.reps}
                    </Item.Description>
                    <Item.Extra>
                        <LinkContainer to={`/log/start/${item.key}`} >
                            <Button floated='left' primary circular><FontAwesomeIcon icon={faPlay} /></Button>
                        </LinkContainer>
                        <Button.Group floated='right'>
                            <LinkContainer to={`/edit/exercise/${item.key}`}>
                                <Button><FontAwesomeIcon icon={faEdit} /></Button>
                            </LinkContainer>
                            <Button.Or/>
                            <Button onClick={() => deleteHandler(item.key)} floated='right' negative><FontAwesomeIcon icon={faTrash} /></Button>
                        </Button.Group>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    })
    return (
        <Grid>
            <Item.Group divided>
                <Item>
                    <Item.Content>
                        <LinkContainer to='/add/exercise'>
                            <Button positive><FontAwesomeIcon icon={faPlus} /></Button>
                        </LinkContainer>
                    </Item.Content>
                </Item>
                {exerciseList}
            </Item.Group>
        </Grid>
    )
};

export default ExerciseList;