import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const Dropdown = ({ valueLink, ...props }) => {
    let menus = props.items.map((item, i) => {
        return (
            <MenuItem onSelect={e => valueLink.set(item.id, item.description)} key={i}>{item.description}</MenuItem>
        )
    });
    return (
        <DropdownButton
            id="input-dropdown-addon"
            title={props.description} >
            {menus}
        </DropdownButton>
    );
};

export default Dropdown;