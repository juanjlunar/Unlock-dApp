// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import Root from '../components/Root';
// actions
import { storeMainAccount, changeMainAccount, showMetamaskInstallMessage, getContractActions } from '../redux/web3Actions';


export default connect(
    null, 
    {storeMainAccount, changeMainAccount, showMetamaskInstallMessage, getContractActions}
)(Root);