// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import FileDetail from '../components/FileDetail';

import { donate } from '../redux/contractActions';


export default connect(
    state => {
        return {
            isDonating: state.contractReducer.isDonating,
            donatingError: state.contractReducer.donationError,
            mainAccount: state.web3Reducer.mainAccount
        };
    }, 
    {donate}
)(FileDetail);