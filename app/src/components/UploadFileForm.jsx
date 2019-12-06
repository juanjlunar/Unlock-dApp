import React from 'react';
// importing styles
import './styles/UploadFileForm.css';
// importing utils
import { getInputProps, getInputError } from '../input-props/UploadFileForm';
//importing components
import Modal from './Modal';
import { toWei } from '../utils/generalFunctions';


class UploadFileForm extends React.Component {
    
    constructor() {
        super();
        this.getFile = this.getFile.bind(this);
        this.getFileName = this.getFileName.bind(this);
        this.getFileDescription = this.getFileDescription.bind(this);
        this.getFileGoal = this.getFileGoal.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
        this.closeModalErrors = this.closeModalErrors.bind(this);
        this.getInputProps = getInputProps.bind(this);
        this.uploadInfo = {};
        this.getInputProps().forEach(inputProp => this.uploadInfo[inputProp.id] = inputProp.value);
        this.errors = [];
        this.state = {
            inputsError: false
        }
    }
    getFile(file) {
        if (file) {
            this.uploadInfo.fileType = file.type;
            this.uploadInfo.fileSize = file.size;
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = () => {
                this.uploadInfo.file = fileReader.result;
            }
        }
    }
    getFileName({target}) {
        this.uploadInfo.fileName = target.value.trim();
    }
    getFileDescription({target}) {
        this.uploadInfo.fileDescription = target.value.trim();
    }
    getFileGoal({target}) {
        const newValue = target.value.replace(/[^0-9\.]/g, '');
        this.uploadInfo.fileGoal = newValue;
        target.value = newValue;
    }
    uploadSubmit(e) {
        e.preventDefault();
        Object.keys(this.uploadInfo).forEach(key => {
            if (!this.uploadInfo[key]) this.errors.push(key);
        });
        if (this.errors.length > 0) {
            this.setState({inputsError: true});
            return;
        }
        this.props.addFileIpfs(this.uploadInfo.file, this.uploadInfo, this.props.mainAccount)
            .then(() => window.__mountedModals.uploadFile());
    }
    closeModalErrors() {
        if (this.state.inputsError) 
            this.setState({inputsError: false}, () => this.errors = []);
    }
    renderInputs() {
        if (this.state.inputsError) {
            return (
                <Modal
                    identifier="uploadFileErrors"
                    contentClassName="container upload-file-form-container"
                    closeModal={this.closeModalErrors}
                >
                    <div className="input-errors">
                        {
                            this.errors.map(key => {
                                return <p key={key}>{getInputError(key)}</p>;
                            })
                        }
                    </div>
                </Modal>
            );
        }
        return (
            <React.Fragment>
                {
                    this.getInputProps().map(inputProp => {
                        return (
                            <inputProp.input 
                                key={inputProp.id}
                                label={inputProp.label}
                                onChange={inputProp.onChange}
                                required={inputProp.required}
                                {...Object.assign({}, inputProp.className ? {className: inputProp.className} : {})}
                                {...Object.assign({}, inputProp.type ? {type: inputProp.type} : {})}
                                initialValue={this.uploadInfo[inputProp.id]}
                            />
                        )
                    })
                }
                <div className="full-width upload-file-button-container">
                    <button className="btn" type="submit">UPLOAD</button>
                </div>
                {
                    this.props.ipfsError && 
                        (
                            <div className="full-width ipfs-error-container">
                                <p>{this.props.ipfsError}</p>
                            </div>
                        )
                }
            </React.Fragment>
        )
    }
    render() {
        console.log('UploadFileForm')
        return (
            <form onSubmit={this.uploadSubmit} className="container upload-file-content-container">
                {this.renderInputs()}
            </form>
        );
    }
}
export default UploadFileForm;