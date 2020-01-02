import React, { Component } from "react";
import { updateValue } from "../firebase";
import { UserContext } from "./UserContext";

class InputForm extends Component {
    static contextType = UserContext;
    state = {
        newValue: this.props.value,
        changed: false,
        changes: 0,
    };

    autoSave = async () => {
        const { id, page } = this.props;
        const { changed, newValue, changes } = this.state;
        if (changed && changes > 5) {
            await updateValue(page, id, newValue);
            this.setState({ changed: false, changes: 0 });
        }
    };

    handleChange = value => {
        this.setState(initialState => {
            return {
                newValue: value,
                changed: true,
                changes: initialState.changes + 1,
            };
        });
    };

    render() {
        const { id, page } = this.props;
        const { newValue } = this.state;
        this.autoSave();
        if (!this.context.user) return this.props.value;
        return (
            <input
                className="w-100 bg-transparent"
                type="text"
                id={id}
                onChange={e => this.handleChange(e.target.value)}
                value={newValue}
                onBlur={() => updateValue(page, id, newValue)}
            />
        );
    }
}
export default InputForm;
