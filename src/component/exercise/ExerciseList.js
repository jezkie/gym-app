import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Item, Button } from 'semantic-ui-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faHistory from '@fortawesome/fontawesome-free-solid/faHistory';
import { Col } from 'react-bootstrap';

const headerStyle = {
    fontSize: 20,
    color: 'black'
}

const ExerciseList = ({ exercises, deleteHandler }) => {
    let exerciseList = exercises.map((item, i) => {
        return (
            <Item key={i}>
                <Item.Content>
                    <Item.Extra>
                        <span style={headerStyle}>{item.name}</span>
                        <Button floated='right'><FontAwesomeIcon icon={faHistory} /></Button>
                    </Item.Extra>
                    <Item.Meta>
                        {item.sets} x {item.reps}
                    </Item.Meta>
                    <Item.Extra>
                        <LinkContainer to={`/log/start/${item.name}/${item.type}/${item.sets}/${item.reps}`} >
                            <Button floated='left' primary circular><FontAwesomeIcon icon={faPlay} /></Button>
                        </LinkContainer>
                        <Button.Group floated='right'>
                            <LinkContainer to={`/edit/exercise/${item.key}`}>
                                <Button primary><FontAwesomeIcon icon={faEdit} /></Button>
                            </LinkContainer>
                            <Button onClick={() => deleteHandler(item.key)} floated='right' negative><FontAwesomeIcon icon={faTrash} /></Button>
                        </Button.Group>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    })
    return (
        <Col lg={4} lgOffset={4} sm={8} smOffset={2}>
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
        </Col>
    )
};

export default ExerciseList;