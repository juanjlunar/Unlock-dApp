import { actions } from './web3Actions';
import FileShareContract from '../contracts/FileShare.json';

const initialState = {
    mainAccount: '',
    isLoading: false,
    error: false,
    isEmpty: false,
    metamaskInstall: false,
    contractActionsError: false
};


function web3Reducer(state = initialState, action = null) {
    switch (action.type) {
       case actions.STORE_MAIN_ACCOUNT + '_START':
            return {
                ...state,
                isLoading: true,
                error: false,
                isEmpty: false
            }
       case actions.STORE_MAIN_ACCOUNT + '_SUCCESS':
            return {
                ...state,
                mainAccount: Array.isArray(action.payload) ? action.payload[0] : action.payload,
                isLoading: false,
                isEmpty: action.payload.length === 0
            }
       case actions.STORE_MAIN_ACCOUNT + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }
       case actions.GET_CONTRACT_ACTIONS + '_START':
            return {
                ...state,
                areContractActionsLoading: true,
                contractActionsError: false
            }
       case actions.GET_CONTRACT_ACTIONS + '_SUCCESS':
           const contract = new window.web3.eth.Contract(
                FileShareContract.abi,
                FileShareContract.networks[action.payload] && FileShareContract.networks[action.payload].address,
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
        case actions.CHANGE_MAIN_ACCOUNT:
            return {
                ...state,
                mainAccount: Array.isArray(action.account) ? action.account[0] : action.account,
            };
        case actions.SHOW_METAMAST_INSTALL_MESSAGE:
            return {
                ...state,
                metamaskInstall: true
            };
        default:            
            return state;
    }
}
export default web3Reducer;