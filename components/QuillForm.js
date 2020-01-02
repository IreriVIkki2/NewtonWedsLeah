import React, { Component } from "react";
import { updateValue } from "../firebase";
import { UserContext } from "./UserContext";

class QuillForm extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            newValue: this.props.value,
            mounted: false,
            changed: false,
            changes: 0,
        };
        this.quill;
        this.resize;
    }

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

    async componentDidMount() {
        const { id, page } = this.props;
        const reactQuill = import("react-quill");
        const imageResize = import("quill-image-resize-module-react");
        await imageResize
            .then(res => {
                this.imageResize = res.default;
            })
            .catch(err => console.error(err));
        reactQuill
            .then(res => {
                res.Quill.register("modules/imageResize", this.imageResize);
                const ReactQuill = res.default;
                this.quill = (
                    <ReactQuill
                        value={this.state.newValue}
                        onChange={this.handleChange}
                        onBlur={() =>
                            updateValue(page, id, this.state.newValue)
                        }
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic"],
                                ["link", "blockquote", "image", "video"],
                                [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                ],
                                [
                                    {
                                        color: [
                                            "#ec4838",
                                            "#ffffff",
                                            "#000000",
                                            "#584932",
                                            "#FAD08E",
                                            "#2B56FE",
                                        ],
                                    },
                                ],
                            ],
                            imageResize: {
                                parchment: res.Quill.import("parchment"),
                            },
                        }}
                        placeholder={`Edit ${this.props.label}`}
                    />
                );
                this.setState({ mounted: true });
            })
            .catch(err => console.error(err));
    }

    render() {
        this.autoSave();
        if (!this.context.user)
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: this.props.value,
                    }}
                />
            );
        return <div>{this.quill}</div>;
    }
}
export default QuillForm;
