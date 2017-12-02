import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class AddExercise extends Component {
    constructor(props){
        super(props);
        this.save = this.save.bind(this);
    }

    save(){

    }

    render() {
        console.log(this.props.match.params.param);
        return (
            <div>
                <h1>Add Exercise</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AddExercise);