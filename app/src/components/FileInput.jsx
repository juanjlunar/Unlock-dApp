import React from 'react';
// importing styles 
import './styles/FileInput.css';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getFileInputRef = this.getFileInputRef.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.state = {
            file: ''
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.file !== this.state.file) {
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.file !== this.state.file && typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.file);
        }
    }
    onChange({target}) {
        this.setState({
            file: this.props.multipleFiles ? target.files : target.files[0]
        });
    }
    getFileInputRef(el) {
        if (el) {
            this.inputRef = el;
        }
    }
    focusInput() {
        this.inputRef.click();
    }
    render() {
        console.log('FileInput')
        return (
            <div className="file-input-container flex-r-y-centered">
                <label onClick={this.focusInput}>{this.props.label || 'Choose file'}</label>
                {this.state.file !== '' && <p>{this.state.file.name}</p>}
                <input ref={this.getFileInputRef} onChange={this.onChange} type="file" />
            </div>
        );
    }
}
export default FileInput;