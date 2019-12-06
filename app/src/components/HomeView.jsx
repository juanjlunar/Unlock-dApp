import React from 'react';
import TableData from './TableData';
import Loader from './Loader';
import Error from './Error';

const filesData = {
    title: {label: 'Name'},
    fileLink: {label: 'Status'},
    goal: {label: 'Goal'},
    type: {label: 'Type'},
    // size: {label: 'Size'},
    dateCreated: {label: 'Posted on'}
}

class HomeView extends React.Component {
    constructor() {
        super();
        this.getTransactionsViewContainerRef = this.getTransactionsViewContainerRef.bind(this);
        this.getTransactionsViewContainerWidth = this.getTransactionsViewContainerWidth.bind(this);
    }
    componentDidMount() {
        this.props.getContractFiles();
    }
    getTransactionsViewContainerRef(el) {
        if (el) this.TransactionsViewContainerRef = el;
    }
    getTransactionsViewContainerWidth() {
        if (this.TransactionsViewContainerRef) {
            return parseInt(getComputedStyle(this.TransactionsViewContainerRef).width);
        }
    }
    renderData() {
        if (this.props.isLoading) {
            return (
                <React.Fragment>
                    <Loader
                        className="flex-r-x-centered vertical-separator"
                    />
                    <p className="fetching-files">Fetching files</p>
                </React.Fragment>
            );
        }
        if (this.props.isEmpty || this.props.contractError) {
            return (
                <Error 
                    errorMessage={this.props.contractError || 'There are no files yet.'}
                    className="text-center"
                    errorMessageClassName="empty-collec"
                    buttonMessage={this.props.buttonMessage}
                    button="no"
                    {...Object.assign({}, this.props.isEmpty ? {} : {showMessage: false})}
                    {...Object.assign({}, this.props.isEmpty ? {} : {retryFunction:this.props.getContractFiles})}
                />
            );
        }
        return (
            <TableData 
                data={this.props.ids}
                tableContainerWidth={this.getTransactionsViewContainerWidth}
                columns={filesData}
                className="full-width flex-column container"
            />
        );
    }
    render() {
        console.log('HomeView')
        const { isLoading, contractError, isEmpty } = this.props;
        return (
            <main 
                ref={this.getTransactionsViewContainerRef} 
                className={isLoading || contractError || isEmpty ? 'full-width flex-1 flex-c-axis-centered' : 'full-width flex-1'}>
                {this.renderData()}
            </main>
        );
    }
}
export default HomeView;