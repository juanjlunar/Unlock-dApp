import { actions } from './ipfsActions';

const initialState = {
    isLoading: false,
    error: false
};


function ipfsReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.CREATE_IPFS_NODE + '_START':
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case actions.CREATE_IPFS_NODE + '_SUCCESS':
            window.__ipfsNode = Object.freeze(action.payload);

            return {
                ...state,
                isLoading: false
            };
        case actions.CREATE_IPFS_NODE + '_ERROR':
            return {
                ...state,
                isLoading: false,
                error: 'There was an error creating the IPFS node.'
            };
        default:
            return state;
    }
}
export default ipfsReducer;