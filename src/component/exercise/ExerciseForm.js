import React from 'react';

import { FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { linkState, dropdownLinkState } from '../../common/linkstate/LinkState';
import TextInput from '../../common/component/TextInput';
import Dropdown from '../../common/component/Dropdown';

const ExerciseForm = ({ saveHandler, _this }) => {
    return (

        <form onSubmit={_this.save}>

            <Col lg={2} lgOffset={4} md={4} mdOffset={4}>
                <FormGroup controlId='type'>
                    <Col componentClass={ControlLabel}>
                        Type
                    </Col>
                    <Col>
                        <Dropdown items={_this.state.types}
                            description={_this.state.selectedTypeDescription}
                            valueLink={dropdownLinkState(_this, 'type', 'selectedTypeDescription')} />
                    </Col>
                </FormGroup>
                <FormGroup controlId='name'>
                    <Col componentClass={ControlLabel}>
                        Name
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(_this, 'name')} placeholder='Exercise name' type='text' />
                    </Col>
                </FormGroup>
                <FormGroup controlId='sets'>
                    <Col componentClass={ControlLabel}>
                        Sets
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(_this, 'sets')} type='number' />
                    </Col>
                </FormGroup>
                <FormGroup controlId='reps'>
                    <Col componentClass={ControlLabel}>
                        Reps
                    </Col>
                    <Col>
                        <TextInput valueLink={linkState(_this, 'reps')} type='number' />
                    </Col>
                </FormGroup>
                <input type="submit" value="Submit" />
            </Col>
        </form>
    );
};

export default ExerciseForm;