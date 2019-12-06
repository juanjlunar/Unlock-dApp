// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import Root from '../components/Root';
// actions
import { 
    storeMainAccount, 
    changeMainAccount, 
    showMetamaskInstallMessage
 } from '../redux/web3Actions';
 import { createStoreIpfsNode } from '../redux/ipfsActions';
 import { getContractSingleFile, updateDonations } from '../redux/contractActions';


export default connect(
    state => {
        return {
            isMainAccountLoading: state.web3Reducer.isLoading,
            mainAccount: state.web3Reducer.mainAccount,
            error: state.web3Reducer.error
        };
    }, 
    {
        storeMainAccount, 
        changeMainAccount, 
        showMetamaskInstallMessage,
        createStoreIpfsNode,
        getContractSingleFile,
        updateDonations
    }
)(Root);