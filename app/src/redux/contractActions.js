
export const actions = {
    STORE_CONTRACT_FILE: 'STORE_CONTRACT_FILE',
    GET_CONTRACT_ACTIONS: 'GET_CONTRACT_ACTIONS'
};

export function storeContractFile(contractFileObject, mainAddress) {
    return {
        type: actions.STORE_CONTRACT_FILE,
        payload: window.__fileShare.methods.storeFile(contractFileObject.fileGoal, contractFileObject.file, contractFileObject.fileName, contractFileObject.fileDescription).send({from: mainAddress})
    };
}
export function storeContractInWindowObject(contractPromise) {
    return {
        type: actions.GET_CONTRACT_ACTIONS,
        payload: contractPromise
    };
}