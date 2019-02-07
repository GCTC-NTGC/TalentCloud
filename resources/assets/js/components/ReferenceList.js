import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Reference from "./Reference";

export default class ReferenceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            references: props.initialRefs
        };
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    nextId(objs) {
        const ids = objs.map(x => x.id);
        const maxReducer = (a, b) => Math.max(a, b);
        return ids.reduce(maxReducer, 0) + 1;
    }

    createEmptyReference(id) {
        return {
            id: id,
            name: "",
            email: "",
            relationship_id: null,
            description: ""
        };
    }

    handleAddItemClick() {
        const refs = this.state.references.slice();
        const nextId = this.nextId(this.state.references)
        refs.push(this.createEmptyReference(nextId));
        this.setState({ references: refs });
    }

    render() {
        if (this.state.references.length > 0) {
            var content = this.state.references.map(reference => (
                <Reference
                    key={reference.id}
                    id={reference.id}
                    url="/"
                    title={
                        reference.name
                            ? reference.name
                            : this.props.langReference.new_reference_title
                    }
                    lang={this.props.langReference}
                    initName={reference.name}
                    showStatus={false}
                />
            ));
        } else {
            var content = this.state.references.map(reference => (
                <div className="profile-null active">
                    <p>{this.props.lang.reference_section.null_copy}</p>
                </div>
            ));
        }
        return (
            <div className="profile-list">
                <div className="profile-list__header flex-grid middle">
                    <div className="box med-1of2">
                        <h3>
                            {this.props.lang.reference_section.section_title}
                        </h3>
                    </div>
                    <div className="box med-1of2">
                        <button
                            className="profile-list__add-element-trigger"
                            type="button"
                            onClick={this.handleAddItemClick}
                        >
                            {this.props.lang.reference_section.add_button_label}
                        </button>
                    </div>
                    <div className="box full">
                        <p>
                            {
                                this.props.lang.reference_section
                                    .section_description
                            }
                        </p>
                    </div>
                </div>
                <div className="profile-element-list">{content}</div>
            </div>
        );
    }
}

if (document.getElementById("react-reference-list")) {
    const container = document.getElementById("react-reference-list");
    // const props = Object.assign({}, domContainer.dataset);
    const lang = JSON.parse(container.getAttribute("data-lang"));
    const langReference = JSON.parse(
        container.getAttribute("data-reference-lang")
    );
    const initialRefs = JSON.parse(container.getAttribute("data-references"));
    ReactDOM.render(
        <ReferenceList
            lang={lang}
            langReference={langReference}
            initialRefs={initialRefs}
        />,
        container
    );
}
