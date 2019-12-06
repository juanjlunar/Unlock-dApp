import React from 'react';
// importing styles
import './styles/TextInput.css';

class TextInput extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.getFileInputRef = this.getFileInputRef.bind(this);
        this.focusInput = this.focusInput.bind(this);
    }
    onChange(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e);
        }
    }
    getFileInputRef(el) {
        if (el) {
            this.inputRef = el;
            this.inputRef.value = this.props.initialValue || '';
        }
    }
    focusInput() {
        this.inputRef.focus();
    }
    renderInputByType() {
        const { className, required } = this.props;
        if (this.props.type === 'textarea') {
            return (
                <textarea 
                    ref={this.getFileInputRef} 
                    onChange={this.onChange}
                    {...Object.assign({}, required ? {required} : {})}
                />
            );
        }
        return (
            <input 
                ref={this.getFileInputRef} 
                onChange={this.onChange} 
                type="text"
                {...Object.assign({}, this.props.className ? {className} : {})}
                {...Object.assign({}, required ? {required} : {})}
            />
        );
    }
    render() {
        console.log('TextInput')
        return (
            <div className="text-input-container flex-c-y-centered">
                <div className="full-width flex-container">
                    <label onClick={this.focusInput}>{this.props.label || 'Input label'}</label>
                </div>
                {this.renderInputByType()}
            </div>
        );
    }
}
export default TextInput;