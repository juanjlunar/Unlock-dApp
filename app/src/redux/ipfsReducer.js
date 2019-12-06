import { actions } from './ipfsActions';

const initialState = {
    isLoading: false,
    error: false,
    fileHash: null,
    isCreatingNode: false
};


function ipfsReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.CREATE_IPFS_NODE + '_START':
            return {
                ...state,
                isCreatingNode: true,
                error: false
            };
        case actions.CREATE_IPFS_NODE + '_SUCCESS':
            window.__ipfsNode = Object.freeze(action.payload);

            return {
                ...state,
                isCreatingNode: false
            };
        case actions.CREATE_IPFS_NODE + '_ERROR':
            return {
                ...state,
                isCreatingNode: false,
                error: 'There was an error creating the IPFS node.'
            };
        case actions.ADD_FILE + '_START':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case actions.ADD_FILE + '_SUCCESS':
            return {
                ...state,
                isLoading: false,
                fileHash: action.payload[0].hash
            };
        case actions.ADD_FILE + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: 'There was an error uploading the file to Ipfs. Please try again.'
            };
        default:
            return state;
    }
}
export default ipfsReducer;