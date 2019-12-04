import ipfs from 'ipfs';

export const actions = {
    CREATE_IPFS_NODE: 'CREATE_IPFS_NODE',
};

export function createStoreIpfsNode(ipfsCreatePromise) {
    return {
        type: actions.CREATE_IPFS_NODE,
        payload: ipfsCreatePromise
    };
}