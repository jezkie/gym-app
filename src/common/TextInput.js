import React from 'react';
import { FormControl } from "react-bootstrap";

const TextInput = ({ valueLink, ...props }) => {
    return (
        <FormControl
            type={props.type}
            placeholder={props.placeholder}
            value={valueLink.value}
            onChange={e => valueLink.set(e.target.value)}>
        </FormControl>
    );
};

export default TextInput;