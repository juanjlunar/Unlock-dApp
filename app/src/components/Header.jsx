import React from 'react';
// importing styles 
import './styles/Header.css';
// importing images
import logo from '../assets/images/logo.svg';
import uploadIcon from '../assets/images/upload_icon.svg';

// importing components
import Modal from './Modal';
import UploadFileFormContainer from '../containers/UploadFileFormContainer';

class Header extends React.Component {
    constructor() {
        super();
        this.showUploadFileModal = this.showUploadFileModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            showModal: true
        }
    }
    showUploadFileModal() {
        if (!this.state.showModal) {
            this.setState({showModal: true});
        }
    }
    closeModal() {
        this.setState({showModal: false});
    }
    renderUploadFileModal() {
        if (this.state.showModal) {
            return (
                <Modal 
                    identifier="uploadFile"
                    contentClassName="container upload-file-form-container"
                    closeModal={this.closeModal}
                >
                    <UploadFileFormContainer />
                </Modal>
            );
        }
    }
    render() {
        console.log('Header')
        return (
            <header className="fluid">
                <div className="container header-container flex-container">
                    <div className="logo-container">
                        <img className="clickeable" src={logo} alt="FileShare logo" />
                    </div>
                    <div onClick={this.showUploadFileModal} className="upload-button-container flex-r-y-centered clickeable">
                        <h5 className="upload-label">Upload File</h5>
                        <div className="upload-file-container">
                            <img src={uploadIcon} alt="Icon representing upload action button" />
                        </div>
                    </div>
                </div>
                {this.renderUploadFileModal()}
            </header>
        );
    }
}
export default Header;