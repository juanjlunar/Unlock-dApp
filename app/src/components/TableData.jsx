import React from 'react';
import './styles/TableDataRow.css';
import TableDataRowContainer from '../containers/TableDataRowContainer';
import Loader from './Loader';
// import Error from './Error';
// import ShadowBox from './ShadowBox';

class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.mediaQueries = {
            '(max-width: 5000px) and (min-width: 1200px)': 5,
            '(max-width: 1199px) and (min-width: 800px)': 4,
            '(max-width: 799px) and (min-width: 570px)': 3,
            '(max-width: 569px) and (min-width: 200px)': 2,
        };
        this.setMediaQueries = this.setMediaQueries.bind(this);
        this.changeColumnsToRender = this.changeColumnsToRender.bind(this);
        this.state = {
            columnsToRender: Object.keys(props.columns).length
        };
        this.addedListeners = [];
    }
    componentDidMount() {
        this.setMediaQueries();
        if (this.props.tableContainerWidth()) {
            document.documentElement.style.setProperty('--columns-width', (this.props.tableContainerWidth() / this.state.columnsToRender) + 'px');
        }
    }
    componentWillUnmount() {
        this.removeMediaQueries();
    }
    setMediaQueries() {
        Object.keys(this.mediaQueries).forEach(query => {
            const media = window.matchMedia(query);
            this.addedListeners.push(media);
            media.addListener(this.changeColumnsToRender);
            this.changeColumnsToRender(media);
        });
    }
    removeMediaQueries() {
        this.addedListeners.forEach(media => media.removeListener(this.changeColumnsToRender));
    }
    changeColumnsToRender(query) {
        if (query.matches) {
            this.setState({
                columnsToRender: this.mediaQueries[query.media]
            });
        }
    }
    renderTableHead() {
        if (this.props.columns) {
            return Object.keys(this.props.columns).slice(0, this.state.columnsToRender).map(key => {
                return (
                    <th key={key} className="table-th">{this.props.columns[key].label}</th>
                );
            });
        }
    }
    renderColumns() {
        if (this.props.data) {
            return this.props.data.map((singleData, index) => {
                return (
                    <TableDataRowContainer 
                        key={singleData}
                        id={singleData}
                        index={index}
                        columns={this.props.columns}
                        columnsToRender={this.state.columnsToRender}
                    />
                );
            });
        }
    }
    renderTableContent() {
        return (
            <React.Fragment>
                <tr className="single-file">
                    {this.renderTableHead()}
                </tr>
                {this.renderColumns()}
            </React.Fragment>
        );
    }
    render() {
        console.log('Rendering TABLE DATA')
        return (
            <table
                {...Object.assign({}, this.props.className ? {className: 'table-data ' + this.props.className} : {className: 'table-data'})}
            >
                <tbody>
                    {this.renderTableContent()}
                </tbody>
            </table>
        );
    }
}
export default TableData;