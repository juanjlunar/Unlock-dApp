import React from 'react';
// importing styles
import './styles/UploadFileForm.css';
// importing utils
// import { setRef } from '../utils/generalFunctions';
import FileInput from './FileInput';
import TextInput from './TextInput';

class UploadFileForm extends React.Component {
    constructor() {
        super();
        this.getFile = this.getFile.bind(this);
        this.getFileName = this.getFileName.bind(this);
        this.getFileDescription = this.getFileDescription.bind(this);
        this.getFileGoal = this.getFileGoal.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
        this.uploadInfo = {};
    }
    getFile(file) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            this.uploadInfo.fileBuffer = Buffer.from(fileReader.result);
        }
    }
    getFileName({target}) {
        this.uploadInfo.fileName = target.value.trim();
    }
    getFileDescription({target}) {
        this.uploadInfo.fileDescription = target.value.trim();
    }
    getFileGoal({target}) {
        const newValue = target.value.replace(/[^0-9]/g, '');
        this.uploadInfo.fileGoal = newValue
        target.value = newValue;
        console.log(this.uploadInfo)
    }
    uploadSubmit(e) {
        console.log(e)
    }
    render() {
        return (
            <form className="container upload-file-content-container">
                <div className="full-width input-section">
                    <h2>Upload new file</h2>
                    <FileInput 
                        label="Select file"
                        onChange={this.getFile}
                    />
                </div>
                <div className="full-width input-section">
                    <TextInput 
                        label="Goal"
                        onChange={this.getFileGoal}
                        className="goal-input"
                        required
                    />
                </div>
                <div className="full-width input-section">
                    <TextInput 
                        label="Name"
                        onChange={this.getFileName}
                        required
                    />
                </div>
                <div className="full-width input-section">
                    <TextInput 
                        label="Description"
                        onChange={this.getFileDescription}
                        type="textarea"
                        required
                    />
                </div>
                <div className="full-width upload-file-button-container">
                    <button onSubmit={this.uploadSubmit} className="btn" type="submit">UPLOAD</button>
                </div>
            </form>
        );
    }
}
export default UploadFileForm;