import { storeContractFile } from './contractActions';

export const actions = {
    CREATE_IPFS_NODE: 'CREATE_IPFS_NODE',
    ADD_FILE: 'ADD_FILE'
};

export function createStoreIpfsNode(ipfsCreatePromise) {
    return {
        type: actions.CREATE_IPFS_NODE,
        payload: ipfsCreatePromise
    };
}
export function addFileIpfs(file, storeObject, mainAddress) {
    return dispatch => dispatch({
        type: actions.ADD_FILE,
        payload: window.__ipfsNode.add(Buffer.from(file)).then(ipfsObject => {
            storeObject.file = ipfsObject[0].hash;
            console.log('THE ADDRESS ', mainAddress)

            dispatch(storeContractFile(storeObject, mainAddress));
            return ipfsObject;
        })
    });
}