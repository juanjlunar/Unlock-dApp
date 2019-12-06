
export const actions = {
    STORE_CONTRACT_FILE: 'STORE_CONTRACT_FILE',
    GET_CONTRACT_ACTIONS: 'GET_CONTRACT_ACTIONS',
    GET_CONTRACT_FILES: 'GET_CONTRACT_FILES',
    GET_CONTRACT_SINGLE_FILE: 'GET_CONTRACT_SINGLE_FILE',
    DONATE: 'DONATE',
    UPDATE_FILE_DONATIONS: 'UPDATE_FILE_DONATIONS'
};

export function storeContractFile(contractFileObject, mainAddress) {
    return {
        type: actions.STORE_CONTRACT_FILE,
        payload: window.__fileShare.methods.storeFile(contractFileObject.fileGoal, contractFileObject.file, contractFileObject.fileName, contractFileObject.fileDescription).send({from: mainAddress})
    };
}
export function donate(id, mainAccount, value) {
    return {
        type: actions.DONATE,
        payload: window.__fileShare.methods.donate(id).send({from: mainAccount, value})
    }
}
export function getContractFiles() {
    return {
        type: actions.GET_CONTRACT_FILES,
        payload: window.__fileShare.methods.getAllFilesInfo().call()
    }
}
export function getContractSingleFile(id) {
    return {
        type: actions.GET_CONTRACT_SINGLE_FILE,
        payload: window.__fileShare.methods.getFileInfo(id).call()
    }
}
export function storeContractInWindowObject(contractPromise) {
    return {
        type: actions.GET_CONTRACT_ACTIONS,
        payload: contractPromise
    };
}
export function updateDonations(id, donation, transactionDataHash) {
    return {
        type: actions.UPDATE_FILE_DONATIONS,
        donation,
        id,
        transactionDataHash
    }
}