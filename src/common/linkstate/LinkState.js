export function linkState(component, attr) {
    return {
        value: component.state[attr],
        set(x) {
            component.setState({
                ...component.state,
                [attr]: x
            }, () => {
                console.log('linkState on change handler => input', component.state);
            });
        }
    }
}

export function dropdownLinkState(component, attr, descAttr) {
    return {
        value: component.state[attr],
        set(x, y) {
            component.setState({
                ...component.state,
                [attr]: x,
                [descAttr]: y
            }, () => {
                console.log('linkState on change handler => input', component.state);
            });
        }
    }
}