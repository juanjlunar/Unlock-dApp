import { actions } from './contractActions';
import { payloadFormater } from '../utils/reduxFunctions';
import FileShareContract from '../contracts/FileShare.json';
import BigNumber from 'bignumber.js';

const initialState = {
    isUploading: false,
    isLoading: false,
    error: false,
    success: null,
    error: false,
    fileIds: [],
    data: {},
    isEmpty: false,
    donationError: false,
    isDonating: false
};

function contractReducer(state = initialState, action = null) {
    let payload;
    switch (action.type) {
        case actions.UPLOAD_FILE + '_START':
            return {
                ...state,
                isUploading: true,
                error: false
            };
        case actions.UPLOAD_FILE + '_SUCCESS':
            return {
                ...state,
                isUploading: false,
                success: true
            };
        case actions.UPLOAD_FILE + '_ERROR':
            return {
                ...state,
                isUploading: false,
                error: 'There was an error uploading a file to the network. Please try again.'
            };
        case actions.GET_CONTRACT_FILES + '_START':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case actions.GET_CONTRACT_FILES + '_SUCCESS':
            payload = payloadFormater(JSON.parse(action.payload), 'id')
            return {
                ...state,
                fileIds: payload.ids.reverse(),
                data: {...state.data, ...payload.data},
                isLoading: false,
                isEmpty: payload.ids.length === 0
            };
        case actions.GET_CONTRACT_FILES + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: 'There was an error fetching the files. Please try again.'
            };
        // case actions.GET_CONTRACT_SINGLE_FILE + '_START':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: false
        //     };
        case actions.GET_CONTRACT_SINGLE_FILE + '_SUCCESS':
            payload = JSON.parse(action.payload);
            if (!state.data[payload.id]) {
                return {
                    ...state,
                    isLoading: false,
                    fileIds: [payload.id, ...state.fileIds],
                    data: {...state.data, [payload.id]: payload}
                };
            }
            return state;
        case actions.DONATE + '_START':
            return {
                ...state,
                isDonating: true,
                donationError: false
            };
        case actions.DONATE + '_SUCCESS':
            return {
                ...state,
                isDonating: false,
                success: true
            };
        case actions.DONATE + '_ERROR':
            return {
                ...state,
                isDonating: false,
                donationError: 'There was an error donating. Please try again.'
            };
        case actions.UPDATE_FILE_DONATIONS:
            console.log(action);
            if (!state.data[action.id].transactionDataHash || state.data[action.id].transactionDataHash !== action.transactionDataHash) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [action.id]: {
                            ...state.data[action.id],
                            donated: BigNumber(state.data[action.id].donated).plus(action.donation).toString()
                        },
                        transactionDataHash: action.transactionDataHash
                    }
                }
            }
            return state;
        default:
            return state;
    }
}
export default contractReducer;