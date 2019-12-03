import React from 'react';
// importing styles
import './styles/UploadFileForm.css';
// importing utils
// import { setRef } from '../utils/generalFunctions';
import FileInput from './FileInput';

class UploadFileForm extends React.Component {
    constructor() {
        super();
        this.getFile = this.getFile.bind(this);
        this.uploadInfo = {};
    }
    getFile(file) {
        const fileReader = new FileReader();
        console.log(file)
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            window.__ipfsNode.add(Buffer.from(fileReader.result)).then(obj => {
                window.__ipfsNode.get(obj[0].hash).then(files => {
                    console.log(files)
                })
            });
            // ipfs.get(hash).then((files) => {
            //     const file = new Blob([files[0].content], { type: 'application/octet-binary' })
            //     const url = URL.createObjectURL(file);
            //     const link = document.createElement('a');
            //     link.href = url
            //     link.download = this.state.name;
            //     document.body.append(link);
            //     link.click();
            //     link.remove();
            // }).catch(console.log)
        }
    }
    render() {
        return (
            <div className="container upload-file-content-container">
                <h2>Upload new file</h2>
                <FileInput 
                    label="Select file"
                    onChange={this.getFile}
                />
            </div>
        );
    }
}
export default UploadFileForm;