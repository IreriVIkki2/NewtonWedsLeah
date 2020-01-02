import React, { Component } from "react";
import { updateValue } from "../firebase";
import { UserContext } from "./UserContext";

class TextAreaForm extends Component {
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

    textAreaAdjust = () => {
        try {
            const el = document.getElementById(this.props.id);
            el.style.height = "1px";
            el.style.height = 25 + el.scrollHeight + "px";
        } catch (error) {
            // console.error(error);
        }
    };

    componentDidMount() {
        this.textAreaAdjust();
    }

    render() {
        const { id, page } = this.props;
        const { newValue } = this.state;
        this.autoSave();
        this.textAreaAdjust();
        if (!this.context.user) return this.props.value;
        return (
            <textarea
                id={id}
                className="text-area-field w-100"
                onChange={e => this.handleChange(e.target.value)}
                value={newValue}
                onBlur={() => updateValue(page, id, newValue)}
            />
        );
    }
}
export default TextAreaForm;
