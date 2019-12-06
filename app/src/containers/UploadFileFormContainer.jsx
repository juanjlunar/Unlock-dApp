import { connect } from 'react-redux';
// component
import UploadFileForm from '../components/UploadFileForm';
// actions
 import { addFileIpfs } from '../redux/ipfsActions';
 import { storeContractFile } from '../redux/contractActions';


export default connect(
    state => {
        return {
            isIpfsLoading: state.ipfsReducer.isLoading,
            isContractLoading: state.contractReducer.isLoading,
            fileHash: state.ipfsReducer.fileHash,
            mainAccount: state.web3Reducer.mainAccount,
            ipfsError: state.ipfsReducer.error
        };
    }, 
    {addFileIpfs, storeContractFile}
)(UploadFileForm);