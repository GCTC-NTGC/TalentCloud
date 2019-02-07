import React, { Component } from "react";
import ReactDOM from "react-dom";
// import classNames from "classnames";

export default class Reference extends Component {
    /**
     * Expected props:
     *  name (reference.name or new_reference_title)
     *  url
     *  key
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            name: props.initName
        };
    }

    handleTriggerClick() {
        this.setState((state) => ({active: !state.active}) );
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        var triggerClass = classNames(
            'profile-element',
            'accordion',
            'reference',
            'modal-target-object',
            { active: this.state.active }
        );
        return (
            {/* Accordion Trigger */}
            <div className={triggerClass}>
                <button
                    aria-expanded={ this.state.active }
                    className="accordion-trigger"
                    tabindex = "0"
                    type = "button"
                    onClick={this.handleTriggerClick}
                    >

                    { this.props.locale === "profile" &&
                        <div
                            className="accordion-status">
                            <i className="fas fa-check"></i>
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                    }
                    <span className="accordion-title">{this.state.name }</span>
                </button>

                {/* Accordion Content */ }
                <div
                    aria-hidden={ this.state.active }
                    className="accordion-content" >

                    <form
                        action={ this.props.url }
                        method="POST">
                        <div className="form__wrapper">
                            <div className="form-error box"></div>
                            <div className="flex-grid">
                                <div className="box med-1of2">
                                    <div className={ classNames(
                                            'form__input- wrapper--float',
                                            { 'active': this.state.name }
                                        ); }>
                                        <label className="form__label" for={ "referenceName" + this.props.key }>
                                            { reference_template.name_label }
                                        </label>
                                        <input
                                            className="form__input"
                                            id={"referenceName" + this.props.key}
                                            type="text"
                                            name="name"
                                            required
                                            value={ this.state.name }
                                            onChange={this.handleNameChange}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

if (document.getElementById("react-reference")) {
    ReactDOM.render(<Reference key="1" url="/" initName="Joe Bob" locale="profile" />, document.getElementById("react-reference"));
}
