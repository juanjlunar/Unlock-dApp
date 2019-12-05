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
 import { storeContractInWindowObject } from '../redux/contractActions';


export default connect(
    null, 
    {
        storeMainAccount, 
        changeMainAccount, 
        showMetamaskInstallMessage, 
        storeContractInWindowObject,
        createStoreIpfsNode
    }
)(Root);