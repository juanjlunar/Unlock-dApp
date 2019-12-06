import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import HomeView from '../components/HomeView';
import { getContractFiles } from '../redux/contractActions';


export default withRouter(connect(
    state => {
        return {
            contractError: state.contractReducer.error,
            isLoading: state.contractReducer.isLoading,
            ids: state.contractReducer.fileIds,
            isEmpty: state.contractReducer.isEmpty
        };
    }, 
    {getContractFiles}
)(HomeView));