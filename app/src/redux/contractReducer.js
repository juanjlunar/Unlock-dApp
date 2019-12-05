import { actions } from './contractActions';
import FileShareContract from '../contracts/FileShare.json';

const initialState = {
    isLoading: false,
    error: false,
    success: null,
    contractActionsError: false,
    areContractActionsLoading: false,
    contractActionsError: false
};


function contractReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.GET_CONTRACT_ACTIONS + '_START':
            return {
                ...state,
                areContractActionsLoading: true,
                contractActionsError: false
            }
       case actions.GET_CONTRACT_ACTIONS + '_SUCCESS':
           const contract = new window.web3.eth.Contract(
                FileShareContract.abi,
                FileShareContract.address,
            );

            window.__fileShare = Object.freeze(contract);
            return {
                ...state,
                areContractActionsLoading: false
            }
       case actions.GET_CONTRACT_ACTIONS + '_ERROR':
            return {
                ...state,
                areContractActionsLoading: false,
                contractActionsError: true
            }
        case actions.UPLOAD_FILE + '_START':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case actions.UPLOAD_FILE + '_SUCCESS':
            console.log('ASDASDADASD YEEEESS THIS IS A SUCCESS');
            return {
                ...state,
                isLoading: false,
                success: true
            };
        case actions.UPLOAD_FILE + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: 'There was an error uploading a file to the network. Please try again.'
            };
        default:
            return state;
    }
}
export default contractReducer;