export const actions = {
    STORE_MAIN_ACCOUNT: 'STORE_MAIN_ACCOUNT',
    CHANGE_MAIN_ACCOUNT: 'CHANGE_MAIN_ACCOUNT',
    SHOW_METAMAST_INSTALL_MESSAGE: 'SHOW_METAMAST_INSTALL_MESSAGE'
};

export function storeMainAccount(ethereumEnabler) {
    return {
        type: actions.STORE_MAIN_ACCOUNT,
        payload: ethereumEnabler
    };
}
export function changeMainAccount(account) {
    return {
        type: actions.CHANGE_MAIN_ACCOUNT,
        account
    };
}
export function showMetamaskInstallMessage() {
    return {
        type: actions.SHOW_METAMAST_INSTALL_MESSAGE
    };
}
