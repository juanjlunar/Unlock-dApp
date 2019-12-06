import { storeContractFile } from './contractActions';
import { toWei } from 'web3-utils';

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
            const newObject = {...storeObject};
            newObject.fileGoal = toWei(newObject.fileGoal);
            newObject.file = ipfsObject[0].hash;
            newObject.fileName= newObject.fileName + '//' + newObject.fileSize + '//' + newObject.fileType;
            dispatch(storeContractFile(newObject, mainAddress));
            return ipfsObject;
        })
    });
}