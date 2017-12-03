export function linkState(component, attr) {
    return {
        value: component.state[attr],
        set(x) {
            component.setState({
                input: {
                    ...component.state,
                    [attr]: x
                }
            }, () => {
                console.log('linkState on change handler => input', component.state);
            });
        }
    }
}