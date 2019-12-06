import { actions } from './web3Actions';

const initialState = {
    mainAccount: false,
    isLoading: false,
    error: false,
    isEmpty: false,
    metamaskInstall: false,
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
           console.log('ASDASDASDASD')
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
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