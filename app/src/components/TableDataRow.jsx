import React from 'react';
// importing components
import FileDetailContainer from '../containers/FileDetailContainer';
import Modal from './Modal';
// importing styles
import './styles/TableDataRow.css';
import { renderColumnAccordingLabel } from '../utils/generalFunctions';

class TableDataRow extends React.Component {
    constructor() {
        super();
        this.renderColumnAccordingLabel = renderColumnAccordingLabel.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.closeModalDetails = this.closeModalDetails.bind(this);
        this.state = {
            showDetails: false
        };
    }
    renderColumns() {
        const { columns, columnsToRender } = this.props;
        if (columns) {
            return Object.keys(columns).slice(0, columnsToRender).map(key => {
                return (
                    <td key={key} className="file-detail">
                        {this.renderColumnAccordingLabel(columns, key)}
                    </td>
                );
            });
        }
    }
    showDetails() {
        if (!this.state.showDetails)
            this.setState({showDetails: true});
    }
    closeModalDetails() {
        if (this.state.showDetails) 
            this.setState({showDetails: false})
    }
    renderFileDetails() {
        if (this.state.showDetails) {
            return (
                <Modal 
                    identifier="fileDetailsModal"
                    contentClassName="container file-detail-container"
                    closeModal={this.closeModalDetails}
                >
                    <FileDetailContainer 
                        data={this.props.data}
                    />
                </Modal>
            );
        }
    }
    render() {
        console.log('TableDataRow') 
        return (
            <tr onClick={this.showDetails} className="single-file">
                {this.renderColumns()}
                {this.renderFileDetails()}
            </tr>
        );
    }
}
export default TableDataRow;