import React from 'react';
import ipfs from 'ipfs';
import './styles/FileDetail.css';
import BigNumber from 'bignumber.js';
import { formatBytes, toEther, toWei } from '../utils/generalFunctions';
import { dateHumanize } from '../utils/dateFunctions';
import { ReactComponent as FileIcon } from '../assets/images/file_icon.svg';
import TextInput from './TextInput';
import Modal from './Modal';

class FileDetail extends React.Component {
    constructor() {
        super();
        this.contribute = this.contribute.bind(this);
        this.getDonationAmount = this.getDonationAmount.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.cancelPreviewModal = this.cancelPreviewModal.bind(this);
        this.state = {
            errorAmount: false,
            isSvg: false,
            isBlob: false
        }
    }
    componentDidMount() {
        const donatedPorcent = BigNumber(this.props.data.donated).multipliedBy(100).dividedBy(this.props.data.goal).toString();
        if (this.props.data.fileLink !== 'Hidden') {
            document.documentElement.style.setProperty('--progress-bar-width', '100%');
        } else {
            document.documentElement.style.setProperty('--progress-bar-width', donatedPorcent + '%');
        }
    }
    getFormattedTitle() {
        return this.props.data.title.split(/\/\//)[0];
    }
    getFormattedFileType() {
        return this.props.data.title.split(/\/\//)[2].split(/\//)[1];
    }
    getFormattedFileSize() {
        return this.props.data.title.split(/\/\//)[1];
    }
    getFormattedDonated() {
        if (this.props.data.fileLink !== 'Hidden')
            return this.props.data.goal;
        return this.props.data.donated;
    }
    contribute() {
        if (/^(?!0\.0+$)(\d+)?(\.\d\d{0,17})?$/.test(this.donationAmount)) {
            this.props.donate(parseInt(this.props.data.id), this.props.mainAccount, this.donationAmount);
            window.__mountedModals.fileDetailsModal()
        } else {
            this.setState({errorAmount: true});
        }
    }
    renderButtons() {
        if (this.props.data.fileLink !== 'Hidden') {
            return (
                <div className="container action-buttons-container">
                    {this.renderPreviewImageButton()}
                    <button onClick={this.downloadFile} className="btn">DOWNLOAD</button>
                </div>
            );
        }
    }
    previewImage() {
        const type = this.getFormattedFileType();
        if (typeof window.__ipfsNode.get === 'function') {
            window.__ipfsNode.get(this.props.data.fileLink).then((files) => {
                const file = new Blob([files[0].content], { type: 'application/octet-binary' });
                const url = URL.createObjectURL(file);
    
                if (type.toLowerCase().includes('svg') && !this.state.isSvg) {
                    file.text().then(res => {
                        this.setState({ isSvg: res, showPreviewModal: true})
                    });
                } if (type.toLowerCase() === 'pdf') {
                    this.handler = window.open('/loading_preview');
                    this.handler.document.title = 'Loading Preview';
                    this.handler.location.href = url;
                } else {
                    this.setState({isBlob: url, showPreviewModal: true})
                }
            }).catch(console.log)
        }
    }
    cancelPreviewModal() {
        if (this.state.showPreviewModal) {
            this.setState({showPreviewModal: false})
        }
    }
    downloadFile() {
        window.__ipfsNode.get(this.props.data.fileLink).then((files) => {
            const file = new Blob([files[0].content], { type: 'application/octet-binary' })
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url
            link.download = this.getFormattedTitle() + '.' + this.getFormattedFileType();
            document.body.append(link);
            link.click();
            link.remove();
        }).catch(console.log)
    }
    renderPreviewImageButton() {
        const type = this.getFormattedFileType();
        if (type.toLowerCase() === 'png' || type.toLowerCase() === 'jpg' || type.toLowerCase() === 'jpeg' || type.toLowerCase().includes('svg') || type.toLowerCase() === 'pdf') {
            return (
                <button onClick={this.previewImage} className="btn">PREVIEW</button>
            );
        }
    }
    getDonationAmount({target}) {
        const newValue = target.value.replace(/[^0-9\.]/g, '');
        target.value = newValue;
        this.donationAmount = toWei(newValue);
    }
    renderImage() {
        if (this.state.isSvg) {
            return (
                <div className="svg-previewer-container flex-r-axis-centered " dangerouslySetInnerHTML={{__html: this.state.isSvg}}></div>
            );
        }
        if (this.state.isBlob) {
            return (
                <div className="container flex-column-axis-centered">
                    <img src={this.state.isBlob} />
                </div>
            );
        }
    }
    render() {
        console.log('FIleDetail')
        return (
            <div className="container file-detail-content-container">
                <h3 className="file-name container">{this.getFormattedTitle()}</h3>
                <div className="preview-file-container flex-container">
                    <FileIcon />
                </div>
                {this.renderButtons()}
                <div className="content-detail flex-column container detail-description">
                    <h4 className="content-detail-label">Description:</h4>
                    <p>{this.props.data.description}</p>
                </div>
                <div className="flex-container container content-detail-double">
                    <div className="flex-container">
                        <h4 className="content-detail-label">File:</h4>
                        <p className="content-detail-value">{this.getFormattedFileType()}</p>
                    </div>
                    <div className="flex-container">
                        <h4 className="content-detail-label">Size:</h4>
                        <p className="content-detail-value">{formatBytes(this.props.data.title.split(/\/\//)[1])}</p>
                    </div>
                </div>
                <div className="content-detail flex-container container">
                    <h4 className="content-detail-label">Uploaded:</h4>
                    <p className="content-detail-value">{dateHumanize(this.props.data.dateCreated)}</p>
                </div>
                <div className="content-detail-double flex-r-y-centered container">
                    <h4 className="content-detail-label">Goal(ETH):</h4>
                    <p className="content-detail-value goal">{toEther(this.props.data.goal)}</p>
                </div>
                <div className="content-detail-double flex-r-y-centered container">
                    <h4 className="content-detail-label donation-label">Raised(ETH):</h4>
                    <p className="content-detail-value donations">{toEther(this.getFormattedDonated())}</p>
                </div>
                <div className="full-width raised-progress-bar-rail container">
                    <div className="full-width raised-progress-bar"></div>
                </div>
                <div className="full-width container">
                    <TextInput 
                        label="Amount"
                        onChange={this.getDonationAmount}
                    />
                </div>
                {this.state.errorAmount && <p className="container invalid-amount">Invalid amount.</p>}
                <div className="full-width detail-button-container container">
                    <button onClick={this.contribute} className="btn">CONTRIBUTE</button>
                </div>
                {this.state.showPreviewModal && (
                    <Modal
                        identifier="fileDetailsModal"
                        contentClassName="container file-detail-container"
                        closeModal={this.cancelPreviewModal}
                    >
                        {this.renderImage()}
                    </Modal>
                )}
            </div>
        );
    }
}
export default FileDetail;